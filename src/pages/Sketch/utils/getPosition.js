import { isMobile } from "./main";

export default function (e, changedTouches = "touches") {
  let x = isMobile
    ? e[changedTouches][0].clientX
    : e.offsetX;
  let y = isMobile
    ? e[changedTouches][0].clientY
    : e.offsetY;

  return { x, y };
}
