import {AtlasixDiagram} from "./AtlasixDiagram";
import { AtlasixSvgObject } from "./AtlasixSvgObject";

export function svgOnMouseDown(e, atlasixDiagram: AtlasixDiagram) {
  atlasixDiagram.isPanning = true;
  atlasixDiagram.lastMouse.x = e.clientX;
  atlasixDiagram.lastMouse.y = e.clientY;

  atlasixDiagram.baseSvg.setPointerCapture(e.pointerId);
  atlasixDiagram.baseSvg.style.cursor = "grabbing";

  unselectElement(atlasixDiagram);
}

export function svgOnMouseUp(e, atlasixDiagram: AtlasixDiagram) {
  atlasixDiagram.isPanning = false;
  atlasixDiagram.baseSvg.style.cursor = "grab";
}

export function svgOnMouseMove(e, atlasixDiagram: AtlasixDiagram) {
  if (!atlasixDiagram.isPanning) return;

  atlasixDiagram.tx += e.clientX - atlasixDiagram.lastMouse.x;
  atlasixDiagram.ty += e.clientY - atlasixDiagram.lastMouse.y;

  atlasixDiagram.lastMouse.x = e.clientX;
  atlasixDiagram.lastMouse.y = e.clientY;

  atlasixDiagram.viewport.setAttribute(
    "transform",
    `translate(${atlasixDiagram.tx} ${atlasixDiagram.ty}) scale(${atlasixDiagram.scale})`
  );
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

  const rect = atlasixDiagram.baseSvg.getBoundingClientRect();

  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  // world coordinates under the mouse before the zoom
  const wx = (mx - atlasixDiagram.tx) / atlasixDiagram.scale;
  const wy = (my - atlasixDiagram.ty) / atlasixDiagram.scale;

  atlasixDiagram.scale *= factor;

  // repositioning to keep the point under the mouse
  atlasixDiagram.tx = mx - wx * atlasixDiagram.scale;
  atlasixDiagram.ty = my - wy * atlasixDiagram.scale;

  atlasixDiagram.viewport.setAttribute(
    "transform",
    `translate(${atlasixDiagram.tx} ${atlasixDiagram.ty}) scale(${atlasixDiagram.scale})`
  );
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
