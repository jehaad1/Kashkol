import { displayMode } from "../../../root";
import { myCanvas } from "../App";

export function createSelection(x, y, x2, y2) {
  const selection = {
    id: "selection",
    zIndex: 99999999999999,
    type: "rectangle",
    x,
    y,
    width: x2 - x,
    height: y2 - y,
    borderRadius: 0,
    fill: "#cfd6ff",
    opacity: 0.09,
  };
  const selectionBorder = {
    id: "selectionBorder",
    zIndex: 99999999999999,
    type: "rectangle",
    x,
    y,
    width: x2 - x,
    height: y2 - y,
    borderRadius: 0,
    fill: "transparent",
    stroke: {
      fill: "#5A6090",
      width: 2,
    },
  };
  myCanvas?.setObjects([selection, selectionBorder]);
}
