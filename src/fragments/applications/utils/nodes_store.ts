import {create} from "zustand";
import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Connection,
	Edge,
	EdgeChange,
	Node,
	NodeChange,
	OnConnect,
	OnEdgesChange,
	OnNodesChange
} from "reactflow";

export type RFState = {
	draggedNode?: Node;
	nodes: Node[];
	edges: Edge[];
	onNodesChange: OnNodesChange;
	onEdgesChange: OnEdgesChange;
	onConnect: OnConnect;
	onSetLayout: any;
	onSetDraggedNode: any;
};

const initialNodes = [
	{
		id: "1",
		type: "triggerNode",
		data: {label: "input"},
		position: {x: 0, y: 0}
	},
	{
		id: "2",
		type: "taskNode",
		data: {label: "node 2"},
		position: {x: 0, y: 0}
	},
	{
		id: "2a",
		type: "taskNode",
		data: {label: "node 2a"},
		position: {x: 0, y: 0}
	},
	{
		id: "2b",
		type: "taskNode",
		data: {label: "node 2b"},
		position: {x: 0, y: 0}
	},
	{
		id: "2ba",
		type: "taskNode",
		data: {label: "node 2ba"},
		position: {x: 0, y: 0}
	},
	{
		id: "2c",
		type: "taskNode",
		data: {label: "node 2c"},
		position: {x: 0, y: 0}
	},
	{
		id: "2d",
		type: "taskNode",
		data: {label: "node 2d"},
		position: {x: 0, y: 0}
	},
	{
		id: "3",
		type: "taskNode",
		data: {label: "node 3"},
		position: {x: 0, y: 0}
	}
];

export const initialEdges = [
	{id: "e12", source: "1", target: "2", type: "addInbetweenStepEdge"},
	{id: "e13", source: "1", target: "3", type: "addInbetweenStepEdge"},
	{id: "e22a", source: "2", target: "2a", type: "addInbetweenStepEdge"},
	{id: "e2b2ba", source: "2b", target: "2ba", type: "addInbetweenStepEdge"},
	{id: "e22b", source: "2", target: "2b", type: "addInbetweenStepEdge"},
	{id: "e22c", source: "2", target: "2c", type: "addInbetweenStepEdge"},
	{
		id: "e2c2d",
		source: "2c",
		target: "2d",
		type: "addEndStepEdge",
		label: "sdsds"
	}
];

const useRFStore = create<RFState>((set, get) => ({
	draggedNode: undefined,
	nodes: initialNodes,
	edges: initialEdges,
	onNodesChange: (changes: NodeChange[]) => {
		set({
			nodes: applyNodeChanges(changes, get().nodes)
		});
	},
	onEdgesChange: (changes: EdgeChange[]) => {
		set({
			edges: applyEdgeChanges(changes, get().edges)
		});
	},
	onSetLayout: (nodes: Node[], edges: Edge[]) => {
		set({
			nodes,
			edges
		});
	},
	onConnect: (connection: Connection) => {
		set({
			edges: addEdge(connection, get().edges)
		});
	},
	onSetDraggedNode: (node?: Node) => {
		set({
			draggedNode: node
		});
	}
}));

export default useRFStore;
