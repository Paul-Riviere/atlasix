import { assertType } from "./utils/validation";

export class AtlasixInputEdge {
    source: string;
    target: string;
    color: string;
    width: number;
    borderColor: string;
    data: any;

    constructor (
        source: string,
        target: string,
        color: string = "black",
        width: number = 1,
        borderColor: string = "black",
        data: any = {}
    ) {
        this.source = source;
        this.target = target;
        this.color = color;
        this.width = width;
        this.borderColor = borderColor;
        this.data = data;
    }

    static fromJson(json: any) {
        if (json.source != undefined) {assertType(json.source, "string", "source", "Edge")}
        if (json.target != undefined) {assertType(json.target, "string", "target", "Edge")}
        if (json.color != undefined) {assertType(json.color, "string", "color", "Edge")}
        if (json.width != undefined) {assertType(json.width, "number", "width", "Edge")}
        if (json.borderColor != undefined) {assertType(json.borderColor, "string", "borderColor", "Edge")}

        return new AtlasixInputEdge(
            json.source,
            json.target,
            json.color,
            json.width,
            json.borderColor,
            json.data
        );
    }
}
