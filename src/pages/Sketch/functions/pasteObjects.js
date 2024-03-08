import {
  myCanvas,
  newId,
  objects,
  setHistory,
  setObjects,
  setSelectedObjects,
} from "../App";
import { drawDragger } from "../utils/dragger";
import saveObjects from "../utils/saveObjects";

export default function pasteObjects(objs) {
  const newObjs = objs.map((obj) => {
    let newObj = { ...obj };
    newObj.id = newId();
    newObj.zIndex = newId();
    newObj.x = newObj.x + 20;
    newObj.y = newObj.y + 20;
    return newObj;
  });
  setObjects((objects) => [...objects, ...newObjs]);
  myCanvas.setObjects(newObjs);
  setSelectedObjects(newObjs);
  drawDragger(newObjs);
  setHistory((history) => {
    const newHistory = [...history];
    newHistory.push({ action: "add", objects: newObjs, copiedObjects: objs });
    return newHistory;
  });
  saveObjects();
}
