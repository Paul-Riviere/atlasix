import { AtlasixDiagram } from "../AtlasixDiagram";
import { AtlasixInput } from "../AtlasixInput";
import { AtlasixSvgObject } from "../AtlasixSvgObject";

export function createViewer(inputData: AtlasixInput) {
  let atlasixViewer = document.createElement("div")
  atlasixViewer.classList.add("atlasix-viewer");

  let baseSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  baseSvg.classList.add("atlasix-base-svg");
  baseSvg.style.backgroundColor = inputData.backgroundColor;
  baseSvg.setAttribute("viewBox", "0 0 900 700");
  baseSvg.id = "baseSvg";

  let viewport = document.createElementNS("http://www.w3.org/2000/svg", "g");
  viewport.id = "viewport";

  baseSvg.appendChild(viewport);
  atlasixViewer.append(baseSvg);

  return {atlasixViewer, baseSvg, viewport};
}

export function createNodesAndSetNodesDataSVG(
  onSelectedCallback: (e: AtlasixSvgObject, atlasixDiagram: AtlasixDiagram) => void,
  onMouseOverCallback: (e: MouseEvent, atlasixDiagram: AtlasixDiagram) => void,
  onMouseOutCallback: (e: MouseEvent, atlasixDiagram: AtlasixDiagram) => void,
  atlasixDiagram: AtlasixDiagram
) {
  for (let [id, node] of atlasixDiagram.input.nodes.entries()) {
    if (node.shape) {
      let tmpNode;
      switch (node.shape) {
        case "rectangle":
          tmpNode = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
          );
          tmpNode.setAttribute("x", node.x.toString());
          tmpNode.setAttribute("y", node.y.toString());
          tmpNode.setAttribute("width", node.width.toString());
          tmpNode.setAttribute("height", node.height.toString());
          tmpNode.setAttribute("fill", node.fillColor);
          tmpNode.setAttribute("stroke-width", "3");

          break;
        case "triangle":
          tmpNode = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polygon"
          );
          tmpNode.setAttribute("points", `${node.x} ${node.y + node.height}, ${node.x + node.width} ${node.y + node.height}, ${node.x + node.width / 2} ${node.y}`);
          tmpNode.setAttribute("x", node.x.toString());
          tmpNode.setAttribute("y", node.y.toString());
          tmpNode.setAttribute("fill", node.fillColor);
          tmpNode.setAttribute("stroke-width", "3");
    
          break;
        case "circle":
          tmpNode = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          tmpNode.setAttribute("cx", (node.x + node.width / 2).toString());
          tmpNode.setAttribute("cy", (node.y + node.width / 2).toString());
          tmpNode.setAttribute("r", (node.width / 2).toString());
          tmpNode.setAttribute("fill", node.fillColor);
          tmpNode.setAttribute("stroke-width", "3");

          break;
      }

      let tmpSvgObject = new AtlasixSvgObject(node.id ? node.id : `atlasix-node-${node.id.toString()}`, node.data, tmpNode, node);
      atlasixDiagram.elements.set(tmpSvgObject.id, tmpSvgObject);

      tmpNode.onmousedown = (e) => {
        onSelectedCallback(tmpSvgObject, atlasixDiagram);
      }

      tmpNode.onmouseover = (e,) => {
        onMouseOverCallback(e, atlasixDiagram);
      }

      tmpNode.onmouseout = (e) => {
        onMouseOutCallback(e, atlasixDiagram);
      }

      tmpNode.setAttribute("id", tmpSvgObject.id);
      atlasixDiagram.viewport.append(tmpNode);
    } else if (node.image) {
      const tmpImage = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image"
      );
      tmpImage.setAttribute("x", node.x.toString());
      tmpImage.setAttribute("y", node.y.toString());
      tmpImage.setAttribute("href", node.image);
      tmpImage.setAttribute("width", node.width.toString());
      tmpImage.setAttribute("height", node.height.toString());
      tmpImage.setAttribute("stroke", node.borderColor);
      tmpImage.setAttribute("stroke-width", "3");

      tmpImage.onmousedown = (e) => {
        onSelectedCallback(tmpSvgObject, atlasixDiagram);
      }

      tmpImage.onmouseover = (e) => {
        onMouseOverCallback(e, atlasixDiagram);
      }

      tmpImage.onmouseout = (e) => {
        onMouseOutCallback(e, atlasixDiagram);
      }

      let tmpSvgObject = new AtlasixSvgObject(node.id ? node.id : `atlasix-node-${node.id.toString()}`, node.data, tmpImage, node);
      atlasixDiagram.elements.set(tmpSvgObject.id, tmpSvgObject);
      
      tmpImage.setAttribute("id", tmpSvgObject.id);
      atlasixDiagram.viewport.append(tmpImage);
    }

    if (node.text) {
      const tmpText = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      tmpText.setAttribute("x", (node.x + node.width/2).toString());
      tmpText.setAttribute("y", (node.y + node.height + node.textSize).toString());
      tmpText.setAttribute("width", node.width.toString());
      tmpText.setAttribute("height", node.height.toString());
      tmpText.setAttribute("fill", node.textColor);
      tmpText.setAttribute("font-size", node.textSize.toString());
      tmpText.classList.add("atlasix-node-text");
      tmpText.textContent = node.text
      
      let tmpSvgObject = new AtlasixSvgObject(node.id ? node.id : `atlasix-node-${node.id.toString()}-text`, node.data, tmpText, node);
      atlasixDiagram.elements.set(tmpSvgObject.id, tmpSvgObject);
      
      tmpText.setAttribute("id", tmpSvgObject.id);
      atlasixDiagram.viewport.append(tmpText);
    }
  }
}

