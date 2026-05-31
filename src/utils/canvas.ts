import { Canvas, Rect, Triangle, Circle, Textbox, Polyline, FabricObject, FabricImage } from "fabric";
import { AtlasixDiagram } from "../AtlasixDiagram";
import { AtlasixInput } from "../AtlasixInput";
import { AtlasixInputNode } from "../AtlasixInputNode";

export function createCanvas() {
  let canvas = document.createElement("canvas");

  canvas.width = 900;
  canvas.height = 700;
  canvas.style.border = "solid black 1px";

  return canvas;
}

export function createFabricCanvas(canvas: HTMLCanvasElement, inputData: AtlasixInput) {
  const fabricCanvas = new Canvas(canvas, {
    defaultCursor: "grab",
    hoverCursor: "pointer",
    selection: false,
    backgroundColor: inputData.backgroundColor,
  });

  return fabricCanvas;
}

export function createNodesAndSetNodesData(onSelectedCallback: (e: any, atlasixDiagram: AtlasixDiagram) => void, atlasixDiagram: AtlasixDiagram) {
  for (let [id, node] of atlasixDiagram.input.nodes.entries()) {
    const nodeOptions = {
      fill: node.fillColor,
      borderColor: node.borderColor,
      borderScaleFactor: 2,
      height: node.height,
      width: node.width,
      left: node.x,
      top: node.y,
      data: node.data,
      id: id.toString()
    }

    let tmpNode: FabricObject;

    if (node.shape) {
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
    } else if (node.image) {
      console.log("ok");
      
      let tmpImg = new Image();
      tmpImg.id = `image-${id}`;
      tmpImg.src = node.image;
      tmpImg.style = "display: none;"

      tmpImg.onload = () => {
        atlasixDiagram.canvas.requestRenderAll();
      }

      atlasixDiagram.container.append(tmpImg);

      // setting this to null to avoid "blank space" inside node, around image. Scaling forces node to be sized with the full image size
      nodeOptions.height = null;
      nodeOptions.width = null;

      tmpNode = new FabricImage(tmpImg, nodeOptions);

      tmpNode.scaleToHeight(node.height);
      tmpNode.scaleToWidth(node.width);

      atlasixDiagram.canvas.add(tmpNode);
    }

    if (node.text) {
      let tmpTextbox = new Textbox(node.text, {
        left: node.x,
        top: node.y + node.height / 2 + 20, // TODO: we need to use instead the tmpNode.getScaledHeight() to avoid image being too close to text
        width: node.width + 40,
        fill: node.textColor,
        fontSize: node.textSize,
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

function getEdgePointsBetweenRectangles(sourceNode: AtlasixInputNode, targetNode: AtlasixInputNode) {
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

export function createEdgesAndSetEdgesData(onSelectedCallback: (e: any, atlasixDiagram: AtlasixDiagram) => void, atlasixDiagram: AtlasixDiagram) {
  for (let [id, edge] of atlasixDiagram.input.edges.entries()) {
    const sourceNode = atlasixDiagram.input.nodes.find(node => node.id === edge.source);
    const targetNode = atlasixDiagram.input.nodes.find(node => node.id === edge.target);

    const { source, target } = getEdgePointsBetweenRectangles(sourceNode, targetNode);

    const tmpPolyline = new Polyline([
        { x: source.x, y: source.y },
        { x: target.x, y: target.y },
      ], {
        stroke: edge.color,
        strokeWidth: edge.width,
        borderColor: edge.borderColor,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        selectable: true,
        data: edge.data
      })
    
    tmpPolyline.on("selected", (e) => onSelectedCallback(e, atlasixDiagram));

    atlasixDiagram.canvas.add(tmpPolyline);
  }
}