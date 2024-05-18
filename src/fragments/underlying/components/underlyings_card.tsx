import { UnderlyingModel } from "@/fragments/user_management/models/underlying_model";
import { ShieldPlus } from "lucide-react";
import React, { memo } from 'react';
import { Handle, NodeResizer, Position } from "reactflow";
// import { Handle, Position } from "reactflow";

interface Props {
    data: UnderlyingModel,
    onClick?: VoidFunction,
}

const UnderlyingCard: React.FC<Props> = ({ data }) => {
    return (
        <div className="rounded-md w-max p-2">
            <NodeResizer minWidth={200} minHeight={30} />
            <div className="ml-2 ">
                <div className="text-lg font-bold flex gap-4  items-center">
                    <ShieldPlus />
                    {data.name}
                </div>
                <div className="text-gray-500">{data.post}</div>
                <div className="flex justify-between gap-3 mt-6">

                    <button type="button" className="bg-blue-400 p-2 rounded-lg text-white">
                        view profile
                    </button>

                    <button
                        type="button"
                        className="bg-blue-400 p-2 rounded-lg text-white"
                    >
                        view Underlying
                    </button>
                </div>
            </div>

            <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
            <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
        </div>
    );
}

const MemoizedCustomNode = memo(UnderlyingCard);
export default MemoizedCustomNode;