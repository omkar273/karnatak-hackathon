import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import useGetDocument from "@/common/hooks/use_get_document.ts";
import TaskModel, {TaskUpdateModel} from "@/types/task_model.ts";
import TaskTimeline from "@/fragments/tasks/components/task_timeline.tsx";

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
				
				
				
				<TaskTimeline/>
			</div>
		</div>
	);
};

export default TaskDetails;
