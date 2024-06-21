import React, {useState} from 'react'
import {useSelector} from "react-redux";
import {RootState} from "@/common/redux/store.ts";
import TaskTable from "@/fragments/tasks/pages/task_table.tsx";
import {FileTextOutlined} from "@ant-design/icons";
import {Radio} from "antd";

const TaskPage = () => {
	const {stationList, userdata} = useSelector((s: RootState) => s.auth);
	const [taskType, setTaskType] = useState<'alloted_by_user' | 'alloted_to_user'>('alloted_by_user')
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
			<div
				className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
				<p className="font-semibold text-xl">
					<FileTextOutlined/> {"Tasks"}
				</p>
				<Radio.Group defaultValue={taskType} buttonStyle="solid"
				             onChange={(e) => setTaskType(e.target.value)}
				>
					<Radio.Button value="alloted_by_user">Alloted by me</Radio.Button>
					<Radio.Button value="alloted_to_user">Alloted to me</Radio.Button>
				</Radio.Group>
			</div>
			<div className="p-4">
				
				<TaskTable userId={userdata?.id || ''} role={taskType}/>
			</div>
		</div>
	)
}
export default TaskPage
