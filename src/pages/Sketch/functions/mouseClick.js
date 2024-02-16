import { tool, setCurrentObject, setSelectedObjects, myCanvas } from "../App";
import { deleteDragger, onDragger, setOnDragger } from "../utils/dragger";

const uniqueIds = [];
export default function onMouseClick(mouseObjects) {
  if (tool() !== "cursor") return;
  if (!mouseObjects.find((obj) => obj.id === "dragger")) {
    setCurrentObject(null);
    setSelectedObjects(null);
    deleteDragger();
    return;
  }

  if (onDragger() === true) return setOnDragger(false);
  if (
    !mouseObjects.find(
      (obj) =>
        obj.id === "dragger" && obj.uniqueId === uniqueIds[uniqueIds.length - 1]
    )
  ) {
    const obj = mouseObjects.find((obj) => obj.id !== "dragger");
    if (!onDragger()) return setOnDragger(obj?.id ?? true);
    if (onDragger() !== true && obj) {
      if (onDragger() !== obj?.id) return setOnDragger(obj?.id ?? true);
    }
  } else {
    myCanvas.updateObject(mouseObjects.find((obj) => obj.id === "dragger"), {
      uniqueId: (uniqueIds[uniqueIds.length - 1] || 0) + 1,
    });
    uniqueIds.push((uniqueIds[uniqueIds.length - 1] || 0) + 1);
  }

  setCurrentObject(null);
  setSelectedObjects(null);
  deleteDragger();
  return;
}
