import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import ReactFlow, {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Controls,
	DefaultEdgeOptions,
	Edge,
	FitViewOptions,
	Node,
	OnConnect,
	OnEdgesChange,
	OnNodesChange,
	ReactFlowProvider,
	useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import "reactflow/dist/base.css";
import {RootState} from "@/common/redux/store";
import useGetAllUnderlyings from "@/fragments/underlying/hooks/use_get_all_underlyings.ts";
import getLayoutedElements from "@/fragments/applications/utils/get_layouted_elements.ts";
import useGetDocument from "@/common/hooks/use_get_document.ts";
import {UserModel} from "@/fragments/user_management/models/user_model.ts";
import UnderlyingCard from "@/fragments/underlying/components/underlyings_card.tsx";
import UnderlyingCardNode from "@/fragments/applications/components/underlying_card_node.tsx";
import {Home} from "lucide-react";

const fitViewOptions: FitViewOptions = {
	padding: 0.2,
};

const nodeTypes = {
	underlyingCardNode: UnderlyingCardNode, // Register your custom node component
};


const defaultEdgeOptions: DefaultEdgeOptions = {
	animated: true,
};

const UnderlyingGraph = () => {
	const {currentUser} = useSelector((state: RootState) => state.auth);
	const [searchParams, setSearchParams] = useSearchParams();
	const [superiorId, setSuperiorId] = useState<string | null>(null);
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const {data: superiorData} = useGetDocument<UserModel>({
		path: "users",
		docId: superiorId,
	});
	
	const changeSuperiorId = useCallback(
		(id: string | null) => {
			if (!id) {
				return;
			}
			
			searchParams.set("id", id);
			setSearchParams(searchParams);
			setSuperiorId(id);
		},
		[searchParams, setSearchParams]
	);
	
	useEffect(() => {
		const id = searchParams.get("id") || currentUser?.user.uid || '';
		changeSuperiorId(id);
	}, [searchParams, currentUser?.user.uid]);
	
	const {documents, fetchUnderlyings} = useGetAllUnderlyings(15, superiorId);
	
	useEffect(() => {
		if (superiorId) {
			fetchUnderlyings();
		}
	}, [superiorId]);
	
	useEffect(() => {
		if (documents.length > 0 || superiorData) {
			const newNodes: Node[] = documents.map((document) => ({
				id: document.id || '1',
				style: {width: 'max-content'},
				data: {
					label: <UnderlyingCard data={document} onclick={() => {
						changeSuperiorId(document.id || '')
					}}/>
				},
				position: {x: 0, y: 0},
			}));
			
			const newEdges: Edge[] = documents.map((document) => ({
				id: `e${document.reporting_officer_id}-${document.id}`,
				source: document.reporting_officer_id || '',
				target: document.id || '2',
				type: "smoothstep",
			}));
			
			if (superiorData) {
				// Add the superior node
				newNodes.push({
					id: superiorData.id || '',
					style: {width: 'max-content'},
					data: {
						label: <UnderlyingCard data={superiorData} onclick={() => {
							changeSuperiorId(superiorData.id || '')
						}}/>
					},
					position: {x: 0, y: 0},
				});
			}
			
			
			const {nodes: layoutedNodes, edges: layoutedEdges} = getLayoutedElements(newNodes, newEdges);
			setNodes(layoutedNodes);
			setEdges(layoutedEdges);
		}
	}, [documents, superiorData]);
	
	const onNodesChange: OnNodesChange = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[]
	);
	
	const onEdgesChange: OnEdgesChange = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[]
	);
	
	const onConnect: OnConnect = useCallback(
		(connection) => setEdges((eds) => addEdge(connection, eds)),
		[]
	);
	
	const {fitView} = useReactFlow();
	useEffect(() => {
		fitView({padding: 0.2});
	}, [fitView, nodes, edges]);
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
			<div
				className="bg-white p-3 border-b-2 border  font-semibold flex justify-between items-center  sticky top-0 z-[100]">
				
				<h1 className={'font-open-sans text-base'}>
					{"Underlyings"}
					{
						superiorData && (<span>
						{` of ${superiorData.name} (${superiorData.post})`}
						</span>)
					}
				</h1>
				<button type="submit"
				        onClick={() => {
					        changeSuperiorId(currentUser?.user.uid || null)
				        }}>
					<Home/>
				</button>
			</div>
			<div className="p-4 h-[80vh] w-full">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					fitView
					nodeTypes={nodeTypes}
					fitViewOptions={fitViewOptions}
					defaultEdgeOptions={defaultEdgeOptions}
				>
					<Controls/>
				</ReactFlow>
			</div>
		</div>
	);
};


const Flow = () => (
	<ReactFlowProvider>
		<UnderlyingGraph/>
	</ReactFlowProvider>
);

export default Flow;
