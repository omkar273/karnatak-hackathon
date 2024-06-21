import {useEffect, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import useGetDocument from '@/common/hooks/use_get_document.ts';
import TaskModel, {TaskUpdateModel} from '@/types/task_model.ts';
import {Modal} from 'antd';
import {SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {ArrowLeft} from "lucide-react";
import Timeline, {DateHeader, SidebarHeader, TimelineHeaders} from "react-calendar-timeline";
import moment from "moment/moment";
import 'react-calendar-timeline/lib/Timeline.css';
import inspector_data from "@/data/json/inspector_data.json";
import assistant_commisioner_data from "@/data/json/assistant_commisioner_data.json";
import commisioner_data from "@/data/json/commisioner_data.json";
import sub_inspector_data from "@/data/json/sub_inspector_data.json";
import head_constable_data from "@/data/json/head_constable_data.json";
import constable_data from "@/data/json/constable_data.json";

const getNamebyId = (id: string): string => {
	const users = [
		...inspector_data,
		...assistant_commisioner_data,
		...commisioner_data,
		...sub_inspector_data,
		...head_constable_data,
		...constable_data,
	];
	
	const user = users.find(user => user.id === id);
	return user ? user.name : 'user';
};

const TaskDetails = () => {
	const [queryParams] = useSearchParams();
	const id = queryParams.get('id');
	const {data, error, loading} = useGetDocument<TaskModel>({docId: id, path: 'tasks'});
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm<TaskUpdateModel>();
	
	const onSubmit: SubmitHandler<TaskUpdateModel> = async (data) => {
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			toast.success('Task updated successfully!');
			reset();
		} catch (e) {
			toast.error(`Error: ${e}`);
		}
	};
	
	const [groups, setGroups] = useState<{ id: string; title: string }[]>([]);
	const [items, setItems] = useState<any[]>([]);
	
	useEffect(() => {
		if (data?.alloted_to_id) {
			const tempGroups = data.alloted_to_id.map(user => ({
				id: user,
				title: getNamebyId(user),
			}));
			setGroups(tempGroups);
			
			// Set items dynamically based on data (for example purposes)
			const tempItems = data.alloted_to_id.map((user, index) => ({
				id: user,
				group: user,
				title: `Item ${index + 1}`,
				start_time: moment().add(index, 'hours'),
				end_time: moment().add(index + 1, 'hours'),
			}));
			setItems(tempItems);
		}
	}, [data]);
	
	useEffect(() => {
		console.log('Groups:', groups);
		console.log('Items:', items);
	}, [groups, items]);
	
	return (
		<div className="max-h-screen overflow-y-scroll bg-gray-100">
			<Modal
				centered
				open={modalOpen}
				onCancel={() => setModalOpen(false)}
				footer={[]}
			>
				<form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-lg p-6 bg-white">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label htmlFor="start_date_time" className="text-gray-700">Start Date Time</label>
							<input
								id="start_date_time"
								{...register("start_date_time", {required: "Start date time is required"})}
								type="datetime-local"
								className="w-full p-3 border rounded-md mt-1"
							/>
							{errors.start_date_time &&
                                <p className="text-red-500">{errors.start_date_time.message}</p>}
						</div>
						<div>
							<label htmlFor="end_date_time" className="text-gray-700">End Date Time</label>
							<input
								id="end_date_time"
								{...register("end_date_time", {required: "End date time is required"})}
								type="datetime-local"
								className="w-full p-3 border rounded-md mt-1"
							/>
							{errors.end_date_time && <p className="text-red-500">{errors.end_date_time.message}</p>}
						</div>
						<div className="col-span-1 sm:col-span-2">
							<label htmlFor="title" className="text-gray-700">Title</label>
							<input
								id="title"
								{...register("title")}
								type="text"
								className="w-full p-3 border rounded-md mt-1"
							/>
						</div>
						<div className="col-span-1 sm:col-span-2">
							<label htmlFor="description" className="text-gray-700">Description</label>
							<textarea
								id="description"
								{...register("description", {required: "Description is required"})}
								className="w-full p-3 border rounded-md mt-1"
							/>
							{errors.description && <p className="text-red-500">{errors.description.message}</p>}
						</div>
					</div>
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full mt-6 py-3 bg-cyan-600 text-white rounded-md hover:scale-105 transition-all duration-300"
					>
						{isSubmitting ? 'Submitting...' : 'Submit'}
					</button>
				</form>
			</Modal>
			<div
				className="bg-white p-3 border-b-2 border font-open-sans items-center flex justify-between items-center sticky top-0 z-[100]">
				<p className="font-semibold text-lg flex gap-2 items-center">
					<Link to={'/tasks'}>
						<ArrowLeft/>
					</Link>
					<h1>Task details</h1>
				</p>
				<button
					onClick={() => setModalOpen(true)}
					className="bg-blue-600 p-2 text-white rounded-md active:scale-95"
				>
					Add Update
				</button>
			</div>
			<div className="p-4">
				{loading && <p>Loading...</p>}
				{error && <p>Error loading task details</p>}
				{data && (
					<div className="bg-white shadow rounded-lg p-6 mb-6">
						<h2 className="text-xl font-bold mb-4">{data.task_type} - {data.description}</h2>
						<p><strong>Due Date:</strong> {data.due_date}</p>
						<p><strong>Priority:</strong> {data.priority}</p>
						<p><strong>Status:</strong> {data.status}</p>
						<p><strong>Assigned By:</strong> {data.assigned_by_name}</p>
						{data.case_no && <p><strong>Case Number:</strong> {data.case_no}</p>}
						{data.zone_name && <p><strong>Zone:</strong> {data.zone_name}</p>}
						{data.vehicle && <p><strong>Vehicle:</strong> {data.vehicle}</p>}
					</div>
				)}
				<div className={'p-4 bg-white rounded-md'}>
					<Timeline
						groups={groups}
						items={items}
						defaultTimeStart={moment().add(-2, 'day')}
						defaultTimeEnd={moment().add(1, 'day')}
					>
						<TimelineHeaders>
							<SidebarHeader>
								{({getRootProps}) => (
									<div {...getRootProps()}
									     className={'flex w-full justify-center items-center text-lg text-white font-semibold'}>
										Police officers
									</div>
								)}
							</SidebarHeader>
							<DateHeader unit="primaryHeader"/>
							<DateHeader/>
						</TimelineHeaders>
					</Timeline>
				</div>
				
				{/*<TaskTimeline/>*/}
			</div>
		</div>
	);
};

export default TaskDetails;
