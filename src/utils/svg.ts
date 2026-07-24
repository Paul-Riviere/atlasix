import { AtlasixDiagram } from "../AtlasixDiagram";
import { AtlasixInput } from "../AtlasixInput";
import { AtlasixInputNode } from "../AtlasixInputNode";

export function createViewer() {
  let viewer = document.createElement("div")
  viewer.style.width = "900px";
  viewer.style.height = "700px";
  viewer.style.border = "solid black 1px";

  let baseSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  baseSvg.style.width = "100%";
  baseSvg.style.height = "100%";
  baseSvg.style.display = "block";
  baseSvg.style.cursor = "grab";
  baseSvg.setAttribute("viewBox", "0 0 900 700");
  baseSvg.id = "baseSvg";

  let viewport = document.createElementNS("http://www.w3.org/2000/svg", "g");
  viewport.id = "viewport";

  baseSvg.appendChild(viewport);
  viewer.append(baseSvg);

  return viewer;
}

export function createNodesAndSetNodesDataSVG(onSelectedCallback: (e: any, atlasixDiagram: AtlasixDiagram) => void, atlasixDiagram: AtlasixDiagram) {
  for (let [id, node] of atlasixDiagram.input.nodes.entries()) {
    if (node.shape) {
      switch (node.shape) {
        case "rectangle":
          const tmpRect = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
          );
          tmpRect.setAttribute("x", node.x.toString());
          tmpRect.setAttribute("y", node.y.toString());
          tmpRect.setAttribute("width", node.width.toString());
          tmpRect.setAttribute("height", node.height.toString());
          tmpRect.setAttribute("fill", node.fillColor);
          tmpRect.setAttribute("stroke", node.borderColor);
          tmpRect.setAttribute("stroke-width", "3");

          tmpRect.onclick = (e) => {
            console.log(tmpRect);
          }

          document.querySelector('#viewport')?.append(tmpRect);
          break;
        case "triangle":
          const tmpTriangle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polygon"
          );
          tmpTriangle.setAttribute("points", `${node.x} ${node.y + node.height}, ${node.x + node.width} ${node.y + node.height}, ${node.x + node.width / 2} ${node.y}`);
          tmpTriangle.setAttribute("x", node.x.toString());
          tmpTriangle.setAttribute("y", node.y.toString());
          tmpTriangle.setAttribute("fill", node.fillColor);
          tmpTriangle.setAttribute("stroke", node.borderColor);
          tmpTriangle.setAttribute("stroke-width", "3");

          tmpTriangle.onclick = (e) => {
            console.log(e);
          }

          document.querySelector('#viewport')?.append(tmpTriangle);
          
          break;
        case "circle":
          const tmpCircle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          tmpCircle.setAttribute("cx", (node.x + node.width / 2).toString());
          tmpCircle.setAttribute("cy", (node.y + node.width / 2).toString());
          tmpCircle.setAttribute("r", (node.width / 2).toString());
          tmpCircle.setAttribute("fill", node.fillColor);
          tmpCircle.setAttribute("stroke", node.borderColor);
          tmpCircle.setAttribute("stroke-width", "3");

          tmpCircle.onclick = (e) => {
            console.log(e);
          }

          document.querySelector('#viewport')?.append(tmpCircle);
          
          break;
      }
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

      tmpImage.onclick = (e) => {
        console.log(e);
      }

      document.querySelector('#viewport')?.append(tmpImage);
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
      tmpText.style = "text-anchor: middle"
      tmpText.textContent = node.text
      
      
      tmpText.onclick = (e) => {
        console.log(tmpText);
      }
      
      document.querySelector('#viewport')?.append(tmpText);
    }
  }
}

export function createEdgesAndSetEdgesDataSVG(onSelectedCallback: (e: any, atlasixDiagram: AtlasixDiagram) => void, atlasixDiagram: AtlasixDiagram) {
  for (let [id, edge] of atlasixDiagram.input.edges.entries()) {
    const sourceNode = atlasixDiagram.input.nodes.find(node => node.id === edge.source);
    const targetNode = atlasixDiagram.input.nodes.find(node => node.id === edge.target);

    // const { source, target } = getEdgePointsBetweenRectangles(sourceNode, targetNode);

    const tmpEdge = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    tmpEdge.setAttribute("x1", (sourceNode.x + sourceNode.width / 2).toString());
    tmpEdge.setAttribute("y1", (sourceNode.y + sourceNode.height / 2).toString());
    tmpEdge.setAttribute("x2", (targetNode.x + targetNode.width / 2).toString());
    tmpEdge.setAttribute("y2", (targetNode.y + targetNode.height / 2).toString());
    tmpEdge.setAttribute("stroke", edge.color);

    tmpEdge.onclick = (e) => {
        console.log(e);
      }

    document.querySelector('#viewport')?.append(tmpEdge);
  }
}
