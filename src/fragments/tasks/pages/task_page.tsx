import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store.ts";
import TaskTable from "@/fragments/tasks/pages/task_table.tsx";
import { FileTextOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import FIRTaskTable from "@/fragments/tasks/components/fir_task_table.tsx";
import { useSearchParams } from "react-router-dom";

const TaskPage = () => {
	const { stationList, userdata } = useSelector((s: RootState) => s.auth);
	const [searchParams] = useSearchParams();
	const personnelId = searchParams.get('personnel');
	const [taskType, setTaskType] = useState<'alloted_by_user' | 'alloted_to_user' | 'fir_tasks'>('alloted_by_user')

	// Automatically switch to FIR tasks tab when personnel filter is present
	useEffect(() => {
		if (personnelId) {
			setTaskType('fir_tasks');
		}
	}, [personnelId]);

	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
			<div
				className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
				<p className="font-semibold text-xl">
					<FileTextOutlined /> {"Tasks"}
				</p>
				<Radio.Group value={taskType} buttonStyle="solid"
					onChange={(e) => setTaskType(e.target.value)}
				>
					<Radio.Button value="alloted_by_user">Alloted by me</Radio.Button>
					<Radio.Button value="alloted_to_user">Alloted to me</Radio.Button>
					<Radio.Button value="fir_tasks">FIR Tasks</Radio.Button>
				</Radio.Group>
			</div>
			<div className="p-4">
				{taskType === 'fir_tasks' ? (
					<FIRTaskTable />
				) : (
					<TaskTable userId={userdata?.id || ''} role={taskType} />
				)}
			</div>
		</div>
	)
}
export default TaskPage
