import {AtlasixDiagram} from "./AtlasixDiagram";
import { AtlasixSvgObject } from "./AtlasixSvgObject";

export function svgOnMouseDown(e, atlasixDiagram: AtlasixDiagram) {
  atlasixDiagram.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  atlasixDiagram.baseSvg.setPointerCapture(e.pointerId);

  if (atlasixDiagram.pointers.size === 2) {
    const [firstPointer, secondPointer] = Array.from(atlasixDiagram.pointers.values());
    atlasixDiagram.pinchDistance = distanceBetween(firstPointer, secondPointer);
    atlasixDiagram.isPanning = false;
    atlasixDiagram.baseSvg.style.cursor = "grabbing";
    return;
  }

  atlasixDiagram.isPanning = true;
  atlasixDiagram.lastMouse.x = e.clientX;
  atlasixDiagram.lastMouse.y = e.clientY;

  atlasixDiagram.baseSvg.style.cursor = "grabbing";

  unselectElement(atlasixDiagram);
}

export function svgOnMouseUp(e, atlasixDiagram: AtlasixDiagram) {
  atlasixDiagram.pointers.delete(e.pointerId);

  if (atlasixDiagram.pointers.size === 1) {
    const remainingPointer = Array.from(atlasixDiagram.pointers.values())[0];
    atlasixDiagram.lastMouse.x = remainingPointer.x;
    atlasixDiagram.lastMouse.y = remainingPointer.y;
    atlasixDiagram.isPanning = true;
    return;
  }

  atlasixDiagram.isPanning = false;
  atlasixDiagram.pinchDistance = 0;
  atlasixDiagram.baseSvg.style.cursor = "grab";
}

export function svgOnMouseMove(e, atlasixDiagram: AtlasixDiagram) {
  const currentPointer = atlasixDiagram.pointers.get(e.pointerId);
  if (!currentPointer) return;

  if (atlasixDiagram.pointers.size === 2) {
    const otherPointer = Array.from(atlasixDiagram.pointers.entries())
      .find(([pointerId]) => pointerId !== e.pointerId)?.[1];
    if (!otherPointer) return;

    const currentDistance = distanceBetween(
      { x: e.clientX, y: e.clientY },
      otherPointer
    );
    const factor = currentDistance / atlasixDiagram.pinchDistance;
    const centerX = (e.clientX + otherPointer.x) / 2;
    const centerY = (e.clientY + otherPointer.y) / 2;

    atlasixDiagram.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    zoomAtPoint(centerX, centerY, factor, atlasixDiagram);
    atlasixDiagram.pinchDistance = currentDistance;
    return;
  }

  if (!atlasixDiagram.isPanning) return;

  atlasixDiagram.tx += e.clientX - atlasixDiagram.lastMouse.x;
  atlasixDiagram.ty += e.clientY - atlasixDiagram.lastMouse.y;

  atlasixDiagram.lastMouse.x = e.clientX;
  atlasixDiagram.lastMouse.y = e.clientY;
  atlasixDiagram.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

  updateViewportTransform(atlasixDiagram);
}

export function svgElementOnMouseOver(e, atlasixDiagram: AtlasixDiagram) {
  atlasixDiagram.baseSvg.style.cursor = "pointer";
}

export function svgElementOnMouseOut(e, atlasixDiagram: AtlasixDiagram) {
  if (!atlasixDiagram.isPanning) {
    atlasixDiagram.baseSvg.style.cursor = "grab";
  }
}

export function svgOnMouseWheel(e, atlasixDiagram: AtlasixDiagram) {
  e.preventDefault();

  const factor = e.deltaY < 0 ? 1.1 : 0.9;
  zoomAtPoint(e.clientX, e.clientY, factor, atlasixDiagram);
}

function zoomAtPoint(clientX: number, clientY: number, factor: number, atlasixDiagram: AtlasixDiagram) {
  const rect = atlasixDiagram.baseSvg.getBoundingClientRect();

  const mx = clientX - rect.left;
  const my = clientY - rect.top;

  // world coordinates under the mouse before the zoom
  const wx = (mx - atlasixDiagram.tx) / atlasixDiagram.scale;
  const wy = (my - atlasixDiagram.ty) / atlasixDiagram.scale;

  atlasixDiagram.scale *= factor;

  // repositioning to keep the point under the mouse
  atlasixDiagram.tx = mx - wx * atlasixDiagram.scale;
  atlasixDiagram.ty = my - wy * atlasixDiagram.scale;

  updateViewportTransform(atlasixDiagram);
}

function updateViewportTransform(atlasixDiagram: AtlasixDiagram) {
  atlasixDiagram.viewport.setAttribute(
    "transform",
    `translate(${atlasixDiagram.tx} ${atlasixDiagram.ty}) scale(${atlasixDiagram.scale})`
  );
}

function distanceBetween(firstPoint: { x: number; y: number }, secondPoint: { x: number; y: number }) {
  return Math.hypot(secondPoint.x - firstPoint.x, secondPoint.y - firstPoint.y);
}

export function svgElementOnMouseDown(element: AtlasixSvgObject, atlasixDiagram: AtlasixDiagram) {
  unselectElement(atlasixDiagram);
  
  atlasixDiagram.selectedElement = element;

  selectElement(atlasixDiagram);
  
  if (element.svgElement.nodeName === "image") {
    element.svgElement.style.outline = `3px solid ${element.input.borderColor}`;
  } else {
    document.getElementById(atlasixDiagram.selectedElement.id)?.setAttribute("stroke", element.input.borderColor);
  }
}

function unselectElement(atlasixDiagram: AtlasixDiagram){
  // Deselect the previously selected element
  if (atlasixDiagram.selectedElement != undefined) {
    if (atlasixDiagram.selectedElement.svgElement.nodeName === "image") {
      atlasixDiagram.selectedElement.svgElement.style.outline = "none";
    }
    document.getElementById(atlasixDiagram.selectedElement.id)?.setAttribute("stroke", "none");

    atlasixDiagram.sidebar.style.visibility = "hidden";
  }
}

function selectElement(atlasixDiagram: AtlasixDiagram){
  atlasixDiagram.sidebar.innerHTML = "";
  for (const key of Object.keys(atlasixDiagram.selectedElement?.data)) {
    atlasixDiagram.sidebar.innerHTML += `<strong>${key}:</strong> ${atlasixDiagram.selectedElement?.data[key]}<br>`;
  }

  atlasixDiagram.sidebar.style.visibility = "visible";
}
