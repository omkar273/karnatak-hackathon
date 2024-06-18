// UnderlyingCardNode.tsx
import {Handle, Position} from 'reactflow';
import UnderlyingCard from "@/fragments/underlying/components/underlyings_card.tsx";
import {UserModel} from "@/fragments/user_management/models/user_model.ts";

const UnderlyingCardNode = ({data}: { data: UserModel }) => {
	return (
		<div className="rounded-md bg-white z-10 p-2">
			{/* Your existing UnderlyingCard component */}
			<UnderlyingCard data={data}/>
			
			{/* Handles for connecting edges */}
			<Handle type="target" position={Position.Top} className="w-16 bg-teal-500"/>
			<Handle type="source" position={Position.Bottom} className="w-16 bg-teal-500"/>
		</div>
	);
};

export default UnderlyingCardNode;
