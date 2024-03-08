export default function (myCanvas, objects, newX, newY, mode = "relative") {
  if (objects[0] && Array.isArray(objects[0])) {
    objects = objects[0];
  }
  objects.forEach((obj) => {
    myCanvas.moveObject(obj.id, newX, newY, mode);
  });
  return myCanvas.getObjects().filter((obj) => !isNaN(obj.id));
}
