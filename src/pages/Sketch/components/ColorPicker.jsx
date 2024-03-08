import {
  myCanvas,
  objects,
  selectedObjects,
  setHistory,
  setObjects,
  setSelectedObjects,
  setStyleProps,
  styleProps,
} from "../App";
import saveObjects from "../utils/saveObjects";

export default function ColorPicker(props) {
  const { property } = props;
  function updatingColor(fill) {
    if (property === "stroke") {
      if (selectedObjects()) {
        if (Array.isArray(selectedObjects())) {
          selectedObjects().forEach((obj) => {
            myCanvas.updateObject(obj.id, {
              stroke: {
                ...obj.stroke,
                fill,
              },
            });
            setObjects((objs) => {
              const index = objs.findIndex((o) => o.id === obj.id);
              objs[index].stroke = {
                ...objs[index].stroke,
                fill,
              };
              return [...objs];
            });
          });
          setHistory((history) => {
            const newHistory = [...history];
            newHistory.push({
              action: "update",
              objects: selectedObjects().map((obj) => ({
                ...obj,
                stroke: {
                  ...obj.stroke,
                  fill,
                },
              })),
              beforeUpdateObjects: selectedObjects(),
            });
            return newHistory;
          });
          setSelectedObjects((objs) => {
            return objs.map((obj) => ({
              ...obj,
              stroke: {
                ...obj.stroke,
                fill,
              },
            }));
          });
        } else {
          const obj = selectedObjects();
          myCanvas.updateObject(obj.id, {
            stroke: {
              ...obj.stroke,
              fill,
            },
          });
          setObjects((objs) => {
            const index = objs.findIndex((o) => o.id === obj.id);
            objs[index].stroke = {
              ...obj.stroke,
              fill,
            };
            return [...objs];
          });
          setSelectedObjects((obj) => {
            return {
              ...obj,
              stroke: {
                ...obj.stroke,
                fill,
              },
            };
          });
          setHistory((history) => {
            const newHistory = [...history];
            newHistory.push({
              action: "update",
              objects: [
                {
                  ...obj,
                  stroke: {
                    ...obj.stroke,
                    fill,
                  },
                },
              ],
              beforeUpdateObjects: [obj],
            });
            return newHistory;
          });
        }
        saveObjects();
      } else {
        setStyleProps((props) => ({
          ...props,
          stroke: { ...props.stroke, fill },
        }));
      }
    } else if (property === "fill") {
      if (selectedObjects()) {
        if (Array.isArray(selectedObjects())) {
          selectedObjects().forEach((obj) => {
            myCanvas.updateObject(obj.id, {
              fill,
            });
            setObjects((objs) => {
              const index = objs.findIndex((o) => o.id === obj.id);
              objs[index].fill = fill;
              return [...objs];
            });
          });
          setHistory((history) => {
            const newHistory = [...history];
            newHistory.push({
              action: "update",
              objects: selectedObjects().map((obj) => ({
                ...obj,
                fill,
              })),
              beforeUpdateObjects: selectedObjects(),
            });
            return newHistory;
          });
          setSelectedObjects((objs) => {
            return objs.map((obj) => ({
              ...obj,
              fill,
            }));
          });
        } else {
          const obj = selectedObjects();
          myCanvas.updateObject(obj.id, {
            fill,
          });
          setObjects((objs) => {
            const index = objs.findIndex((o) => o.id === obj.id);
            objs[index].fill = fill;
            return [...objs];
          });
          setSelectedObjects((obj) => {
            return {
              ...obj,
              fill,
            };
          });
          setHistory((history) => {
            const newHistory = [...history];
            newHistory.push({
              action: "update",
              objects: [
                {
                  ...obj,
                  fill,
                },
              ],
              beforeUpdateObjects: [obj],
            });
            return newHistory;
          });
        }
        saveObjects();
      } else {
        setStyleProps((props) => ({
          ...props,
          fill,
        }));
      }
    }
  }

  return (
    <div
      class="
      grid grid-cols-4 gap-3"
    >
      <div
        class={`
        h-7 aspect-square ${
          (selectedObjects()
            ? Array.isArray(selectedObjects())
              ? typeof selectedObjects()[0][property] === "string"
                ? selectedObjects()[0][property]
                : selectedObjects()[0][property]["fill"]
              : typeof selectedObjects()[property] === "string"
              ? selectedObjects()[property]
              : selectedObjects()[property]["fill"]
            : typeof styleProps()[property] === "string"
            ? styleProps()[property]
            : styleProps()[property]["fill"]) === "transparent"
            ? "selected"
            : ""
        }
        rounded transparent cursor-pointer
        outline-transparent outline outline-offset-1 outline-2`}
        title="Transparent"
        onClick={() => updatingColor("transparent")}
      >
        &nbsp;
      </div>
      <div
        class={`
        h-7 aspect-square ${
          (selectedObjects()
            ? Array.isArray(selectedObjects())
              ? typeof selectedObjects()[0][property] === "string"
                ? selectedObjects()[0][property]
                : selectedObjects()[0][property]["fill"]
              : typeof selectedObjects()[property] === "string"
              ? selectedObjects()[property]
              : selectedObjects()[property]["fill"]
            : typeof styleProps()[property] === "string"
            ? styleProps()[property]
            : styleProps()[property]["fill"]) === "#fafafa"
            ? "selected"
            : ""
        }
        rounded cursor-pointer hover:outline-darkcolor-400
        outline-transparent outline outline-offset-1 outline-2
        bg-gray-50`}
        title="White"
        onClick={() => updatingColor("#fafafa")}
      >
        &nbsp;
      </div>
      <div
        class={`
        h-7 aspect-square ${
          (selectedObjects()
            ? Array.isArray(selectedObjects())
              ? typeof selectedObjects()[0][property] === "string"
                ? selectedObjects()[0][property]
                : selectedObjects()[0][property]["fill"]
              : typeof selectedObjects()[property] === "string"
              ? selectedObjects()[property]
              : selectedObjects()[property]["fill"]
            : typeof styleProps()[property] === "string"
            ? styleProps()[property]
            : styleProps()[property]["fill"]) === "#4b5563"
            ? "selected"
            : ""
        }
        rounded cursor-pointer hover:outline-darkcolor-400
        outline-transparent outline outline-offset-1 outline-2
        bg-gray-600`}
        title="Gray"
        onClick={() => updatingColor("#4b5563")}
      >
        &nbsp;
      </div>
      <div
        class={`
        h-7 aspect-square ${
          (selectedObjects()
            ? Array.isArray(selectedObjects())
              ? typeof selectedObjects()[0][property] === "string"
                ? selectedObjects()[0][property]
                : selectedObjects()[0][property]["fill"]
              : typeof selectedObjects()[property] === "string"
              ? selectedObjects()[property]
              : selectedObjects()[property]["fill"]
            : typeof styleProps()[property] === "string"
            ? styleProps()[property]
            : styleProps()[property]["fill"]) === "#111827"
            ? "selected"
            : ""
        }
        rounded cursor-pointer hover:outline-darkcolor-400
        outline-transparent outline outline-offset-1 outline-2
        bg-gray-900`}
        title="Dark Gray"
        onClick={() => updatingColor("#111827")}
      >
        &nbsp;
      </div>
      <div
        class={`
        h-7 aspect-square ${
          (selectedObjects()
            ? Array.isArray(selectedObjects())
              ? typeof selectedObjects()[0][property] === "string"
                ? selectedObjects()[0][property]
                : selectedObjects()[0][property]["fill"]
              : typeof selectedObjects()[property] === "string"
              ? selectedObjects()[property]
              : selectedObjects()[property]["fill"]
            : typeof styleProps()[property] === "string"
            ? styleProps()[property]
            : styleProps()[property]["fill"]) === "#f472b6"
            ? "selected"
            : ""
        }
        rounded cursor-pointer hover:outline-darkcolor-400
        outline-transparent outline outline-offset-1 outline-2
        bg-pink-400`}
        title="Pink"
        onClick={() => updatingColor("#f472b6")}
      >
        &nbsp;
      </div>
      <div
        class={`
        h-7 aspect-square ${
          (selectedObjects()
            ? Array.isArray(selectedObjects())
              ? typeof selectedObjects()[0][property] === "string"
                ? selectedObjects()[0][property]
                : selectedObjects()[0][property]["fill"]
              : typeof selectedObjects()[property] === "string"
              ? selectedObjects()[property]
              : selectedObjects()[property]["fill"]
            : typeof styleProps()[property] === "string"
            ? styleProps()[property]
            : styleProps()[property]["fill"]) === "#f87171"
            ? "selected"
            : ""
        }
        rounded cursor-pointer hover:outline-darkcolor-400
        outline-transparent outline outline-offset-1 outline-2
        bg-red-400`}
        title="Red"
        onClick={() => updatingColor("#f87171")}
      >
        &nbsp;
      </div>
      <div
        class={`
        h-7 aspect-square ${
          (selectedObjects()
            ? Array.isArray(selectedObjects())
              ? typeof selectedObjects()[0][property] === "string"
                ? selectedObjects()[0][property]
                : selectedObjects()[0][property]["fill"]
              : typeof selectedObjects()[property] === "string"
              ? selectedObjects()[property]
              : selectedObjects()[property]["fill"]
            : typeof styleProps()[property] === "string"
            ? styleProps()[property]
            : styleProps()[property]["fill"]) === "#fb923c"
            ? "selected"
            : ""
        }
        rounded cursor-pointer hover:outline-darkcolor-400
        outline-transparent outline outline-offset-1 outline-2
        bg-orange-400`}
        title="Orange"
        onClick={() => updatingColor("#fb923c")}
      >
        &nbsp;
      </div>
      <div
        class={`
        h-7 aspect-square ${
          (selectedObjects()
            ? Array.isArray(selectedObjects())
              ? typeof selectedObjects()[0][property] === "string"
                ? selectedObjects()[0][property]
                : selectedObjects()[0][property]["fill"]
              : typeof selectedObjects()[property] === "string"
              ? selectedObjects()[property]
              : selectedObjects()[property]["fill"]
            : typeof styleProps()[property] === "string"
            ? styleProps()[property]
            : styleProps()[property]["fill"]) === "#fcd34d"
            ? "selected"
            : ""
        }
        rounded cursor-pointer hover:outline-darkcolor-400
        outline-transparent outline outline-offset-1 outline-2
        bg-amber-300`}
        title="Yellow"
        onClick={() => updatingColor("#fcd34d")}
      >
        &nbsp;
      </div>
      <div
        class={`
        h-7 aspect-square ${
          (selectedObjects()
            ? Array.isArray(selectedObjects())
              ? typeof selectedObjects()[0][property] === "string"
                ? selectedObjects()[0][property]
                : selectedObjects()[0][property]["fill"]
              : typeof selectedObjects()[property] === "string"
              ? selectedObjects()[property]
              : selectedObjects()[property]["fill"]
            : typeof styleProps()[property] === "string"
            ? styleProps()[property]
            : styleProps()[property]["fill"]) === "#2563eb"
            ? "selected"
            : ""
        }
        rounded cursor-pointer hover:outline-darkcolor-400
        outline-transparent outline outline-offset-1 outline-2
        bg-blue-600`}
        title="Dark Blue"
        onClick={() => updatingColor("#2563eb")}
      >
        &nbsp;
      </div>
      <div
        class={`
        h-7 aspect-square ${
          (selectedObjects()
            ? Array.isArray(selectedObjects())
              ? typeof selectedObjects()[0][property] === "string"
                ? selectedObjects()[0][property]
                : selectedObjects()[0][property]["fill"]
              : typeof selectedObjects()[property] === "string"
              ? selectedObjects()[property]
              : selectedObjects()[property]["fill"]
            : typeof styleProps()[property] === "string"
            ? styleProps()[property]
            : styleProps()[property]["fill"]) === "#60a5fa"
            ? "selected"
            : ""
        }
        rounded cursor-pointer hover:outline-darkcolor-400
        outline-transparent outline outline-offset-1 outline-2
        bg-blue-400`}
        title="Blue"
        onClick={() => updatingColor("#60a5fa")}
      >
        &nbsp;
      </div>
      <div
        class={`
        h-7 aspect-square ${
          (selectedObjects()
            ? Array.isArray(selectedObjects())
              ? typeof selectedObjects()[0][property] === "string"
                ? selectedObjects()[0][property]
                : selectedObjects()[0][property]["fill"]
              : typeof selectedObjects()[property] === "string"
              ? selectedObjects()[property]
              : selectedObjects()[property]["fill"]
            : typeof styleProps()[property] === "string"
            ? styleProps()[property]
            : styleProps()[property]["fill"]) === "#818cf8"
            ? "selected"
            : ""
        }
        rounded cursor-pointer hover:outline-darkcolor-400
        outline-transparent outline outline-offset-1 outline-2
        bg-indigo-400`}
        title="Indigo"
        onClick={() => updatingColor("#818cf8")}
      >
        &nbsp;
      </div>
      <div
        class={`
        h-7 aspect-square ${
          (selectedObjects()
            ? Array.isArray(selectedObjects())
              ? typeof selectedObjects()[0][property] === "string"
                ? selectedObjects()[0][property]
                : selectedObjects()[0][property]["fill"]
              : typeof selectedObjects()[property] === "string"
              ? selectedObjects()[property]
              : selectedObjects()[property]["fill"]
            : typeof styleProps()[property] === "string"
            ? styleProps()[property]
            : styleProps()[property]["fill"]) === "#a855f7"
            ? "selected"
            : ""
        }
        rounded cursor-pointer hover:outline-darkcolor-400
        outline-transparent outline outline-offset-1 outline-2
        bg-purple-500`}
        title="Purple"
        onClick={() => updatingColor("#a855f7")}
      >
        &nbsp;
      </div>
      <div
        class={`
        h-7 aspect-square ${
          (selectedObjects()
            ? Array.isArray(selectedObjects())
              ? typeof selectedObjects()[0][property] === "string"
                ? selectedObjects()[0][property]
                : selectedObjects()[0][property]["fill"]
              : typeof selectedObjects()[property] === "string"
              ? selectedObjects()[property]
              : selectedObjects()[property]["fill"]
            : typeof styleProps()[property] === "string"
            ? styleProps()[property]
            : styleProps()[property]["fill"]) === "#4ade80"
            ? "selected"
            : ""
        }
        rounded cursor-pointer hover:outline-darkcolor-400
        outline-transparent outline outline-offset-1 outline-2
        bg-green-400`}
        title="Green"
        onClick={() => updatingColor("#4ade80")}
      >
        &nbsp;
      </div>
      <div
        class={`
        h-7 aspect-square ${
          (selectedObjects()
            ? Array.isArray(selectedObjects())
              ? typeof selectedObjects()[0][property] === "string"
                ? selectedObjects()[0][property]
                : selectedObjects()[0][property]["fill"]
              : typeof selectedObjects()[property] === "string"
              ? selectedObjects()[property]
              : selectedObjects()[property]["fill"]
            : typeof styleProps()[property] === "string"
            ? styleProps()[property]
            : styleProps()[property]["fill"]) === "#a7f3d0"
            ? "selected"
            : ""
        }
        rounded cursor-pointer hover:outline-darkcolor-400
        outline-transparent outline outline-offset-1 outline-2
        bg-emerald-200`}
        title="Lime"
        onClick={() => updatingColor("#a7f3d0")}
      >
        &nbsp;
      </div>
      <div
        class={`
        h-7 aspect-square ${
          (selectedObjects()
            ? Array.isArray(selectedObjects())
              ? typeof selectedObjects()[0][property] === "string"
                ? selectedObjects()[0][property]
                : selectedObjects()[0][property]["fill"]
              : typeof selectedObjects()[property] === "string"
              ? selectedObjects()[property]
              : selectedObjects()[property]["fill"]
            : typeof styleProps()[property] === "string"
            ? styleProps()[property]
            : styleProps()[property]["fill"]) === "#5eead4"
            ? "selected"
            : ""
        }
        rounded cursor-pointer hover:outline-darkcolor-400
        outline-transparent outline outline-offset-1 outline-2
        bg-teal-300`}
        title="Teal"
        onClick={() => updatingColor("#5eead4")}
      >
        &nbsp;
      </div>
      <div
        class={`
        h-7 aspect-square ${
          (selectedObjects()
            ? Array.isArray(selectedObjects())
              ? typeof selectedObjects()[0][property] === "string"
                ? selectedObjects()[0][property]
                : selectedObjects()[0][property]["fill"]
              : typeof selectedObjects()[property] === "string"
              ? selectedObjects()[property]
              : selectedObjects()[property]["fill"]
            : typeof styleProps()[property] === "string"
            ? styleProps()[property]
            : styleProps()[property]["fill"]) === "#0d9488"
            ? "selected"
            : ""
        }
        rounded cursor-pointer hover:outline-darkcolor-400
        outline-transparent outline outline-offset-1 outline-2
        bg-teal-600`}
        title="Dark Teal"
        onClick={() => updatingColor("#0d9488")}
      >
        &nbsp;
      </div>
    </div>
  );
}
