import { Canvas, Rect, TPointerEvent, TPointerEventInfo, TEvent } from 'fabric';

let lastMouse = { x: 0, y: 0 };

let isPanning = false;

export function initialize(atlasixContainerId: string, inputData: any) {
  let atlasixContainer = document.getElementById(atlasixContainerId);
  
  let atlasixContainerCanvas = document.createElement("canvas");

  atlasixContainerCanvas.width = 900;
  atlasixContainerCanvas.height = 700;
  atlasixContainerCanvas.style.border = "solid black 1px";
  
  atlasixContainer?.append(atlasixContainerCanvas);

  const canvas = new Canvas(atlasixContainerCanvas, {
      defaultCursor: "grab",
      hoverCursor: "pointer",
      selection: false
  });

  let tmpNodeData: any[] = [];

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
    tmpNodeData[id.toString()] = node.data;
    canvas.add(tmpNode);
  }

  canvas.set("nodesData", tmpNodeData);

  const allObjects = canvas.getObjects();

  allObjects.forEach((object) => {
    object.on("selected", (e) => objectOnSelected(e, canvas));
    object.hasControls = false;
    object.lockMovementX = true;
    object.lockMovementY = true;
  });

  canvas.on("mouse:down", canvasOnMouseDown);
  canvas.on("mouse:up", canvasOnMouseUp);
  canvas.on("mouse:move", (e) => canvasOnMouseMove(e, canvas));
  canvas.on("mouse:wheel", (e) => canvasOnMouseWheel(e, canvas));

  canvas.on("selection:cleared", canvasOnSelectionCleared);
}

function canvasOnMouseDown(e) {
  isPanning = true;
  lastMouse.x = e.e.clientX;
  lastMouse.y = e.e.clientY;
}

function canvasOnMouseUp() {
  isPanning = false;
}

function canvasOnMouseMove(e: TPointerEventInfo<TPointerEvent>, canvas: Canvas) {
  if (isPanning) {
    let tmpViewPortTransform = canvas.viewportTransform;
    tmpViewPortTransform[4] += e.e.clientX - lastMouse.x;
    tmpViewPortTransform[5] += e.e.clientY - lastMouse.y;
    
    canvas.setViewportTransform(tmpViewPortTransform);

    lastMouse.x = e.e.clientX;
    lastMouse.y = e.e.clientY;
  }
}

function objectOnSelected(e: Partial<TEvent<TPointerEvent>>, canvas: Canvas) {
  let selectedNode = canvas.get("nodesData")[canvas.getActiveObject().id]
  console.log(selectedNode);
}

function canvasOnMouseWheel(e: TPointerEventInfo<TPointerEvent>, canvas: Canvas) {
  canvas.setZoom(canvas.getZoom() * 0.999 ** e.e.deltaY);
  e.e.preventDefault();
  e.e.stopPropagation();
}

function canvasOnSelectionCleared(e) {
}
