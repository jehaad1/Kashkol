export default function (myCanvas, objects) {
  const canvas = myCanvas.canvas;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  myCanvas.clearCanvas();
  if (objects) myCanvas.setObjects(objects);
}
