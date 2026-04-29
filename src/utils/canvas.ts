import { Canvas, Rect, Textbox } from "fabric";
import { AtlasixDiagram } from "../AtlasixDiagram";

export function createCanvas() {
  let canvas = document.createElement("canvas");

  canvas.width = 900;
  canvas.height = 700;
  canvas.style.border = "solid black 1px";

  return canvas;
}

export function createFabricCanvas(canvas: HTMLCanvasElement, inputData: any) {
  const fabricCanvas = new Canvas(canvas, {
    defaultCursor: "grab",
    hoverCursor: "pointer",
    selection: false,
    backgroundColor: inputData.backgroundColor ? inputData.backgroundColor : "white",
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

    if (node.text) {
      let tmpTextbox = new Textbox(node.text, {
        left: node.x,
        top: node.y + node.height / 2 + 20,
        width: node.width + 40,
        fill: node.textColor ? node.textColor : "black",
        fontSize: node.textSize ? node.textSize : 25,
        textAlign: 'center',
        selectable: false,
        hoverCursor: "grab"
      });
      atlasixDiagram.canvas.add(tmpTextbox);
    }
  }
  
  atlasixDiagram.canvas.getObjects().forEach((object) => {
    object.on("selected", (e) => onSelectedCallback(e, atlasixDiagram));
    object.hasControls = false;
    object.lockMovementX = true;
    object.lockMovementY = true;
  });

  atlasixDiagram.nodesData = nodesData;
}
