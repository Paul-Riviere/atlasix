import { Canvas, Rect, Triangle, Circle, Textbox } from "fabric";
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
    const nodeOptions = {
      fill: node.fillColor,
      borderColor: node.borderColor,
      borderScaleFactor: 2,
      height: node.height,
      width: node.width,
      left: node.x,
      top: node.y
    }

    let tmpNode;

    switch (node.shape) {
      case "rectangle":
        tmpNode = new Rect(nodeOptions);
        break;
      case "triangle":
        tmpNode = new Triangle(nodeOptions);
        break;
      case "circle":
        tmpNode = new Circle(nodeOptions);
        tmpNode.set("radius", node.width / 2);
        break;
    }

    tmpNode.set("id", id);
    nodesData[id.toString()] = node.data;
    console.log(tmpNode);
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
