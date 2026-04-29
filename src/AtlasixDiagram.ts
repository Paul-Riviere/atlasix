import { Canvas } from "fabric";

export class AtlasixDiagram {
  canvas: Canvas;
  nodesData: any;
  container: HTMLDivElement;
  sidebar: HTMLDivElement;

  isPanning: boolean = false;
  lastMouse = { x: 0, y: 0 };

  constructor(
    canvas: Canvas,
    nodesData: any,
    container: HTMLDivElement,
    sidebar: HTMLDivElement
  ) {
    this.canvas = canvas;
    this.nodesData = nodesData;
    this.container = container;
    this.sidebar = sidebar;
  }
}
