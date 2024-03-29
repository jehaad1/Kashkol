import { myCanvas, setObjects } from "../App";

export default function saveObjects() {
  const objs = myCanvas
    .getObjects()
    .filter((obj) => !isNaN(obj.id))
    .map((obj) => {
      const { scale, translate, ...rest } = obj;
      return rest;
    });
  setObjects(objs);
  localStorage.setItem("objects", JSON.stringify(objs));
}
