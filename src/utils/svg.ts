import type { AtlasixDiagram } from "../AtlasixDiagram";
import type { AtlasixInput } from "../AtlasixInput";
import { AtlasixSvgObject } from "../AtlasixSvgObject";

// px per second, same visual speed whatever the edge width
const EDGE_FLOW_SPEED = 40;

export function setViewBox(baseSvg: SVGSVGElement, inputData: AtlasixInput) {
	baseSvg.setAttribute(
		"viewBox",
		`0 0 ${inputData.width ?? baseSvg.clientWidth} ${inputData.height ?? baseSvg.clientHeight}`,
	);
}

export function createViewer(inputData: AtlasixInput) {
	const atlasixViewer = document.createElement("div");
	atlasixViewer.classList.add("atlasix-viewer");
	atlasixViewer.style.width = "100%";
	atlasixViewer.style.height = "100%";

	const baseSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	baseSvg.classList.add("atlasix-base-svg");
	baseSvg.style.backgroundColor = inputData.backgroundColor;
	baseSvg.setAttribute("width", "100%");
	baseSvg.setAttribute("height", "100%");
	baseSvg.id = "baseSvg";

	const viewport = document.createElementNS("http://www.w3.org/2000/svg", "g");
	viewport.id = "viewport";

	baseSvg.appendChild(viewport);
	atlasixViewer.append(baseSvg);

	window.addEventListener("resize", () => setViewBox(baseSvg, inputData));
	window.addEventListener("load", () => setViewBox(baseSvg, inputData));

	return { atlasixViewer, baseSvg, viewport };
}

export function createNodesAndSetNodesDataSVG(
	onSelectedCallback: (
		e: AtlasixSvgObject,
		atlasixDiagram: AtlasixDiagram,
	) => void,
	onMouseOverCallback: (atlasixDiagram: AtlasixDiagram) => void,
	onMouseOutCallback: (atlasixDiagram: AtlasixDiagram) => void,
	atlasixDiagram: AtlasixDiagram,
) {
	for (const node of atlasixDiagram.input.nodes) {
		let tmpNode: SVGElement | undefined;
		if (node.shape) {
			switch (node.shape) {
				case "rectangle":
					tmpNode = document.createElementNS(
						"http://www.w3.org/2000/svg",
						"rect",
					);
					tmpNode.setAttribute("x", node.x.toString());
					tmpNode.setAttribute("y", node.y.toString());
					tmpNode.setAttribute("width", node.width.toString());
					tmpNode.setAttribute("height", node.height.toString());
					tmpNode.setAttribute("fill", node.fillColor);
					tmpNode.setAttribute("stroke-width", "3");

					break;
				case "triangle":
					tmpNode = document.createElementNS(
						"http://www.w3.org/2000/svg",
						"polygon",
					);
					tmpNode.setAttribute(
						"points",
						`${node.x} ${node.y + node.height}, ${node.x + node.width} ${node.y + node.height}, ${node.x + node.width / 2} ${node.y}`,
					);
					tmpNode.setAttribute("x", node.x.toString());
					tmpNode.setAttribute("y", node.y.toString());
					tmpNode.setAttribute("fill", node.fillColor);
					tmpNode.setAttribute("stroke-width", "3");

					break;
				case "circle":
					tmpNode = document.createElementNS(
						"http://www.w3.org/2000/svg",
						"circle",
					);
					tmpNode.setAttribute("cx", (node.x + node.width / 2).toString());
					tmpNode.setAttribute("cy", (node.y + node.width / 2).toString());
					tmpNode.setAttribute("r", (node.width / 2).toString());
					tmpNode.setAttribute("fill", node.fillColor);
					tmpNode.setAttribute("stroke-width", "3");

					break;
			}

			if (!tmpNode) {
				throw new Error(
					"tmpNode may be undefined, verify the node.shape parameter.",
				);
			}

			const tmpSvgObject = new AtlasixSvgObject(
				node.id ? node.id : `atlasix-node-${node.id.toString()}`,
				node.data,
				tmpNode,
				node,
			);
			atlasixDiagram.elements.set(tmpSvgObject.id, tmpSvgObject);

			tmpNode.onmousedown = () => {
				onSelectedCallback(tmpSvgObject, atlasixDiagram);
			};

			tmpNode.onmouseover = () => {
				onMouseOverCallback(atlasixDiagram);
			};

			tmpNode.onmouseout = () => {
				onMouseOutCallback(atlasixDiagram);
			};

			tmpNode.setAttribute("id", tmpSvgObject.id);
			atlasixDiagram.viewport.append(tmpNode);
		} else if (node.image) {
			const tmpImage = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"image",
			);
			tmpImage.setAttribute("x", node.x.toString());
			tmpImage.setAttribute("y", node.y.toString());
			tmpImage.setAttribute("href", node.image);
			tmpImage.setAttribute("width", node.width.toString());
			tmpImage.setAttribute("height", node.height.toString());
			tmpImage.setAttribute("stroke", node.borderColor);
			tmpImage.setAttribute("stroke-width", "3");

			const tmpSvgObject = new AtlasixSvgObject(
				node.id ? node.id : `atlasix-node-${node.id.toString()}`,
				node.data,
				tmpImage,
				node,
			);

			tmpImage.onmousedown = () => {
				onSelectedCallback(tmpSvgObject, atlasixDiagram);
			};

			tmpImage.onmouseover = () => {
				onMouseOverCallback(atlasixDiagram);
			};

			tmpImage.onmouseout = () => {
				onMouseOutCallback(atlasixDiagram);
			};

			atlasixDiagram.elements.set(tmpSvgObject.id, tmpSvgObject);

			tmpImage.setAttribute("id", tmpSvgObject.id);
			atlasixDiagram.viewport.append(tmpImage);
		}

		if (node.text) {
			const tmpText = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"text",
			);
			tmpText.setAttribute("x", (node.x + node.width / 2).toString());
			if (node.textPosition === "inside") {
				tmpText.setAttribute("y", (node.y + node.height / 2).toString());
				tmpText.setAttribute("dominant-baseline", "central");
			} else if (node.textPosition === "above") {
				tmpText.setAttribute("y", (node.y - node.textSize / 3).toString());
			} else {
				tmpText.setAttribute(
					"y",
					(node.y + node.height + node.textSize).toString(),
				);
			}
			tmpText.setAttribute("width", node.width.toString());
			tmpText.setAttribute("height", node.height.toString());
			tmpText.setAttribute("fill", node.textColor);
			tmpText.setAttribute("font-size", node.textSize.toString());
			tmpText.classList.add("atlasix-node-text");
			tmpText.textContent = node.text;

			const tmpSvgObject = new AtlasixSvgObject(
				node.id ? node.id : `atlasix-node-${node.id.toString()}-text`,
				node.data,
				tmpText,
				node,
			);
			atlasixDiagram.elements.set(tmpSvgObject.id, tmpSvgObject);

			tmpText.setAttribute("id", tmpSvgObject.id);
			atlasixDiagram.viewport.append(tmpText);
		}
	}
}

