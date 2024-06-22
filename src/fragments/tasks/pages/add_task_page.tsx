import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button, Card, Input, Select} from "antd";
import TaskModel from "@/types/task_model.ts";
import commisioner_data from '@/data/json/commisioner_data.json';
import assistant_commisioner_data from '@/data/json/assistant_commisioner_data.json';
import inspector_data from '@/data/json/inspector_data.json';
import sub_inspector_data from '@/data/json/sub_inspector_data.json';
import head_constable_data from '@/data/json/head_constable_data.json';
import constable_data from '@/data/json/constable_data.json';
import {useSelector} from "react-redux";
import {RootState} from "@/common/redux/store.ts";
import doSaveTask from "@/fragments/tasks/utils/save_task.ts";
import {useEffect} from "react";
import addLog from "@/utils/add_log.ts";

const {TextArea} = Input;

const AddTaskPage = () => {
	const {userdata} = useSelector((s: RootState) => s.auth);
	
	const {
		register,
		control,
		handleSubmit,
		setValue,
		formState: {errors},
		reset,
	} = useForm<TaskModel>();
	
	const onSubmit: SubmitHandler<TaskModel> = async (data) => {
		console.log(data); // Handle form submission logic
		await doSaveTask(data, userdata?.id || '', userdata?.name || '');
		if (userdata) {
			addLog({
				user_id: userdata?.id,
				message: "user created a new task",
				user_name: userdata?.name,
			})
		}
		reset();
		
	};
	
	const taskTypes = ["Fir", "Crime Investigation", "Patrolling", "Emergency Reporting", "other"];
	const priorities = ["Low", "Medium", "High"];
	const users = [
		...inspector_data,
		...assistant_commisioner_data,
		...commisioner_data,
		...sub_inspector_data,
		...head_constable_data,
		...constable_data,
	]
		.filter((user) => user.reporting_officer_id === userdata?.id)
		.map((user) => ({
			label: user.name,
			value: user.id,
		}));
	
	useEffect(() => {
		if (userdata) {
			addLog({
				user_id: userdata?.id,
				message: "new task added",
				user_name: userdata?.name,
			})
		}
	}, [userdata]);
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
			<p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
				{"Task Assignment"}
			</p>
			<div className="bg-gray-100 p-6 mb-24">
				<Card title="Create Task" className="shadow-md">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="grid md:grid-cols-2 grid-cols-1 gap-6">
							<div className="col-span-2">
								<label>Task Type</label>
								<Controller
									name="task_type"
									control={control}
									rules={{required: "Please select task type"}}
									render={({field}) => (
										<Select {...field} className="w-full" placeholder="Select Task Type">
											{taskTypes.map((type) => (
												<Select.Option key={type} value={type}>
													{type}
												</Select.Option>
											))}
										</Select>
									)}
								/>
								<p className="text-xs text-red-600">{errors.task_type?.message}</p>
							</div>
							
							<div className="col-span-2">
								<label>Description</label>
								<Controller
									name="description"
									control={control}
									rules={{required: "Description is required"}}
									render={({field}) => (
										<TextArea {...field} rows={4} className="w-full"
										          placeholder="Enter task description"/>
									)}
								/>
								<p className="text-xs text-red-600">{errors.description?.message}</p>
							</div>
							
							<div className="col-span-1">
								<label>Due Date</label>
								<Controller
									name="due_date"
									control={control}
									rules={{required: "Please select due date"}}
									render={({field}) => (
										<input
											{...field}
											type="datetime-local"
											className="w-full p-2 border rounded"
											onChange={(e) => setValue("due_date", e.target.value)}
										/>
									)}
								/>
								<p className="text-xs text-red-600">{errors.due_date?.message}</p>
							</div>
							
							<div className="col-span-1">
								<label>Priority</label>
								<Controller
									name="priority"
									control={control}
									rules={{required: "Please select priority"}}
									render={({field}) => (
										<Select {...field} className="w-full" placeholder="Select Priority">
											{priorities.map((priority) => (
												<Select.Option key={priority} value={priority}>
													{priority}
												</Select.Option>
											))}
										</Select>
									)}
								/>
								<p className="text-xs text-red-600">{errors.priority?.message}</p>
							</div>
							
							<div className="col-span-2">
								<label>Assigned To</label>
								<Controller
									name="alloted_to_id"
									control={control}
									rules={{required: "Please select user(s)"}}
									render={({field}) => (
										<Select {...field} mode="multiple" className="w-full"
										        placeholder="Select User(s)" options={users}/>
									)}
								/>
								<p className="text-xs text-red-600">{errors.alloted_to_id?.message}</p>
							</div>
							
							<div className="col-span-1">
								<label>Current Status</label>
								<Controller
									name="current_status"
									control={control}
									render={({field}) => (
										<Input {...field} className="w-full" placeholder="Enter current status"/>
									)}
								/>
							</div>
							
							<div className="col-span-1">
								<label>Case Number</label>
								<Controller
									name="case_no"
									control={control}
									render={({field}) => (
										<Input {...field} className="w-full" placeholder="Enter case number"/>
									)}
								/>
							</div>
							
							<div className="col-span-1">
								<label>Zone Name</label>
								<Controller
									name="zone_name"
									control={control}
									render={({field}) => (
										<Input {...field} className="w-full" placeholder="Enter zone name"/>
									)}
								/>
							</div>
							
							<div className="col-span-1">
								<label>Vehicle</label>
								<Controller
									name="vehicle"
									control={control}
									render={({field}) => (
										<Input {...field} className="w-full" placeholder="Enter vehicle details"/>
									)}
								/>
							</div>
							
							<div className="col-span-1">
								<Input type="hidden" {...register("assigned_by_id")} defaultValue={userdata?.id || ''}/>
								<Input type="hidden" {...register("assigned_by_name")}
								       defaultValue={userdata?.name || ''}/>
							</div>
						</div>
						
						<Button disabled={!userdata} type="primary" htmlType="submit" className="mt-4">
							Create Task
						</Button>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default AddTaskPage;
