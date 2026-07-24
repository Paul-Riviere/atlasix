import { Canvas } from "fabric";
import { AtlasixInput } from "./AtlasixInput";

export class AtlasixDiagram {
  canvas: Canvas;
  container: HTMLDivElement;
  sidebar: HTMLDivElement;

  input: AtlasixInput;

  isPanning: boolean = false;
  lastMouse = { x: 0, y: 0 };

  tx = 0;
  ty = 0;
  scale = 1;

  constructor(
    canvas: Canvas,
    container: HTMLDivElement,
    sidebar: HTMLDivElement,
    input: AtlasixInput
  ) {
    this.canvas = canvas;
    this.container = container;
    this.sidebar = sidebar;
    this.input = input;
  }
}
