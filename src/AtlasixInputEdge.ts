import { assertType } from "./utils/validation";

export class AtlasixInputEdge {
    source: string;
    target: string;
    color: string;
    width: number;
    borderColor: string;
    style: string;
    animation: string;
    data: any;

    constructor (
        source: string,
        target: string,
        color: string = "black",
        width: number = 1,
        borderColor: string = "black",
        style: string = "solid",
        animation: string = "none",
        data: any = {}
    ) {
        this.source = source;
        this.target = target;
        this.color = color;
        this.width = width;
        this.borderColor = borderColor;
        this.style = style;
        this.animation = animation;
        this.data = data;
    }

    static fromJson(json: any) {
        if (json.source != undefined) {assertType(json.source, "string", "source", "Edge")}
        if (json.target != undefined) {assertType(json.target, "string", "target", "Edge")}
        if (json.color != undefined) {assertType(json.color, "string", "color", "Edge")}
        if (json.width != undefined) {assertType(json.width, "number", "width", "Edge")}
        if (json.borderColor != undefined) {assertType(json.borderColor, "string", "borderColor", "Edge")}
        if (json.style != undefined && !["solid", "dashed", "dotted"].includes(json.style)) {throw new Error(`Edge style must be "solid", "dashed" or "dotted".`)}
        if (json.animation != undefined && !["none", "forward", "backward", "blink"].includes(json.animation)) {throw new Error(`Edge animation must be "none", "forward", "backward" or "blink".`)}

        return new AtlasixInputEdge(
            json.source,
            json.target,
            json.color,
            json.width,
            json.borderColor,
            json.style,
            json.animation,
            json.data
        );
    }
}