export function createEdgesAndSetEdgesDataSVG(
  onSelectedCallback: (e: any, atlasixDiagram: AtlasixDiagram) => void,
  onMouseOverCallback: (e: any, atlasixDiagram: AtlasixDiagram) => void,
  onMouseOutCallback: (e: any, atlasixDiagram: AtlasixDiagram) => void,
  atlasixDiagram: AtlasixDiagram
) {
  for (let [id, edge] of atlasixDiagram.input.edges.entries()) {
    const sourceNode = atlasixDiagram.input.nodes.find(node => node.id === edge.source);
    const targetNode = atlasixDiagram.input.nodes.find(node => node.id === edge.target);

    const sourceCenterX = sourceNode.x + sourceNode.width / 2;
    const sourceCenterY = sourceNode.y + sourceNode.height / 2;
    const targetCenterX = targetNode.x + targetNode.width / 2;
    const targetCenterY = targetNode.y + targetNode.height / 2;

    const tmpEdge = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    tmpEdge.setAttribute("x1", sourceCenterX.toString());
    tmpEdge.setAttribute("y1", sourceCenterY.toString());
    tmpEdge.setAttribute("x2", targetCenterX.toString());
    tmpEdge.setAttribute("y2", targetCenterY.toString());
    tmpEdge.setAttribute("stroke", edge.color);

    let tmpRect = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );

    const dx = targetCenterX - sourceCenterX;
    const dy = targetCenterY - sourceCenterY;
    const lineLength = Math.hypot(dx, dy);
    const minimumPadding = lineLength < 20 ? 10 : 0;
    const rectWidth = Math.max(lineLength + minimumPadding * 2, 20);
    const rectHeight = 16;
    const midX = (sourceCenterX + targetCenterX) / 2;
    const midY = (sourceCenterY + targetCenterY) / 2;
    const rotation = Math.atan2(dy, dx) * 180 / Math.PI;

    tmpRect.setAttribute("x", (midX - rectWidth / 2).toString());
    tmpRect.setAttribute("y", (midY - rectHeight / 2).toString());
    tmpRect.setAttribute("width", rectWidth.toString());
    tmpRect.setAttribute("height", rectHeight.toString());
    tmpRect.setAttribute("fill", "transparent");
    tmpRect.setAttribute("transform", `rotate(${rotation} ${midX} ${midY})`);

    tmpRect.onmousedown = (e) => {
      onSelectedCallback(tmpSvgObject, atlasixDiagram);
    }

    tmpRect.onmouseover = (e) => {
      onMouseOverCallback(e, atlasixDiagram);
    }

    tmpRect.onmouseout = (e) => {
      onMouseOutCallback(e, atlasixDiagram);
    }

    let tmpSvgObject = new AtlasixSvgObject(`atlasix-edge-${id.toString()}-rect`, edge.data, tmpRect, edge);
    atlasixDiagram.elements.set(tmpSvgObject.id, tmpSvgObject);

    tmpEdge.setAttribute("id", `atlasix-edge-${id.toString()}`);
    tmpRect.setAttribute("id", `atlasix-edge-${id.toString()}-rect`);

    atlasixDiagram.viewport.append(tmpEdge);
    atlasixDiagram.viewport.append(tmpRect);
  }
}
