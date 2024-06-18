import Dagre from "@dagrejs/dagre";
import {Edge, Node} from "reactflow";

const getLayoutedElements = (
	nodes: Node[],
	edges: Edge[]
): { nodes: Node[]; edges: Edge[] } => {
	const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
	g.setGraph({
		rankdir: "TB",
		nodesep: 350,
		edgesep: 300,
		ranksep: 400,
	});
	edges.forEach((edge) => g.setEdge(edge.source, edge.target));
	nodes.forEach((node) => g.setNode(node.id, node as Dagre.Label));
	
	Dagre.layout(g);
	return {
		nodes: nodes.map((node) => {
			const {x, y} = g.node(node.id);
			return {...node, position: {x, y}};
		}),
		edges
	};
};

export default getLayoutedElements
