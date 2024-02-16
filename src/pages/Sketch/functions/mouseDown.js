import {
  tool,
  image,
  setCurrentObject,
  strokePoints,
  setStrokePoints,
  newId,
  styleProps,
  setObjects,
  myCanvas,
  currentObject,
  setSelectedObjects,
  selectedObjects,
  setErasedObjects,
} from "../App";
import { highlighterInterval, highlighterTimeout } from "./mouseUp";
import getPath from "../utils/getPath";
import { deleteDragger, setOnDragger } from "../utils/dragger";

export default function onMouseDown(x, y, mouseObjects) {
  if (tool() === "eraser") {
    setSelectedObjects(null);
    deleteDragger();
    setErasedObjects(mouseObjects);
    mouseObjects
      .filter((obj) => !isNaN(obj.id))
      .forEach((object) => {
        myCanvas.updateObject(object.id, {
          opacity: 0.25,
        });
      });
    return;
  }
  if (image()) {
    setImage(false);
    setTool("cursor");
  }
  if (tool() === "hand") {
    setCurrentObject("canvas");
    setSelectedObjects(null);
    return;
  }
  if (tool() === "cursor") {
    if (mouseObjects.length === 0) {
      setCurrentObject("canvas");
      setSelectedObjects(null);
      setOnDragger(false);
      return;
    }

    if (mouseObjects.find((obj) => obj.id === "dragger")) {
      return setCurrentObject(selectedObjects());
    }
    const obj = mouseObjects[mouseObjects.length - 1];
    setCurrentObject(obj);
    setSelectedObjects(obj);
    return;
  } else {
    setSelectedObjects(null);
    deleteDragger();
  }

  // if (tool() === "text") {
  //   if (mouseObjects.find((o) => o.type === "text")) {
  //     setOnText(true);
  //     let object = mouseObjects.find((o) => o.type === "text");
  //     setCurrentObject(object);
  //     myCanvas.deleteObject(object.id);
  //     textarea.value = object.text;
  //     setStartPoint({ x: object.x, y: object.y });
  //   } else
  //     setCurrentObject({
  //       id: newId(),
  //       zIndex: newId(),
  //       type: "text",
  //       x: x,
  //       y: y,
  //       text: "",
  //       fill: styleProps().fill,
  //       font: {
  //         size: styleProps().font.size,
  //       },
  //     });
  //   setOnText(true);
  //   setUpdateText(() => {
  //     return function (text) {
  //       setFocused(false);
  //       setUpdateText(null);
  //       setStartPoint({});
  //       setOnText(false);
  //       setTool("hand");
  //       if (!text) {
  //         setObjects((objects) =>
  //           objects.filter((object) => object.id !== currentObject().id)
  //         );
  //       } else {
  //         setCurrentObject((object) => ({ ...object, text }));
  //         setObjects((objects) => [
  //           ...objects.filter((object) => object.id !== currentObject().id),
  //           currentObject(),
  //         ]);
  //       }
  //       myCanvas.clearCanvas();
  //       myCanvas.setObjects(objects());
  //     };
  //   });
  //   setObjects((objects) => [...objects, currentObject()]);
  //   myCanvas.setObject(currentObject());
  // } else
  const id = newId();
  if (tool() === "pencil") {
    setStrokePoints([[x, y]]);
    const path = getPath(strokePoints(), styleProps().stroke.width);
    setCurrentObject({
      id,
      zIndex: id,
      x,
      y,
      type: "path",
      fill: styleProps().stroke.fill,
      path: path,
    });
  } else if (tool() === "highlighter") {
    clearTimeout(highlighterTimeout);
    clearInterval(highlighterInterval);
    const objs = myCanvas.getObjects().filter((o) => o.isHighlighter);
    objs.forEach((obj) => {
      myCanvas.updateObject(obj.id, { opacity: 0.75 });
    });
    setStrokePoints([[x, y]]);
    const path = getPath(strokePoints(), styleProps().stroke.width);
    setCurrentObject({
      id,
      zIndex: id,
      x,
      y,
      type: "path",
      isHighlighter: true,
      fill: styleProps().stroke.fill,
      path: path,
      opacity: 0.75,
    });
  } else if (tool() === "pen") {
    setCurrentObject({
      id,
      zIndex: id,
      from: { x, y },
      to: { x, y },
      type: "line",
      ...styleProps(),
      stroke: styleProps().stroke,
    });
  } else if (tool() === "rectangle" || tool() === "circle") {
    return setCurrentObject({
      id,
      zIndex: id,
      x,
      y,
      type: tool(),
      width: 0,
      height: 0,
      ...styleProps(),
      borderRadius: 0,
    });
  }
  myCanvas.setObject(currentObject());
}
