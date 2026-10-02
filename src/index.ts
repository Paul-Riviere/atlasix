import { AtlasixDiagram } from "./AtlasixDiagram";
import { AtlasixInput } from "./AtlasixInput";
import {
	svgElementOnMouseDown,
	svgElementOnMouseOut,
	svgElementOnMouseOver,
	svgOnMouseDown,
	svgOnMouseMove,
	svgOnMouseUp,
	svgOnMouseWheel,
} from "./events";
import { createSidebar } from "./utils/sidebar";
import {
	createEdgesAndSetEdgesDataSVG,
	createNodesAndSetNodesDataSVG,
	createViewer,
	setViewBox,
} from "./utils/svg";
import "./styles/atlasix.css";

export function initializeSVG(
	atlasixContainerId: string,
	inputData: AtlasixInput,
) {
	const atlasixContainer = document.getElementById(atlasixContainerId);

	if (!atlasixContainer) {
		throw new Error(`Container with id ${atlasixContainerId} not found.`);
	}

	atlasixContainer.style.position = "relative";
	atlasixContainer.style.height = inputData.height
		? `${inputData.height}px`
		: "-webkit-fill-available";
	atlasixContainer.style.width = inputData.width
		? `${inputData.width}px`
		: "-webkit-fill-available";

	const { atlasixViewer, baseSvg, viewport } = createViewer(inputData);
	const atlasixContainerSidebar = createSidebar();

	atlasixContainer.append(atlasixContainerSidebar);
	atlasixContainer.append(atlasixViewer);
	// Needed when initialized after window load (e.g. re-render), load event won't fire again
	setViewBox(baseSvg, inputData);

	const atlasixDiagram = new AtlasixDiagram(
		atlasixContainer,
		atlasixContainerSidebar,
		baseSvg,
		viewport,
		AtlasixInput.fromJson(inputData),
	);

	// Order matters because we want edges to be below nodes
	createEdgesAndSetEdgesDataSVG(
		svgElementOnMouseDown,
		svgElementOnMouseOver,
		svgElementOnMouseOut,
		atlasixDiagram,
	);
	createNodesAndSetNodesDataSVG(
		svgElementOnMouseDown,
		svgElementOnMouseOver,
		svgElementOnMouseOut,
		atlasixDiagram,
	);

	baseSvg?.addEventListener("pointerdown", (e) =>
		svgOnMouseDown(e, atlasixDiagram),
	);
	baseSvg?.addEventListener("pointerup", (e) =>
		svgOnMouseUp(e, atlasixDiagram),
	);
	baseSvg?.addEventListener("pointercancel", (e) =>
		svgOnMouseUp(e, atlasixDiagram),
	);
	baseSvg?.addEventListener("pointermove", (e) =>
		svgOnMouseMove(e, atlasixDiagram),
	);
	baseSvg?.addEventListener("wheel", (e) => svgOnMouseWheel(e, atlasixDiagram));
}
