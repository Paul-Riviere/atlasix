import { Canvas, Rect, TPointerEvent, TPointerEventInfo, TEvent } from 'fabric';
import { createCanvas, createFabricCanvas } from "./utils/canvas";
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

  const canvas = createFabricCanvas(atlasixContainerCanvas);

  let nodesData: any[] = [];

  for (let [id, node] of inputData.nodes.entries()) {
    let tmpNode = new Rect({
      backgroundColor: node.backgroundColor,
      borderColor: node.borderColor,
      borderScaleFactor: 2,
      fill: null,
      height: node.height,
      width: node.width,
      left: node.x,
      top: node.y
    });
    tmpNode.set("id", id);
    nodesData[id.toString()] = node.data;
    canvas.add(tmpNode);
  }

  let atlasixDiagram = new AtlasixDiagram(canvas, nodesData, atlasixContainer, atlasixContainerSidebar);
  
  const allObjects = canvas.getObjects(); 

  allObjects.forEach((object) => {
    object.on("selected", (e) => objectOnSelected(e, atlasixDiagram));
    object.hasControls = false;
    object.lockMovementX = true;
    object.lockMovementY = true;
  });


  canvas.on("mouse:down", (e) => canvasOnMouseDown(e, atlasixDiagram));
  canvas.on("mouse:up", (e) => canvasOnMouseUp(atlasixDiagram));
  canvas.on("mouse:move", (e) => canvasOnMouseMove(e, atlasixDiagram));
  canvas.on("mouse:wheel", (e) => canvasOnMouseWheel(e, atlasixDiagram));

  canvas.on("selection:cleared", (e) => canvasOnSelectionCleared(e, atlasixDiagram));
}
