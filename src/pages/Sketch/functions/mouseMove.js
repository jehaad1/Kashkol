import {
  tool,
  image,
  setCurrentObject,
  styleProps,
  startPoint,
  side,
  setStartPoint,
  strokePoints,
  setStrokePoints,
  setImage,
  setIsDrawing,
  setTool,
  objects,
  setObjects,
  myCanvas,
  currentObject,
  selectedObjects,
  setSelectedObjects,
  setErasedObjects,
  isDragging,
} from "../App";
import getNewProps from "../utils/getNewProps";
import moveObjects from "../utils/moveObjects";
import getPath from "../utils/getPath";
import { createSelection } from "../utils/selection";
import { deleteDragger, drawDragger } from "../utils/dragger";

export default function onMouseMove(x, y, mouseObjects) {
  if (tool() === "eraser") {
    setSelectedObjects(null);
    deleteDragger();
    setErasedObjects((objs) => [
      ...objs,
      ...mouseObjects.filter((obj) => !objs.map((o) => o.id).includes(obj.id)),
    ]);
    mouseObjects
      .filter((obj) => !isNaN(obj.id))
      .forEach((object) => {
        myCanvas.updateObject(object.id, {
          opacity: 0.25,
        });
      });
    return;
  }
  if (!currentObject()) {
    setStartPoint([]);
    setStrokePoints([]);
    setImage(false);
    setIsDrawing(false);
    if (tool() !== "eraser") setTool("cursor");
    return;
  }

  if (image()) {
    moveObjects(myCanvas, [currentObject()], x, y, "absolute");
  } else if (tool() === "hand") {
    const newX = x - startPoint().x;
    const newY = y - startPoint().y;
    setStartPoint({ x, y });
    if (currentObject() === "canvas")
      moveObjects(myCanvas, objects(), newX, newY);
  } else if (tool() === "cursor") {
    if (currentObject() === "canvas") {
      createSelection(startPoint().x, startPoint().y, x, y);
      const objs = objects();
      const selectedObjs = objs.filter((obj) => {
        if (isNaN(obj.id)) return;
        let objX = obj.x;
        let objY = obj.y;

        if (obj.translate) {
          objX = obj.translate.x;
          objY = obj.translate.y;
        }

        const biggerX = x > startPoint().x ? x : startPoint().x;
        const biggerY = y > startPoint().y ? y : startPoint().y;
        const smallerX = x < startPoint().x ? x : startPoint().x;
        const smallerY = y < startPoint().y ? y : startPoint().y;
        return (
          objX >= smallerX &&
          objX <= biggerX &&
          objY >= smallerY &&
          objY <= biggerY
        );
      });
      setSelectedObjects(selectedObjs.length > 0 ? selectedObjs : null);
      return;
    }
    const newX = x - startPoint().x;
    const newY = y - startPoint().y;
    setStartPoint({ x, y });
    // if (side()) {
    //   const {
    //     x: newX,
    //     y: newY,
    //     width,
    //     height,
    //     borderRadius,
    //   } = getNewProps(currentObject(), x, y);
    //   if (["left", "bottom"].includes(side())) {
    //     if (side() === "left") {
    //       setCurrentObject({
    //         ...currentObject(),
    //         x: newX,
    //         width,
    //         borderRadius,
    //       });
    //       setSelectedObject({
    //         ...selectedObject(),
    //         x: newX,
    //         width,
    //         borderRadius,
    //       });
    //     } else {
    //       setCurrentObject({
    //         ...currentObject(),
    //         y: newY,
    //         height,
    //         borderRadius,
    //       });
    //       setSelectedObject({
    //         ...selectedObject(),
    //         y: newY,
    //         height,
    //         borderRadius,
    //       });
    //     }
    //   } else {
    //     if (side() === "right") {
    //       setCurrentObject({
    //         ...currentObject(),
    //         x: newX,
    //         width,
    //         borderRadius,
    //       });
    //       setSelectedObject({
    //         ...selectedObject(),
    //         x: newX,
    //         width,
    //         borderRadius,
    //       });
    //     } else {
    //       setCurrentObject({
    //         ...currentObject(),
    //         y: newY,
    //         height,
    //         borderRadius,
    //       });
    //       setSelectedObject({
    //         ...selectedObject(),
    //         y: newY,
    //         height,
    //         borderRadius,
    //       });
    //     }
    //   }
    //   setObjects((objects) => [
    //     ...objects.filter((obj) => obj.id !== currentObject().id),
    //     currentObject(),
    //   ]);
    //   myCanvas.updateObject(currentObject().id, {
    //     x: currentObject().x,
    //     y: currentObject().y,
    //     width: currentObject().width,
    //     height: currentObject().height,
    //     borderRadius: currentObject().borderRadiu,
    //   });
    // } else {
    setObjects(moveObjects(myCanvas, [currentObject()], newX, newY));
    if (Array.isArray(currentObject())) {
      const objs = selectedObjects().map((obj) => {
        const newObj = { ...obj };
        if (["path", "line"].includes(newObj.type)) {
          if (newObj.translate) {
            newObj.translate.x += newX;
            newObj.translate.y += newY;
          } else {
            newObj.translate = { x: newX, y: newY };
          }
        } else {
          newObj.x += newX;
          newObj.y += newY;
        }
        return newObj;
      });
      setSelectedObjects(objs);
      drawDragger(selectedObjects());
      return;
    }
    const newObj = { ...selectedObjects() };
    if (["path", "line"].includes(newObj.type)) {
      if (newObj.translate) {
        newObj.translate.x += newX;
        newObj.translate.y += newY;
      } else {
        newObj.translate = { x: newX, y: newY };
      }
    } else {
      newObj.x += newX;
      newObj.y += newY;
    }

    setSelectedObjects(newObj);
  } else if (tool() === "pencil" || tool() === "highlighter") {
    setStrokePoints((points) => [...points, [x, y]]);
    const path = getPath(strokePoints(), styleProps().stroke.width);
    setCurrentObject((current) => ({ ...current, path }));
    const minX = Math.min(...strokePoints().map((point) => point[0]));
    const minY = Math.min(...strokePoints().map((point) => point[1]));
    const maxX = Math.max(...strokePoints().map((point) => point[0]));
    const maxY = Math.max(...strokePoints().map((point) => point[1]));
    myCanvas.updateObject(currentObject().id, {
      x: minX,
      y: minY,
      width: maxX,
      height: maxY,
      path,
      opacity: tool() === "pencil" ? styleProps().opacity : 0.75,
    });
  } else if (tool() === "pen") {
    setCurrentObject((current) => ({
      ...current,
      to: {
        x,
        y,
      },
    }));
    myCanvas.updateObject(currentObject().id, {
      to: {
        x,
        y,
      },
    });
  } else if (tool() === "rectangle") {
    const {
      x: newX,
      y: newY,
      width,
      height,
      borderRadius,
    } = getNewProps(startPoint(), x, y);
    setCurrentObject((current) => ({
      ...current,
      x: newX,
      y: newY,
      width,
      height,
      borderRadius,
    }));
    if (!myCanvas.isObjectExists(currentObject().id)) {
      myCanvas.setObject(currentObject());
    } else
      myCanvas.updateObject(currentObject().id, {
        x: newX,
        y: newY,
        width,
        height,
        borderRadius,
      });
  } else if (tool() === "circle") {
    // x: (e.clientX + obj.x) / 2,
    // y: (e.clientY + obj.y) / 2,
    // width: Math.abs(e.clientX - startPosition().x),
    // height: Math.abs(e.clientY - startPosition().y),

    setCurrentObject((current) => ({
      ...current,
      x: (x + startPoint().x) / 2,
      y: (y + startPoint().y) / 2,
      width: Math.abs(x - startPoint().x),
      height: Math.abs(y - startPoint().y),
    }));
    if (!myCanvas.isObjectExists(currentObject().id)) {
      myCanvas.setObject(currentObject());
    } else {
      myCanvas.updateObject(currentObject().id, {
        x: (x + startPoint().x) / 2,
        y: (y + startPoint().y) / 2,
        width: Math.abs(x - startPoint().x),
        height: Math.abs(y - startPoint().y),
      });
    }
  }
}
