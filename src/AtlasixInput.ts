import { AtlasixInputEdge } from "./AtlasixInputEdge";
import { AtlasixInputNode } from "./AtlasixInputNode";

export class AtlasixInput {
	backgroundColor: string;
	width: number;
	height: number;
	nodes: AtlasixInputNode[];
	edges: AtlasixInputEdge[];

	constructor(
		backgroundColor: string = "white",
		width: number = 0,
		height: number = 0,
		nodes: AtlasixInputNode[] = [],
		edges: AtlasixInputEdge[] = [],
	) {
		this.backgroundColor = backgroundColor;
		this.width = width;
		this.height = height;
		this.nodes = nodes;
		this.edges = edges;
	}

	static fromJson(json: {
		backgroundColor?: string;
		width?: number;
		height?: number;
		nodes?: unknown[];
		edges?: unknown[];
	}) {
		return new AtlasixInput(
			json.backgroundColor,
			json.width,
			json.height,
			json.nodes?.map((node) => AtlasixInputNode.fromJson(node)) ?? [],
			json.edges?.map((edge) => AtlasixInputEdge.fromJson(edge)) ?? [],
		);
	}
}
