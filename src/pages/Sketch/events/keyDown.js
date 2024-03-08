import {
  copiedObjects,
  currentAction,
  erasedObjects,
  history,
  isDrawing,
  isLocked,
  isTyping,
  myCanvas,
  objects,
  selectedObjects,
  setCopiedObjects,
  setCurrentAction,
  setErasedObjects,
  setHistory,
  setIsDrawing,
  setObjects,
  setSelectedObjects,
  setTool,
  tool,
} from "../App";
import { deleteDragger, drawDragger } from "../utils/dragger";
import pasteObjects from "../functions/pasteObjects";
import saveObjects from "../utils/saveObjects";
import { zoomIn, zoomOut, resetZoom } from "../components/Bars/Zoombar";
import { undo, redo } from "../components/Bars/Historybar";

export default function handleKeyDown(e) {
  if (isTyping()) return;
  if (e.ctrlKey || e.metaKey) {
    if (e.key === "+" || e.key === "=") {
      e.preventDefault();
      return zoomIn();
    } else if (e.key === "-") {
      e.preventDefault();
      return zoomOut();
    } else if (e.key === "0") {
      e.preventDefault();
      return resetZoom();
    } else if (e.key === "c") {
      e.preventDefault();
      const obj = selectedObjects();
      if (Array.isArray(obj)) {
        setCopiedObjects(obj);
        return;
      }
      if (!obj || !obj.type) return;
      setCopiedObjects([obj]);
    } else if (e.key === "v") {
      e.preventDefault();
      if (isLocked()) return;
      pasteObjects(copiedObjects());
    } else if (e.key === "a") {
      e.preventDefault();
      if (isLocked()) return;
      setSelectedObjects(objects());
      drawDragger(objects());
    } else if (e.key === "z") {
      if (e.shiftKey) redo(e);
      else {
        e.preventDefault();
        if (tool() === "eraser" && isDrawing()) {
          const objs = erasedObjects();
          if (objs.length === 0) return;
          setErasedObjects([]);
          objs.forEach((object) => {
            myCanvas.updateObject(object.id, {
              opacity: object.opacity || 1,
            });
          });
          setIsDrawing(false);
          setTool("select");
          return;
        } else undo(e);
      }
    } else if (e.key === "y") redo(e);
  } else if (e.key === "Backspace" || e.key === "Delete") {
    e.preventDefault();
    const obj = selectedObjects();
    deleteDragger();
    if (Array.isArray(obj)) {
      setSelectedObjects(null);
      obj.forEach((object) => {
        setObjects((objs) => objs.filter((o) => o.id !== object.id));
        myCanvas.deleteObject(object.id);
      });
      saveObjects();
      setHistory((history) => {
        const newHistory = [...history];
        newHistory.push({ action: "delete", objects: obj });
        return newHistory;
      });
      return;
    }
    if (!obj || !obj.type) return;
    setObjects((objs) => objs.filter((o) => o.id !== obj.id));
    setSelectedObjects(null);
    myCanvas.deleteObject(obj.id);
    saveObjects();
    setHistory((history) => {
      const newHistory = [...history];
      newHistory.push({ action: "delete", objects: [obj] });
      return newHistory;
    });
  } else if (e.key === "Escape") {
    if (tool() === "eraser") {
      const objs = erasedObjects();
      if (objs.length === 0) return;
      setErasedObjects([]);
      objs.forEach((object) => {
        myCanvas.updateObject(object.id, {
          opacity: object.opacity || 1,
        });
      });
      setTool("select");
      setIsDrawing(false);
      return;
    }
    deleteDragger();
    setSelectedObjects(null);
  } else if (
    e.key === "ArrowUp" ||
    e.key === "ArrowDown" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight"
  ) {
    e.preventDefault();
    if (isLocked()) return;
    const objs = selectedObjects();
    if (!objs) return;
    if (Array.isArray(objs)) {
      const newObjs = objs.map((obj) => {
        let x = obj.x;
        let y = obj.y;
        if (obj.translate) {
          x = obj.translate.x;
          y = obj.translate.y;
        }
        if (e.key === "ArrowUp") y -= 1;
        if (e.key === "ArrowDown") y += 1;
        if (e.key === "ArrowLeft") x -= 1;
        if (e.key === "ArrowRight") x += 1;
        myCanvas.updateObject(obj.id, { x, y });
        return { ...obj, x, y };
      });
      setSelectedObjects(newObjs);
      setObjects(myCanvas.getObjects().filter((obj) => !isNaN(obj.id)));
      saveObjects();

      return;
    }
    let x = objs.x;
    let y = objs.y;
    if (objs.translate) {
      x = objs.translate.x;
      y = objs.translate.y;
    }
    if (e.key === "ArrowUp") y -= 1;
    if (e.key === "ArrowDown") y += 1;
    if (e.key === "ArrowLeft") x -= 1;
    if (e.key === "ArrowRight") x += 1;
    myCanvas.updateObject(objs.id, { x, y });
    setSelectedObjects({ ...objs, x, y });
    setObjects(myCanvas.getObjects().filter((obj) => !isNaN(obj.id)));
    saveObjects();
  }
}
