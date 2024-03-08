import { BiRegularUndo, BiRegularRedo } from "solid-icons/bi";
import {
  currentAction,
  history,
  myCanvas,
  setCurrentAction,
  setObjects,
  setSelectedObjects,
} from "../../App";
import { deleteDragger } from "../../utils/dragger";
import saveObjects from "../../utils/saveObjects";

export function undo(e) {
  e?.preventDefault();
  const lastAction = history()[currentAction()];
  if (!lastAction) return;
  if (lastAction.action === "delete") {
    const objs = lastAction.objects;
    myCanvas.setObjects(objs);
    setObjects((objects) => [...objects, ...objs]);
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
  saveObjects();
}

export function redo(e) {
  e?.preventDefault();
  const lastAction = history()[currentAction() + 1];
  if (!lastAction) return;
  if (lastAction.action === "add") {
    const objs = lastAction.objects;
    myCanvas.setObjects(objs);
    setObjects((objects) => [...objects, ...objs]);
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
  saveObjects();
}

export default function Historybar() {
  return (
    <>
      <div
        class="
        pointer-events-none ltr
        fixed bottom-5 left-[185px]
        flex items-center justify-center"
      >
        <div
          class="
          pointer-events-auto
          max-sm:w-full
          flex select-none
          items-center justify-center bg-white-950 dark:bg-darkcolor-800
          shadow-lg sm:rounded-lg"
        >
          <button
            class="
            rounded-l-lg outline-none hover:bg-darkcolor-400/10 transition-colors
            text-lg w-[40px] h-[40px] inline-flex items-center justify-center"
            title="Undo"
            onClick={undo}
          >
            <BiRegularUndo class="fill-darkcolor-800 dark:fill-white-950" />
          </button>
          <button
            class="
            rounded-r-lg outline-none hover:bg-darkcolor-400/10 transition-colors
            text-lg w-[40px] h-[40px] inline-flex items-center justify-center"
            title="Redo"
            onClick={redo}
          >
            <BiRegularRedo class="fill-darkcolor-800 dark:fill-white-950" />
          </button>
        </div>
      </div>
    </>
  );
}
