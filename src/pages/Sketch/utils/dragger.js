import { createSignal } from "solid-js";
import {
  myCanvas,
  selectedObjects,
  setSide,
  tool,
  setIsDragging,
} from "../App";

export const [onDragger, setOnDragger] = createSignal(false);
export function createDragger(x, y, width, height, rotation, type) {
  if (type === "circle") {
    x = x - width / 2;
    y = y - height / 2;
  }
  const border = {
    id: "dragger",
    zIndex: 99999999999999,
    type: "rectangle",
    fill: "transparent",
    x: x - 10,
    y: y - 10,
    borderRadius: 5,
    width: width + 20,
    height: height + 20,
    rotation,
    stroke: {
      fill: "#5A6090",
      width: 2,
    },
  };
  myCanvas?.setObjects([border]);
  // setHistory((history) => {
  //   const newHistory = [...history];
  //   newHistory.push({ action: "select", objects: selectedObjects() });
  //   return newHistory;
  // });
}

export function deleteDragger() {
  myCanvas?.deleteObject("dragger");
  // setHistory((history) => {
  //   const newHistory = [...history];
  //   newHistory.push({ action: "unselect", objects: selectedObjects() });
  //   return newHistory;
  // });
  setOnDragger(false);
}

export function isCursorOnDragger(cursorX, cursorY, objects) {
  if (!myCanvas.isObjectExists("dragger")) return;
  if (!selectedObjects() || selectedObjects().length === 0)
    return deleteDragger();
  if (
    tool() === "cursor" &&
    objects.find((obj) => obj.id === "dragger") &&
    objects.find((obj) => obj.id === selectedObjects()?.id)
  ) {
    setIsDragging(true);
  } else {
    setIsDragging(false);
    if (tool() === "cursor" && objects.find((obj) => obj.id === "dragger")) {
      const obj = objects.find((obj) => obj.id === "dragger");
      const { x: objX, y: objY, width, height } = obj;
      if (
        objX <= cursorX &&
        cursorX <= objX + width &&
        objY <= cursorY &&
        cursorY <= objY + height
      ) {
        if (cursorX - objX <= 10) setSide("left");
        else if (objX + width - cursorX <= 10) setSide("right");
        else if (cursorY - objY <= 10) setSide("top");
        else if (objY + height - cursorY <= 10) setSide("bottom");
        else setSide("");
      }
    } else setSide("");
  }
}

export function drawDragger(obj) {
  if (!Array.isArray(obj)) {
    if (obj) {
      if (obj.type === "line") {
        const x =
          Math.min(obj.from.x || 0, obj.to.x || 0) + (obj.translate?.x || 0);
        const y =
          Math.min(obj.from.y || 0, obj.to.y || 0) + (obj.translate?.y || 0);
        const x2 =
          Math.max(obj.from.x || 0, obj.to.x || 0) + (obj.translate?.x || 0);
        const y2 =
          Math.max(obj.from.y || 0, obj.to.y || 0) + (obj.translate?.y || 0);
        createDragger(x, y, x2, y2);
      } else
        createDragger(
          obj.x + (obj.translate?.x || 0),
          obj.y + (obj.translate?.y || 0),
          obj.width + (obj.translate?.x || 0),
          obj.height + (obj.translate?.y || 0),
          obj.rotation,
          obj.type
        );
    }
  } else if (Array.isArray(obj)) {
    const biggestX = Math.max(
      ...obj.map((o) => {
        if (o.type === "line")
          return Math.max(o.from.x || 0, o.to.x || 0) + (o.translate?.x || 0);
        if (o.type === "circle") return o.x + o.width / 2;
        return o.x + o.width;
      })
    );
    const biggestY = Math.max(
      ...obj.map((o) => {
        if (o.type === "line") {
          return Math.max(o.from.y || 0, o.to.y || 0) + (o.translate?.y || 0);
        }
        if (o.type === "circle") return o.y + o.height / 2;
        return o.y + o.height;
      })
    );
    const smallestX = Math.min(
      ...obj.map((o) => {
        if (o.type === "line")
          return Math.min(o.from.x || 0, o.to.x || 0) + (o.translate?.x || 0);
        if (o.type === "circle") return o.x - o.width / 2;
        return o.x;
      })
    );
    const smallestY = Math.min(
      ...obj.map((o) => {
        if (o.type === "line")
          return Math.min(o.from.y || 0, o.to.y || 0) + (o.translate?.y || 0);
        if (o.type === "circle") return o.y - o.height / 2;
        return o.y;
      })
    );
    const width = biggestX - smallestX;
    const height = biggestY - smallestY;
    createDragger(smallestX, smallestY, width, height);
  } else deleteDragger();
}
