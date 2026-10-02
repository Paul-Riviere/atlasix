import { assertType } from "./utils/validation";

export class AtlasixInputEdge {
	source: string;
	target: string;
	color: string;
	width: number;
	borderColor: string;
	text: string;
	textColor: string;
	textSize: number;
	style: string;
	animation: string;
	data: Record<string, unknown>;

	constructor(
		source: string,
		target: string,
		color: string = "black",
		width: number = 1,
		borderColor: string = "black",
		text: string = "",
		textColor: string = "black",
		textSize: number = 15,
		style: string = "solid",
		animation: string = "none",
		data: Record<string, unknown> = {},
	) {
		this.source = source;
		this.target = target;
		this.color = color;
		this.width = width;
		this.borderColor = borderColor;
		this.text = text;
		this.textColor = textColor;
		this.textSize = textSize;
		this.style = style;
		this.animation = animation;
		this.data = data;
	}

	// biome-ignore lint/suspicious/noExplicitAny: raw user JSON, validated field by field below
	static fromJson(json: any) {
		if (json.source !== undefined) {
			assertType(json.source, "string", "source", "Edge");
		}
		if (json.target !== undefined) {
			assertType(json.target, "string", "target", "Edge");
		}
		if (json.color !== undefined) {
			assertType(json.color, "string", "color", "Edge");
		}
		if (json.width !== undefined) {
			assertType(json.width, "number", "width", "Edge");
		}
		if (json.borderColor !== undefined) {
			assertType(json.borderColor, "string", "borderColor", "Edge");
		}
		if (json.text !== undefined) {
			assertType(json.text, "string", "text", "Edge");
		}
		if (json.textColor !== undefined) {
			assertType(json.textColor, "string", "textColor", "Edge");
		}
		if (json.textSize !== undefined) {
			assertType(json.textSize, "number", "textSize", "Edge");
		}
		if (
			json.style !== undefined &&
			!["solid", "dashed", "dotted"].includes(json.style)
		) {
			throw new Error(`Edge style must be "solid", "dashed" or "dotted".`);
		}
		if (
			json.animation !== undefined &&
			!["none", "forward", "backward", "blink"].includes(json.animation)
		) {
			throw new Error(
				`Edge animation must be "none", "forward", "backward" or "blink".`,
			);
		}

		return new AtlasixInputEdge(
			json.source,
			json.target,
			json.color,
			json.width,
			json.borderColor,
			json.text,
			json.textColor,
			json.textSize,
			json.style,
			json.animation,
			json.data,
		);
	}
}
