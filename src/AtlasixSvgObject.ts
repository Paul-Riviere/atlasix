import type { AtlasixInputEdge } from "./AtlasixInputEdge";
import type { AtlasixInputNode } from "./AtlasixInputNode";

export class AtlasixSvgObject {
	id: string;
	data: Record<string, unknown>;
	svgElement: SVGElement;
	input: AtlasixInputNode | AtlasixInputEdge;

	constructor(
		id: string,
		data: Record<string, unknown>,
		svgElement: SVGElement,
		input: AtlasixInputNode | AtlasixInputEdge,
	) {
		this.id = id;
		this.data = data;
		this.svgElement = svgElement;
		this.input = input;
	}
}
