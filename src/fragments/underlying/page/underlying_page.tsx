import { RootState } from "@/common/redux/store";
import { useSelector } from "react-redux";
import useGetAllUnderlyings from "../hooks/use_get_all_underlyings";
import { useEffect, useState } from "react";
import ReactFlow, {
    Node,
    Controls,
    useNodesState,
    useEdgesState,
    Edge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import 'reactflow/dist/base.css';
import UnderlyingCard from "../components/underlyings_card";

type pair = {
    x: number,
    y: number,
}

const getPositions = (length: number, gap: number = 150, yGap: number): pair[] => {

    let initialY = 100;
    const positionsArr: pair[] = []

    for (let index = 0; index < length; index++) {
        if (index % 2 === 0) {
            initialY += yGap;
            positionsArr.push({
                x: window.innerWidth / 2 - gap,
                y: initialY,
            });
        } else {
            positionsArr.push({
                x: window.innerWidth / 2 + gap,
                y: initialY,
            });
        }
    }

    return positionsArr;
}


const UnderlyingDataPage = () => {
    const { currentUser, userdata } = useSelector(
        (state: RootState) => state.auth
    );

    const { documents, fetchUnderlyings } = useGetAllUnderlyings(15, currentUser?.user.uid);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);


    useEffect(() => {
        fetchUnderlyings();
    }, []);

    useEffect(() => {
        if (documents.length > 0) {

            const positions = getPositions(documents.length, 200, 200)

            setNodes((nds) => [
                ...nds,
                {
                    id: currentUser?.user.uid ?? '',
                    position: { x: window.innerWidth / 2, y: 0 },
                    style: { width: 'max-content' },
                    data: {
                        label: <UnderlyingCard data={{
                            id: currentUser?.user.uid ?? '',
                            name: userdata?.name ?? '',
                            openCases: userdata?.open_cases ?? 0,
                            post: userdata?.post ?? '',
                            stationId: userdata?.stationId ?? '',

                        }}

                        />
                    },
                    type: 'input'
                },
                ...documents.map((userUnderlying, i) => ({
                    id: userUnderlying.id ?? i.toString(),
                    position: positions[i],
                    style: { width: 'max-content' },
                    data: {
                        label: <UnderlyingCard data={userUnderlying} />
                    }
                }))
            ]);

            setEdges((eds) => [
                ...eds,
                ...documents.map((userUnderlying, i) => ({
                    id: `e-${i}`,
                    source: currentUser?.user.uid ?? '',
                    target: userUnderlying.id ?? i.toString(),
                    type: 'smoothstep',
                }))
            ]);
        }
    }, [documents]);

    const initialNodes: Node<unknown, string | undefined>[] = [];

    const initialEdges: Edge<unknown>[] = [];

    useEffect(() => {
        setNodes(initialNodes);
        setEdges(initialEdges);
    }, []);

    return (
        <div className="max-h-screen  overflow-y-scroll overflow-hidden bg-gray-100">
            <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
                {"Underlyings"}
            </p>
            <div className="p-4 h-[80vh] w-full">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    className="w-[1500px]"
                >   x
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    )
}

export default UnderlyingDataPage;
