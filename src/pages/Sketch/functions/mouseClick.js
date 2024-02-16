import { tool, setCurrentObject, setSelectedObjects } from "../App";
import { deleteDragger, onDragger, setOnDragger } from "../utils/dragger";

export default function onMouseClick(mouseObjects) {
  if (tool() === "cursor") {
    if (!mouseObjects.find((obj) => obj.id === "dragger")) {
      setCurrentObject(null);
      setSelectedObjects(null);
      deleteDragger();
      return;
    }
    const obj = mouseObjects.find((obj) => obj.id !== "dragger");
    if (!onDragger()) return setOnDragger(obj?.id ?? true);
    if (onDragger() !== true && obj) {
      if (onDragger() !== obj?.id) return setOnDragger(obj?.id ?? true);
    }
    setCurrentObject(null);
    setSelectedObjects(null);
    deleteDragger();
    return;
  }
}
