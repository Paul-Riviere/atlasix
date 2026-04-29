import {AtlasixDiagram} from "./AtlasixDiagram";
import {TPointerEvent, TPointerEventInfo, TEvent} from "fabric";

export function canvasOnMouseDown(e, atlasixDiagram: AtlasixDiagram) {
  atlasixDiagram.isPanning = true;
  atlasixDiagram.lastMouse.x = e.e.clientX;
  atlasixDiagram.lastMouse.y = e.e.clientY;
}

export function canvasOnMouseUp(atlasixDiagram: AtlasixDiagram) {
  atlasixDiagram.isPanning = false;
}

export function canvasOnMouseMove(e: TPointerEventInfo<TPointerEvent>, atlasixDiagram: AtlasixDiagram) {
  if (atlasixDiagram.isPanning) {
    atlasixDiagram.canvas.setCursor("grabbing");
    
    let tmpViewPortTransform = atlasixDiagram.canvas.viewportTransform;
    tmpViewPortTransform[4] += e.e.clientX - atlasixDiagram.lastMouse.x;
    tmpViewPortTransform[5] += e.e.clientY - atlasixDiagram.lastMouse.y;
    
    atlasixDiagram.canvas.setViewportTransform(tmpViewPortTransform);

    atlasixDiagram.lastMouse.x = e.e.clientX;
    atlasixDiagram.lastMouse.y = e.e.clientY;
  }
}

export function objectOnSelected(e: Partial<TEvent<TPointerEvent>>, atlasixDiagram: AtlasixDiagram) {
  let selectedNode = atlasixDiagram.nodesData[atlasixDiagram.canvas.getActiveObject().id]
  
  atlasixDiagram.sidebar.innerHTML = "";
  for (const key of Object.keys(selectedNode)) {
    atlasixDiagram.sidebar.innerHTML += `<strong>${key}:</strong> ${selectedNode[key]}<br>`;
  }

  atlasixDiagram.sidebar.style.visibility = "visible";
}

export function canvasOnMouseWheel(e: TPointerEventInfo<TPointerEvent>, atlasixDiagram: AtlasixDiagram) {
  atlasixDiagram.canvas.setZoom(atlasixDiagram.canvas.getZoom() * 0.999 ** e.e.deltaY);
  e.e.preventDefault();
  e.e.stopPropagation();
}

export function canvasOnSelectionCleared(e, atlasixDiagram: AtlasixDiagram) {
  atlasixDiagram.sidebar.style.visibility = "hidden";
}
