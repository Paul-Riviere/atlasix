import { Canvas, Rect } from "fabric";
import { AtlasixDiagram } from "../AtlasixDiagram";

export function createCanvas() {
  let canvas = document.createElement("canvas");

  canvas.width = 900;
  canvas.height = 700;
  canvas.style.border = "solid black 1px";

  return canvas;
}

export function createFabricCanvas(canvas: HTMLCanvasElement) {
  const fabricCanvas = new Canvas(canvas, {
    defaultCursor: "grab",
    hoverCursor: "pointer",
    selection: false
  });

  return fabricCanvas;
}

export function createNodesAndSetNodesData(inputData: any[], onSelectedCallback: (e: any, atlasixDiagram: AtlasixDiagram) => void, atlasixDiagram: AtlasixDiagram) {
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
    atlasixDiagram.canvas.add(tmpNode);
  }
  
  atlasixDiagram.canvas.getObjects().forEach((object) => {
    object.on("selected", (e) => onSelectedCallback(e, atlasixDiagram));
    object.hasControls = false;
    object.lockMovementX = true;
    object.lockMovementY = true;
  });

  atlasixDiagram.nodesData = nodesData;
}
