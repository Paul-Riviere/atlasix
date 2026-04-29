import { Canvas } from "fabric";

export function createCanvas() {
  let canvas = document.createElement("canvas");

  canvas.width = 900;
  canvas.height = 700;
  canvas.style.border = "solid black 1px";

  return canvas;
}

export function createFabricCanvas(canvas: HTMLCanvasElement) {
  const fabricCanvas = new Canvas(canvas, {
    defaultCursor: "grab",
    hoverCursor: "pointer",
    selection: false
  });

  return fabricCanvas;
}