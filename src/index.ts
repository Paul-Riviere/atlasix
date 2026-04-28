import { Canvas, Rect, TPointerEvent, TPointerEventInfo, TEvent } from 'fabric';

let lastMouse = { x: 0, y: 0 };

let isPanning = false;

export function initialize(atlasixContainerId: string, inputData: any) {
  let atlasixContainer = document.getElementById(atlasixContainerId);
  atlasixContainer.style.position = "relative";
  
  let atlasixContainerCanvas = document.createElement("canvas");

  atlasixContainerCanvas.width = 900;
  atlasixContainerCanvas.height = 700;
  atlasixContainerCanvas.style.border = "solid black 1px";

  let atlasixContainerSidebar = document.createElement("div");
  atlasixContainerSidebar.style.position = "absolute";
  atlasixContainerSidebar.style.top = "1px";
  atlasixContainerSidebar.style.left = "1px";
  atlasixContainerSidebar.style.width = "200px";
  atlasixContainerSidebar.style.height = "stretch";
  atlasixContainerSidebar.style.backgroundColor = "white";
  atlasixContainerSidebar.style.borderRight = "solid lightgrey 1px";
  atlasixContainerSidebar.style.visibility = "hidden";
  atlasixContainerSidebar.style.padding = "10px";
  atlasixContainerSidebar.style.backgroundColor = "aliceblue";

  atlasixContainer?.append(atlasixContainerCanvas);
  atlasixContainer?.append(atlasixContainerSidebar);

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
    object.on("selected", (e) => objectOnSelected(e, canvas, atlasixContainerSidebar));
    object.hasControls = false;
    object.lockMovementX = true;
    object.lockMovementY = true;
  });

  canvas.on("mouse:down", canvasOnMouseDown);
  canvas.on("mouse:up", canvasOnMouseUp);
  canvas.on("mouse:move", (e) => canvasOnMouseMove(e, canvas));
  canvas.on("mouse:wheel", (e) => canvasOnMouseWheel(e, canvas));

  canvas.on("selection:cleared", (e) => canvasOnSelectionCleared(e, atlasixContainerSidebar));
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

function objectOnSelected(e: Partial<TEvent<TPointerEvent>>, canvas: Canvas, sidebar: HTMLDivElement) {
  let selectedNode = canvas.get("nodesData")[canvas.getActiveObject().id]
  
  sidebar.innerHTML = "";
  for (const key of Object.keys(selectedNode)) {
    sidebar.innerHTML += `<strong>${key}:</strong> ${selectedNode[key]}<br>`;
  }
  sidebar.style.visibility = "visible";
}

function canvasOnMouseWheel(e: TPointerEventInfo<TPointerEvent>, canvas: Canvas) {
  canvas.setZoom(canvas.getZoom() * 0.999 ** e.e.deltaY);
  e.e.preventDefault();
  e.e.stopPropagation();
}

function canvasOnSelectionCleared(e, sidebar: HTMLDivElement) {
  sidebar.style.visibility = "hidden";
}
