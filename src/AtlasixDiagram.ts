import { AtlasixInput } from "./AtlasixInput";
import { AtlasixSvgObject } from "./AtlasixSvgObject";

export class AtlasixDiagram {
  container: HTMLElement;
  sidebar: HTMLDivElement;
  baseSvg: SVGElement;
  viewport: SVGElement;

  input: AtlasixInput;

  elements: Map<string, AtlasixSvgObject> = new Map();
  selectedElement: AtlasixSvgObject | undefined;

  isPanning: boolean = false;
  lastMouse = { x: 0, y: 0 };
  pointers = new Map<number, { x: number; y: number }>();
  pinchDistance = 0;

  tx = 0;
  ty = 0;
  scale = 1;

  constructor(
    container: HTMLElement,
    sidebar: HTMLDivElement,
    baseSvg: SVGElement,
    viewport: SVGElement,
    input: AtlasixInput
  ) {
    this.container = container;
    this.sidebar = sidebar;
    this.baseSvg = baseSvg;
    this.viewport = viewport;
    this.input = input;
  }
}
