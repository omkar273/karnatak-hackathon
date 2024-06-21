import TaskAssignmentPage from "@/fragments/tasks/pages/add_task_page.tsx";
import {SnippetsOutlined} from "@ant-design/icons";
import {Button, Modal} from "antd";
import {ShieldPlus} from "lucide-react";
import React, {memo, useState} from 'react';
import {Link} from "react-router-dom";
import {Handle, NodeResizer, Position} from "reactflow";
import {UserModel} from "@/fragments/user_management/models/user_model.ts";

// import { Handle, Position } from "reactflow";

interface Props {
	data: UserModel,
	onclick?: VoidFunction
	
}

const UnderlyingCard: React.FC<Props> = ({data, onclick}) => {
	const [modalOpen, setmodalOpen] = useState<boolean>(false);
	
	return (
		<div className="rounded-md   w-max p-2">
			<NodeResizer minWidth={400} minHeight={30}/>
			<div className="ml-2 w-full ">
				<div className="text-lg font-bold flex gap-4  items-center">
					<ShieldPlus/>
					{data.name}
				</div>
				<p className="text-gray-500">{data.post}</p>
				
				<div className="text-[0.75rem]  font-medium flex gap-4 mt-6  items-center">
					<SnippetsOutlined/>
					{data.open_cases}
					{' cases pending'}
				</div>
				<div className="flex justify-between gap-3 mt-6">
					
					<Link
						to={`/user`}
						className="bg-blue-400 p-2 rounded-lg text-white"
					>
						view Profile
					</Link>
					<button
						onClick={onclick}
						// to={`/user/underlying?id=${data.underlyingId}`}
						className="bg-blue-400 p-2 rounded-lg text-white"
					>
						view Underlying
					</button>
				</div>
				<div
					onClick={() => setmodalOpen((prev) => !prev)}
					className="w-full bg-blue-400 my-2 rounded-lg p-3 text-white">
					Add Task
				</div>
			</div>
			
			<Handle type="target" position={Position.Top} className="w-16 !bg-teal-500"/>
			<Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500"/>
			
			<Modal
				// title="Test Credentials"
				centered
				open={modalOpen}
				onCancel={() => setmodalOpen(false)}
				footer={[
					<Button
						key="submit"
						type="primary"
						className="bg-blue-600"
						onClick={() => setmodalOpen(false)}>
						Ok
					</Button>,
				]}
			>
				<TaskAssignmentPage/>
			</Modal>
		</div>
	);
}

const MemoizedCustomNode = memo(UnderlyingCard);
export default MemoizedCustomNode;
