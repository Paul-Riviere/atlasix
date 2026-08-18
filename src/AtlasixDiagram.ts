import { Canvas } from "fabric";
import { AtlasixInput } from "./AtlasixInput";
import { AtlasixSvgObject } from "./AtlasixSvgObject";

export class AtlasixDiagram {
  canvas: Canvas;
  container: HTMLDivElement;
  sidebar: HTMLDivElement;

  input: AtlasixInput;

  elements: Map<string, AtlasixSvgObject> = new Map();
  selectedElement: AtlasixSvgObject | undefined;

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
