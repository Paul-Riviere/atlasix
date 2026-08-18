import { AtlasixInputEdge } from "./AtlasixInputEdge";
import { AtlasixInputNode } from "./AtlasixInputNode";

export class AtlasixSvgObject {
    id: string;
    data: any;
    svgElement: SVGElement;
    input: AtlasixInputNode | AtlasixInputEdge;

    constructor (
        id: string,
        data: any,
        svgElement: SVGElement,
        input: AtlasixInputNode | AtlasixInputEdge
    ) {
        this.id = id;
        this.data = data;
        this.svgElement = svgElement;
        this.input = input;
    }
}
