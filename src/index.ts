import { createCanvas, createFabricCanvas, createNodesAndSetNodesData, createEdgesAndSetEdgesData } from "./utils/canvas";
import { createSidebar } from "./utils/sidebar";
import { AtlasixDiagram } from "./AtlasixDiagram";
import { canvasOnMouseDown, canvasOnMouseUp, canvasOnMouseMove, objectOnSelected, canvasOnMouseWheel, canvasOnSelectionCleared } from "./events";

export function initialize(atlasixContainerId: string, inputData: any) {
  let atlasixContainer = document.getElementById(atlasixContainerId);
  atlasixContainer.style.position = "relative";
  
  let atlasixContainerCanvas = createCanvas();
  let atlasixContainerSidebar = createSidebar();

  atlasixContainer.append(atlasixContainerCanvas);
  atlasixContainer.append(atlasixContainerSidebar);

  const canvas = createFabricCanvas(atlasixContainerCanvas, inputData);

  let atlasixDiagram = new AtlasixDiagram(canvas, atlasixContainer, atlasixContainerSidebar);

  createNodesAndSetNodesData(inputData, objectOnSelected, atlasixDiagram);
  createEdgesAndSetEdgesData(inputData, objectOnSelected, atlasixDiagram);

  canvas.on("mouse:down", (e) => canvasOnMouseDown(e, atlasixDiagram));
  canvas.on("mouse:up", (e) => canvasOnMouseUp(atlasixDiagram));
  canvas.on("mouse:move", (e) => canvasOnMouseMove(e, atlasixDiagram));
  canvas.on("mouse:wheel", (e) => canvasOnMouseWheel(e, atlasixDiagram));

  canvas.on("selection:cleared", (e) => canvasOnSelectionCleared(e, atlasixDiagram));
}
