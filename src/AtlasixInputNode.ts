import { assertType } from "./utils/validation"

export class AtlasixInputNode {
    id: string;
    text: string;
    textColor: string;
    textSize: number;
    fillColor: string;
    borderColor: string;
    shape: string;
    image: string;
    width: number;
    height: number;
    x: number;
    y: number;
    data: any;

    constructor (
        id: string = "",
        text: string = "",
        textColor: string = "black",
        textSize: number = 25,
        fillColor: string,
        borderColor: string = "black",
        shape: string,
        image: string = "",
        width: number = 50,
        height: number = 50,
        x: number,
        y: number,
        data: any = {}
    ) {
        this.id = id;
        this.text = text;
        this.textColor = textColor;
        this.textSize = textSize;
        this.fillColor = fillColor;
        this.borderColor = borderColor;
        this.shape = shape;
        this.image = image;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.data = data;
    }

    static fromJson(json: any) {
        if (json.id != undefined) {assertType(json.id, "string", "id", "Node")}
        if (json.text != undefined) {assertType(json.text, "string", "text", "Node")}
        if (json.textColor != undefined) {assertType(json.textColor, "string", "textColor", "Node")}
        if (json.textSize != undefined) {assertType(json.textSize, "number", "textSize", "Node")}
        if (json.fillColor != undefined) {assertType(json.fillColor, "string", "fillColor", "Node")}
        if (json.borderColor != undefined) {assertType(json.borderColor, "string", "borderColor", "Node")}
        if (json.shape != undefined) {assertType(json.shape, "string", "shape", "Node")}
        if (json.image != undefined) {assertType(json.image, "string", "image", "Node")}
        if (json.width != undefined) {assertType(json.width, "number", "width", "Node")}
        if (json.height != undefined) {assertType(json.height, "number", "height", "Node")}
        if (json.x != undefined) {assertType(json.x, "number", "x", "Node")}
        if (json.y != undefined) {assertType(json.y, "number", "y", "Node")}

        return new AtlasixInputNode(
            json.id,
            json.text,
            json.textColor,
            json.textSize,
            json.fillColor,
            json.borderColor,
            json.shape,
            json.image,
            json.width,
            json.height,
            json.x,
            json.y,
            json.data
        );
    }
}
