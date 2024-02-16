import {
  tool,
  setImage,
  setCurrentObject,
  setSelectedObjects,
  objects,
  setObjects,
  startPoint,
  setStartPoint,
  setStrokePoints,
  myCanvas,
  currentObject,
  setTool,
  erasedObjects,
  setErasedObjects,
  isDrawing,
  setHistory,
  selectedObjects,
} from "../App";
import moveObjects from "../utils/moveObjects";

export let highlighterTimeout, highlighterInterval;
export default function onMouseUp(x, y) {
  setStrokePoints([]);
  setImage(false);
  if (tool() === "eraser") {
    const objs = erasedObjects();
    if (objs.length === 0) return;
    setErasedObjects([]);
    objs.forEach((object) => {
      myCanvas.deleteObject(object.id);
      setObjects((objects) => objects.filter((obj) => object.id !== obj.id));
    });
    setHistory((history) => {
      const newHistory = [...history];
      newHistory.push({ action: "delete", objects: objs });
      return newHistory;
    });
    localStorage.setItem("objects", JSON.stringify(objects()));
  }
  if (!currentObject()) return;
  if (tool() === "hand") {
    if (currentObject() === "canvas") {
      let newX = x - startPoint().x;
      let newY = y - startPoint().y;
      setObjects(moveObjects(myCanvas, objects(), newX, newY));
    }
    localStorage.setItem("objects", JSON.stringify(objects()));
    setStartPoint([]);
    setCurrentObject(null);
    return;
  } else if (tool() === "cursor") {
    if (currentObject() && currentObject() !== "canvas") {
      if (
        !Array.isArray(currentObject()) &&
        !Array.isArray(selectedObjects())
      ) {
        const x = currentObject().x;
        const y = currentObject().y;
        const newX = selectedObjects().x;
        const newY = selectedObjects().y;
        if (x !== newX || y !== newY) {
          setHistory((history) => {
            const newHistory = [...history];
            newHistory.push({
              action: "update",
              objects: [selectedObjects()],
              beforeUpdateObjects: [currentObject()],
            });
            return newHistory;
          });
        }
      } else {
        if (
          currentObject().some(
            (obj) =>
              selectedObjects().some(
                (selectedObj) =>
                  selectedObj.x !== obj.x || selectedObj.y !== obj.y
              )
          )
        ) {
          setHistory((history) => {
            const newHistory = [...history];
            newHistory.push({
              action: "update",
              objects: selectedObjects(),
              beforeUpdateObjects: currentObject(),
            });
            return newHistory;
          });
        }
      }
    }
    myCanvas?.deleteObject("selection");
    myCanvas?.deleteObject("selectionBorder");
    setStartPoint([]);
    localStorage.setItem("objects", JSON.stringify(objects()));
    setCurrentObject(null);
    return;
  }
  if (tool() === "highlighter") {
    const objs = [
      currentObject(),
      ...myCanvas.getObjects().filter((o) => o.isHighlighter),
    ];
    let opacity = 0.75;
    const shades = [
      0.7, 0.65, 0.6, 0.55, 0.5, 0.45, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1,
      0.05, 0,
    ];

    highlighterTimeout = setTimeout(() => {
      highlighterInterval = setInterval(() => {
        if (opacity === 0) {
          clearTimeout(highlighterTimeout);
          clearInterval(highlighterInterval);
          objs.forEach((obj) => {
            myCanvas.deleteObject(obj.id);
          });
          return;
        }
        opacity = shades[shades.indexOf(opacity) + 1];
        objs.forEach((obj) => {
          myCanvas.updateObject(obj.id, { opacity });
        });
      }, 7);
    }, 850);
    setStartPoint([]);
    setCurrentObject(null);
    return;
  }

  if (myCanvas.isObjectExists(currentObject().id)) {
    if (!["pen", "pencil", "highlighter"].includes(tool())) setTool("cursor");
    if (!["pen", "pencil", "highlighter"].includes(tool()))
      setSelectedObjects(currentObject());
    setHistory((history) => {
      const newHistory = [...history];
      newHistory.push({ action: "add", objects: [currentObject()] });
      return newHistory;
    });

    setObjects((objects) => [
      ...objects.filter((obj) => obj.id !== currentObject().id),
      currentObject(),
    ]);
    localStorage.setItem("objects", JSON.stringify(objects()));
  }
  setStartPoint([]);
  setCurrentObject(null);
}
