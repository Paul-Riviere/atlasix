import {AtlasixDiagram} from "./AtlasixDiagram";
import {TPointerEvent, TPointerEventInfo, TEvent} from "fabric";
import { AtlasixObject } from "./AtlasixObject";

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
  let selectedObject = atlasixDiagram.canvas.getActiveObject() as AtlasixObject
  
  atlasixDiagram.sidebar.innerHTML = "";
  for (const key of Object.keys(selectedObject.data)) {
    atlasixDiagram.sidebar.innerHTML += `<strong>${key}:</strong> ${selectedObject.data[key]}<br>`;
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

export function svgOnMouseDown(e, atlasixDiagram: AtlasixDiagram) {
  atlasixDiagram.isPanning = true;
  atlasixDiagram.lastMouse.x = e.clientX;
  atlasixDiagram.lastMouse.y = e.clientY;

  let baseSvg = document.querySelector('#baseSvg');
  baseSvg.setPointerCapture(e.pointerId);
  baseSvg.style.cursor = "grabbing";
}

export function svgOnMouseUp(e, atlasixDiagram: AtlasixDiagram) {
  atlasixDiagram.isPanning = false;
  let baseSvg = document.querySelector('#baseSvg');
  baseSvg.style.cursor = "grab";
}

export function svgOnMouseMove(e, atlasixDiagram: AtlasixDiagram) {
  if (!atlasixDiagram.isPanning) return;

  atlasixDiagram.tx += e.clientX - atlasixDiagram.lastMouse.x;
  atlasixDiagram.ty += e.clientY - atlasixDiagram.lastMouse.y;

  atlasixDiagram.lastMouse.x = e.clientX;
  atlasixDiagram.lastMouse.y = e.clientY;

  let viewport = document.querySelector('#viewport');

  viewport.setAttribute(
    "transform",
    `translate(${atlasixDiagram.tx} ${atlasixDiagram.ty}) scale(${atlasixDiagram.scale})`
  );
}

export function svgOnMouseWheel(e, atlasixDiagram: AtlasixDiagram) {
  e.preventDefault();

  let baseSvg = document.querySelector('#baseSvg');

  const factor = e.deltaY < 0 ? 1.1 : 0.9;

  const rect = baseSvg.getBoundingClientRect();

  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  // coordonnées monde sous la souris avant zoom
  const wx = (mx - atlasixDiagram.tx) / atlasixDiagram.scale;
  const wy = (my - atlasixDiagram.ty) / atlasixDiagram.scale;

  atlasixDiagram.scale *= factor;

  // repositionnement pour conserver le point sous la souris
  atlasixDiagram.tx = mx - wx * atlasixDiagram.scale;
  atlasixDiagram.ty = my - wy * atlasixDiagram.scale;

  let viewport = document.querySelector('#viewport');

  viewport.setAttribute(
    "transform",
    `translate(${atlasixDiagram.tx} ${atlasixDiagram.ty}) scale(${atlasixDiagram.scale})`
  );
}

