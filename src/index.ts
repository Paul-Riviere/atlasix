import { createNodesAndSetNodesDataSVG, createEdgesAndSetEdgesDataSVG, createViewer } from "./utils/svg"
import { createSidebar } from "./utils/sidebar";
import { AtlasixDiagram } from "./AtlasixDiagram";
import {
  svgOnMouseDown,
  svgOnMouseMove,
  svgOnMouseUp,
  svgOnMouseWheel,
  svgElementOnMouseDown,
  svgElementOnMouseOver,
  svgElementOnMouseOut
} from "./events";
import { AtlasixInput } from "./AtlasixInput";
import "./styles/atlasix.css";

export function initializeSVG(atlasixContainerId: string, inputData: AtlasixInput) {
  let atlasixContainer = document.getElementById(atlasixContainerId);

  if (!atlasixContainer) {
    throw new Error(`Container with id ${atlasixContainerId} not found.`);
  }

  atlasixContainer.style.position = "relative";
  atlasixContainer.style.height = inputData.height ? `${inputData.height}px` : "-webkit-fill-available";
  atlasixContainer.style.width = inputData.width ? `${inputData.width}px` : "-webkit-fill-available";

  let {atlasixViewer, baseSvg, viewport} = createViewer(inputData);
  let atlasixContainerSidebar = createSidebar();

  atlasixContainer.append(atlasixContainerSidebar);
  atlasixContainer.append(atlasixViewer);

  let atlasixDiagram = new AtlasixDiagram(atlasixContainer, atlasixContainerSidebar, baseSvg, viewport, AtlasixInput.fromJson(inputData));

  // Order matters because we want edges to be below nodes
  createEdgesAndSetEdgesDataSVG(svgElementOnMouseDown, svgElementOnMouseOver, svgElementOnMouseOut, atlasixDiagram);
  createNodesAndSetNodesDataSVG(svgElementOnMouseDown, svgElementOnMouseOver, svgElementOnMouseOut, atlasixDiagram);

  baseSvg?.addEventListener("pointerdown", (e) => svgOnMouseDown(e, atlasixDiagram));
  baseSvg?.addEventListener("pointerup", (e) => svgOnMouseUp(e, atlasixDiagram));
  baseSvg?.addEventListener("pointercancel", (e) => svgOnMouseUp(e, atlasixDiagram));
  baseSvg?.addEventListener("pointermove", (e) => svgOnMouseMove(e, atlasixDiagram));
  baseSvg?.addEventListener("wheel", (e) => svgOnMouseWheel(e, atlasixDiagram));
}
