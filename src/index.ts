import { createCanvas, createFabricCanvas, createNodesAndSetNodesData, createEdgesAndSetEdgesData } from "./utils/canvas";
import { createNodesAndSetNodesDataSVG, createEdgesAndSetEdgesDataSVG, createViewer } from "./utils/svg"
import { createSidebar } from "./utils/sidebar";
import { AtlasixDiagram } from "./AtlasixDiagram";
import { canvasOnMouseDown, canvasOnMouseUp, canvasOnMouseMove, objectOnSelected, canvasOnMouseWheel, canvasOnSelectionCleared } from "./events";
import { AtlasixInput } from "./AtlasixInput";

export function initialize(atlasixContainerId: string, inputData: any) {
  let atlasixContainer = document.getElementById(atlasixContainerId);
  atlasixContainer.style.position = "relative";
  
  let atlasixContainerCanvas = createCanvas();
  let atlasixContainerSidebar = createSidebar();

  atlasixContainer.append(atlasixContainerCanvas);
  atlasixContainer.append(atlasixContainerSidebar);

  const canvas = createFabricCanvas(atlasixContainerCanvas, inputData);

  let atlasixDiagram = new AtlasixDiagram(canvas, atlasixContainer, atlasixContainerSidebar, AtlasixInput.fromJson(inputData));

  console.log(atlasixDiagram);
  createNodesAndSetNodesData(objectOnSelected, atlasixDiagram);
  createEdgesAndSetEdgesData(objectOnSelected, atlasixDiagram);

  canvas.on("mouse:down", (e) => canvasOnMouseDown(e, atlasixDiagram));
  canvas.on("mouse:up", (e) => canvasOnMouseUp(atlasixDiagram));
  canvas.on("mouse:move", (e) => canvasOnMouseMove(e, atlasixDiagram));
  canvas.on("mouse:wheel", (e) => canvasOnMouseWheel(e, atlasixDiagram));

  canvas.on("selection:cleared", (e) => canvasOnSelectionCleared(e, atlasixDiagram));
}

export function initializeSVG(atlasixContainerId: string, inputData: any) {
  let atlasixContainer = document.getElementById(atlasixContainerId);

  atlasixContainer.style.position = "relative";

  let atlasixViewer = createViewer();
  let atlasixContainerSidebar = createSidebar();

  atlasixContainer.append(atlasixContainerSidebar);
  atlasixContainer.append(atlasixViewer);

  let atlasixDiagram = new AtlasixDiagram(null, atlasixContainer, atlasixContainerSidebar, AtlasixInput.fromJson(inputData));

  console.log(atlasixDiagram);

  // Order matters because we want edges to be below nodes
  createEdgesAndSetEdgesDataSVG(objectOnSelected, atlasixDiagram);
  createNodesAndSetNodesDataSVG(objectOnSelected, atlasixDiagram);

    
}
