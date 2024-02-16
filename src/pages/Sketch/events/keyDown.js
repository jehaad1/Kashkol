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
  tool,
} from "../App";
import { deleteDragger, drawDragger } from "../utils/dragger";
import pasteObjects from "../functions/pasteObjects";

export default function handleKeyDown(e) {
  if (isTyping()) return;
  if (e.ctrlKey || e.metaKey) {
    if (e.key === "+" || e.key === "=" || e.key === "-") e.preventDefault();
    if (e.key === "c") {
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
      localStorage.setItem("objects", JSON.stringify(objects()));
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
    localStorage.setItem("objects", JSON.stringify(objects()));
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
      setIsDrawing(false);
      return;
    }
    deleteDragger();
    setSelectedObjects(null);
  }
}

function undo(e) {
  e.preventDefault();
  const lastAction = history()[currentAction()];
  if (!lastAction) return;
  if (lastAction.action === "delete") {
    const objs = lastAction.objects;
    myCanvas.setObjects(objs);
    setObjects((objects) => [...objects, ...objs]);
    // } else if (lastAction.action === "select") {
    //   lastAction.objects.forEach((object) => {
    //     myCanvas.updateObject(object.id, {
    //       opacity: object.opacity || 1,
    //     });
    //   });
    // } else if (lastAction.action === "unselect") {
    //   lastAction.objects.forEach((object) => {
    //     myCanvas.updateObject(object.id, {
    //       opacity: object.opacity || 1,
    //     });
    //   });
    setSelectedObjects(objs.length === 1 ? objs[0] : objs);
  } else if (lastAction.action === "update") {
    const objects = lastAction.beforeUpdateObjects;
    myCanvas.setObjects(objects);
    setObjects((objs) => {
      return [
        ...objs.filter((obj) => !objects.map((o) => o.id).includes(obj.id)),
        ...objects,
      ];
    });
    setSelectedObjects(objects.length === 1 ? objects[0] : objects);
  } else if (lastAction.action === "add") {
    const objIds = lastAction.objects.map((obj) => obj.id);
    objIds.forEach((id) => {
      myCanvas.deleteObject(id);
    });
    setObjects((objs) => {
      return objs.filter((obj) => !objIds.includes(obj.id));
    });
    setSelectedObjects(null);
    deleteDragger();
  }
  setCurrentAction((currentAction) =>
    currentAction >= 0 ? currentAction - 1 : currentAction
  );
  localStorage.setItem("objects", JSON.stringify(objects()));
}

function redo(e) {
  e.preventDefault();
  const lastAction = history()[currentAction() + 1];
  if (!lastAction) return;
  if (lastAction.action === "add") {
    const objs = lastAction.objects;
    myCanvas.setObjects(objs);
    setObjects((objects) => [...objects, ...objs]);
    // } else if (lastAction.action === "select") {
    //   lastAction.objects.forEach((object) => {
    //     myCanvas.updateObject(object.id, {
    //       opacity: object.opacity || 1,
    //     });
    //   });
    // } else if (lastAction.action === "unselect") {
    //   lastAction.objects.forEach((object) => {
    //     myCanvas.updateObject(object.id, {
    //       opacity: object.opacity || 1,
    //     });
    //   });
    setSelectedObjects(objs.length === 1 ? objs[0] : objs);
  } else if (lastAction.action === "update") {
    const objects = lastAction.objects;
    myCanvas.setObjects(objects);
    setObjects((objs) => {
      return [
        ...objs.filter((obj) => !objects.map((o) => o.id).includes(obj.id)),
        ...objects,
      ];
    });
    setSelectedObjects(objects.length === 1 ? objects[0] : objects);
  } else if (lastAction.action === "delete") {
    const objIds = lastAction.objects.map((obj) => obj.id);
    objIds.forEach((id) => {
      myCanvas.deleteObject(id);
    });
    setObjects((objs) => {
      return objs.filter((obj) => !objIds.includes(obj.id));
    });
    setSelectedObjects(null);
    deleteDragger();
  }
  setCurrentAction((currentAction) =>
    currentAction < history().length ? currentAction + 1 : currentAction
  );
  localStorage.setItem("objects", JSON.stringify(objects()));
}

// all the history is working expect for moving objects
// arrows for moving