export function createEdgesAndSetEdgesDataSVG(
	onSelectedCallback: (
		e: AtlasixSvgObject,
		atlasixDiagram: AtlasixDiagram,
	) => void,
	onMouseOverCallback: (atlasixDiagram: AtlasixDiagram) => void,
	onMouseOutCallback: (atlasixDiagram: AtlasixDiagram) => void,
	atlasixDiagram: AtlasixDiagram,
) {
	for (const [id, edge] of atlasixDiagram.input.edges.entries()) {
		const sourceNode = atlasixDiagram.input.nodes.find(
			(node) => node.id === edge.source,
		);
		const targetNode = atlasixDiagram.input.nodes.find(
			(node) => node.id === edge.target,
		);

		if (!sourceNode) {
			throw new Error("Source node not found. Please check source ID.");
		}

		if (!targetNode) {
			throw new Error("Target node not found. Please check source ID.");
		}

		const sourceCenterX = sourceNode.x + sourceNode.width / 2;
		const sourceCenterY = sourceNode.y + sourceNode.height / 2;
		const targetCenterX = targetNode.x + targetNode.width / 2;
		const targetCenterY = targetNode.y + targetNode.height / 2;

		const tmpEdge = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"line",
		);
		tmpEdge.setAttribute("x1", sourceCenterX.toString());
		tmpEdge.setAttribute("y1", sourceCenterY.toString());
		tmpEdge.setAttribute("x2", targetCenterX.toString());
		tmpEdge.setAttribute("y2", targetCenterY.toString());
		tmpEdge.setAttribute("stroke", edge.color);
		tmpEdge.setAttribute("stroke-width", edge.width.toString());
		const isFlow =
			edge.animation === "forward" || edge.animation === "backward";
		// a flow needs gaps to be visible, so a solid edge flows as dashed
		const style = edge.style === "solid" && isFlow ? "dashed" : edge.style;
		let dashPeriod = 0;
		if (style === "dashed") {
			// dash/gap scale with width so the pattern stays readable at any thickness
			tmpEdge.setAttribute(
				"stroke-dasharray",
				`${edge.width * 4} ${edge.width * 3}`,
			);
			dashPeriod = edge.width * 7;
		} else if (style === "dotted") {
			// zero-length dashes + round caps = round dots; +2 keeps thin edges visible
			const dotSize = edge.width + 2;
			tmpEdge.setAttribute("stroke-width", dotSize.toString());
			tmpEdge.setAttribute("stroke-dasharray", `0 ${dotSize * 2}`);
			tmpEdge.setAttribute("stroke-linecap", "round");
			dashPeriod = dotSize * 2;
		}

		if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			if (isFlow) {
				// shifting by exactly one dash period loops seamlessly; line starts at source, so negative offset = toward target
				const shift = edge.animation === "forward" ? -dashPeriod : dashPeriod;
				tmpEdge.animate(
					[{ strokeDashoffset: "0px" }, { strokeDashoffset: `${shift}px` }],
					{
						duration: (dashPeriod / EDGE_FLOW_SPEED) * 1000,
						iterations: Infinity,
					},
				);
			} else if (edge.animation === "blink") {
				tmpEdge.animate([{ opacity: 1 }, { opacity: 0.2 }], {
					duration: 800,
					iterations: Infinity,
					direction: "alternate",
				});
			}
		}

		const tmpRect = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"rect",
		);

		const dx = targetCenterX - sourceCenterX;
		const dy = targetCenterY - sourceCenterY;
		const lineLength = Math.hypot(dx, dy);
		const minimumPadding = lineLength < 20 ? 10 : 0;
		const rectWidth = Math.max(lineLength + minimumPadding * 2, 20);
		const rectHeight = edge.width + 16;
		const midX = (sourceCenterX + targetCenterX) / 2;
		const midY = (sourceCenterY + targetCenterY) / 2;
		const rotation = (Math.atan2(dy, dx) * 180) / Math.PI;

		tmpRect.setAttribute("x", (midX - rectWidth / 2).toString());
		tmpRect.setAttribute("y", (midY - rectHeight / 2).toString());
		tmpRect.setAttribute("width", rectWidth.toString());
		tmpRect.setAttribute("height", rectHeight.toString());
		tmpRect.setAttribute("fill", "transparent");
		tmpRect.setAttribute("transform", `rotate(${rotation} ${midX} ${midY})`);

		const tmpSvgObject = new AtlasixSvgObject(
			`atlasix-edge-${id.toString()}-rect`,
			edge.data,
			tmpRect,
			edge,
		);

		tmpRect.onmousedown = () => {
			onSelectedCallback(tmpSvgObject, atlasixDiagram);
		};

		tmpRect.onmouseover = () => {
			onMouseOverCallback(atlasixDiagram);
		};

		tmpRect.onmouseout = () => {
			onMouseOutCallback(atlasixDiagram);
		};

		atlasixDiagram.elements.set(tmpSvgObject.id, tmpSvgObject);

		tmpEdge.setAttribute("id", `atlasix-edge-${id.toString()}`);
		tmpRect.setAttribute("id", `atlasix-edge-${id.toString()}-rect`);

		atlasixDiagram.viewport.append(tmpEdge);
		atlasixDiagram.viewport.append(tmpRect);

		if (edge.text) {
			const tmpText = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"text",
			);
			tmpText.setAttribute("x", midX.toString());
			tmpText.setAttribute("y", midY.toString());
			tmpText.setAttribute("fill", edge.textColor);
			tmpText.setAttribute("font-size", edge.textSize.toString());
			// halo in background color keeps the text readable over the line
			tmpText.setAttribute("stroke", atlasixDiagram.input.backgroundColor);
			tmpText.classList.add("atlasix-edge-text");
			tmpText.textContent = edge.text;
			tmpText.setAttribute("id", `atlasix-edge-${id.toString()}-text`);
			atlasixDiagram.viewport.append(tmpText);
		}
	}
}
