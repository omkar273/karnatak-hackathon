import React, {useEffect, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import useGetDocument from '@/common/hooks/use_get_document.ts';
import TaskModel, {TaskUpdateModel} from '@/types/task_model.ts';
import TaskTimeline from '@/fragments/tasks/components/task_timeline.tsx';
import { Modal} from 'antd';
import {SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {ArrowLeft} from "lucide-react";

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
	useEffect(() => {
		console.log(data);
	}, [data]);
	
	return (
		<div className="max-h-screen overflow-y-scroll bg-gray-100">
			<Modal
				// title="Task Update"
				centered
				open={modalOpen}
				onCancel={() => setModalOpen(false)}
				footer={[
				
				]}
			>
				<form onSubmit={handleSubmit(onSubmit)}
				      className=" w-full rounded-lg p-6 bg-white">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{/*<div>*/}
						{/*	<label htmlFor="updated_by_id" className="text-gray-700">Updated By ID</label>*/}
						{/*	<input*/}
						{/*		id="updated_by_id"*/}
						{/*		{...register("updated_by_id", {required: "Updated by ID is required"})}*/}
						{/*		type="text"*/}
						{/*		className="w-full p-3 border rounded-md mt-1"*/}
						{/*	/>*/}
						{/*	{errors.updated_by_id && <p className="text-red-500">{errors.updated_by_id.message}</p>}*/}
						{/*</div>*/}
						
						{/*<div>*/}
						{/*	<label htmlFor="updated_by_name" className="text-gray-700">Updated By Name</label>*/}
						{/*	<input*/}
						{/*		id="updated_by_name"*/}
						{/*		{...register("updated_by_name", {required: "Updated by name is required"})}*/}
						{/*		type="text"*/}
						{/*		className="w-full p-3 border rounded-md mt-1"*/}
						{/*	/>*/}
						{/*	{errors.updated_by_name &&*/}
                        {/*        <p className="text-red-500">{errors.updated_by_name.message}</p>}*/}
						{/*</div>*/}
						
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
						
						{/*<div className="col-span-1 sm:col-span-2">*/}
						{/*	<label htmlFor="update_date_time" className="text-gray-700">Update Date Time</label>*/}
						{/*	<input*/}
						{/*		id="update_date_time"*/}
						{/*		{...register("update_date_time")}*/}
						{/*		type="datetime-local"*/}
						{/*		className="w-full p-3 border rounded-md mt-1"*/}
						{/*	/>*/}
						{/*</div>*/}
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
				className="bg-white p-3 border-b-2 border font-open-sans items-center flex justify-between items-center sticky top-0 z-[100]"
			>
				<p className="font-semibold text-lg flex gap-2 items-center">
					
						<Link to={'/tasks'}>
							<ArrowLeft/>
						</Link>
						<h1>
							{`Task details`}
						</h1>
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
				
				<TaskTimeline/>
			</div>
		</div>
	);
};

export default TaskDetails;
