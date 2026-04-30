import { Canvas, Rect, Triangle, Circle, Textbox, Polyline, FabricObject } from "fabric";
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
  for (let [id, node] of inputData.nodes.entries()) {
    const nodeOptions = {
      fill: node.fillColor,
      borderColor: node.borderColor,
      borderScaleFactor: 2,
      height: node.height,
      width: node.width,
      left: node.x,
      top: node.y,
      data: node.data ? node.data : {},
      id: node.id ? node.id : id.toString()
    }

    let tmpNode: FabricObject;

    switch (node.shape) {
      case "rectangle":
        tmpNode = new Rect(nodeOptions);
        atlasixDiagram.canvas.add(tmpNode);
        break;
      case "triangle":
        tmpNode = new Triangle(nodeOptions);
        atlasixDiagram.canvas.add(tmpNode);
        break;
      case "circle":
        tmpNode = new Circle(nodeOptions);
        tmpNode.set("radius", node.width / 2);
        atlasixDiagram.canvas.add(tmpNode);
        break;
    }
    
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
}

function getEdgePointsBetweenRectangles(sourceNode, targetNode) {
  const sourceCenterX = sourceNode.x;
  const sourceCenterY = sourceNode.y;
  const targetCenterX = targetNode.x;
  const targetCenterY = targetNode.y;

  const deltaX = targetCenterX - sourceCenterX;
  const deltaY = targetCenterY - sourceCenterY;

  if (deltaX === 0 && deltaY === 0) {
    return {
      source: { x: sourceCenterX, y: sourceCenterY },
      target: { x: targetCenterX, y: targetCenterY }
    };
  }

  const halfWidthSource = sourceNode.width / 2;
  const halfHeightSource = sourceNode.height / 2;
  const scaleXSource = deltaX !== 0 ? halfWidthSource / Math.abs(deltaX) : Infinity;
  const scaleYSource = deltaY !== 0 ? halfHeightSource / Math.abs(deltaY) : Infinity;
  const scaleSource = Math.min(scaleXSource, scaleYSource);
  const sourceX = sourceCenterX + deltaX * scaleSource;
  const sourceY = sourceCenterY + deltaY * scaleSource;

  const halfWidthTarget = targetNode.width / 2;
  const halfHeightTarget = targetNode.height / 2;
  const scaleXTarget = deltaX !== 0 ? halfWidthTarget / Math.abs(deltaX) : Infinity;
  const scaleYTarget = deltaY !== 0 ? halfHeightTarget / Math.abs(deltaY) : Infinity;
  const scaleTarget = Math.min(scaleXTarget, scaleYTarget);
  const targetX = targetCenterX - deltaX * scaleTarget;
  const targetY = targetCenterY - deltaY * scaleTarget;

  return {
    source: { x: sourceX, y: sourceY },
    target: { x: targetX, y: targetY }
  };
}

export function createEdgesAndSetEdgesData(inputData: any[], onSelectedCallback: (e: any, atlasixDiagram: AtlasixDiagram) => void, atlasixDiagram: AtlasixDiagram) {
  for (let [id, edge] of inputData.edges.entries()) {
    const sourceNode = inputData.nodes.find(node => node.id === edge.source);
    const targetNode = inputData.nodes.find(node => node.id === edge.target);

    const { source, target } = getEdgePointsBetweenRectangles(sourceNode, targetNode);

    const tmpPolyline = new Polyline([
        { x: source.x, y: source.y },
        { x: target.x, y: target.y },
      ], {
        stroke: edge.color ? edge.color : "black",
        strokeWidth: edge.width ? edge.width : 2,
        borderColor: edge.borderColor ? edge.borderColor : "black",
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        selectable: true,
        id: edge.id ? edge.id : id.toString(),
        data: edge.data? edge.data : {}
      })
    
    tmpPolyline.on("selected", (e) => onSelectedCallback(e, atlasixDiagram));

    atlasixDiagram.canvas.add(tmpPolyline);
  }
}