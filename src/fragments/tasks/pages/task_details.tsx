import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import useGetDocument from "@/common/hooks/use_get_document.ts";
import TaskModel, {TaskUpdateModel} from "@/types/task_model.ts";

const TaskDetails = () => {
	const [queryParams] = useSearchParams();
	const id = queryParams.get('id');
	const {data, error, loading} = useGetDocument<TaskModel>({docId: id, path: 'tasks'});
	const [updates, setUpdates] = useState<TaskUpdateModel[]>([]);
	
	useEffect(() => {
		console.log(data);
	}, [data]);
	
	const handleAddUpdate = (update: TaskUpdateModel) => {
		setUpdates([...updates, update]);
	};
	
	return (
		<div className="max-h-screen overflow-y-scroll bg-gray-100">
			<p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
				{"Task Details"}
			</p>
			
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
				
				<TaskUpdatesSection updates={updates} onAddUpdate={handleAddUpdate}/>
			</div>
		</div>
	);
};

const TaskUpdatesSection = ({updates, onAddUpdate}: { updates: TaskUpdateModel[], onAddUpdate: any }) => {
	const [newUpdate, setNewUpdate] = useState<TaskUpdateModel>({title: '', description: ''});
	
	const handleChange = (e) => {
		const {name, value} = e.target;
		setNewUpdate({...newUpdate, [name]: value});
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (newUpdate.title && newUpdate.description) {
			onAddUpdate({...newUpdate, update_date_time: new Date().toISOString()});
			setNewUpdate({title: '', description: ''});
		}
	};
	
	return (
		<div className="mt-6">
			<h3 className="text-lg font-semibold mb-4">Updates</h3>
			<div className="space-y-4">
				{updates.map((update, index) => (
					<div key={index} className="bg-white shadow rounded-lg p-4">
						<h4 className="font-bold">{update.title}</h4>
						<p>{update.description}</p>
						<p className="text-sm text-gray-500">{update.update_date_time}</p>
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4 mt-6">
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Title</label>
					<input
						type="text"
						name="title"
						value={newUpdate.title}
						onChange={handleChange}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Description</label>
					<textarea
						name="description"
						value={newUpdate.description}
						onChange={handleChange}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
					></textarea>
				</div>
				<button
					type="submit"
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
				>
					Add Update
				</button>
			</form>
		</div>
	);
};

export default TaskDetails;
