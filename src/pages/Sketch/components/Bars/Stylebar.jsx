import {
  image,
  isDrawing,
  isTyping,
  setIsTyping,
  setSelectedObjects,
  selectedObjects,
  setStyleProps,
  styleProps,
  tool,
  myCanvas,
  setObjects,
  objects,
  setHistory,
} from "../../App";
import saveObjects from "../../utils/saveObjects";
import ColorPicker from "../ColorPicker";
import { setIsSidebarOpened } from "./Sidebar";

export default function Stylebar() {
  return (
    <div
      class="
        pointer-events-none
        fixed top-32 left-5"
      onClick={() => setIsSidebarOpened(false)}
      onMouseDown={() => setIsSidebarOpened(false)}
    >
      {(selectedObjects() ||
        !["image", "eraser", "hand", "cursor"].includes(tool())) && (
        <div
          class={`
          ${isDrawing() ? "hidden" : ""}
          max-sm:w-full
          sm:rounded-lg`}
        >
          <div
            class={`
          pointer-events-auto
          ${isDrawing() ? "hidden" : ""}
          max-sm:w-full w-[190px]
          flex flex-col gap-5
          p-4 pb-7 select-none
          items-start justify-center bg-white-950 dark:bg-darkcolor-800
          shadow-lg sm:rounded-lg`}
          >
            {Array.isArray(selectedObjects())
              ? selectedObjects().some((o) => ["line", "path"].includes(o.type))
              : !["line", "path"].includes(selectedObjects()) &&
                !["pencil", "pen", "highlighter"].includes(tool()) && (
                  <div class="flex flex-col gap-3">
                    <h1 class="text-xs text-darkcolor-800 dark:text-white-950">
                      Fill
                    </h1>
                    <ColorPicker property="fill" />
                  </div>
                )}
            <div
              class="
                  flex flex-col gap-3"
            >
              <h1 class="text-xs text-darkcolor-800 dark:text-white-950">
                Stroke
              </h1>
              <ColorPicker property="stroke" />
            </div>
            <div class="flex flex-col gap-1 w-full">
              <h1 class="text-xs text-darkcolor-800 dark:text-white-950">
                Stroke Width
              </h1>
              <input
                class="outline-none"
                type="range"
                title={propertyValue(
                  "stroke.width",
                  selectedObjects,
                  true,
                  styleProps().stroke.width
                )}
                min="0"
                max="20"
                step="1"
                value={propertyValue(
                  "stroke.width",
                  selectedObjects,
                  true,
                  styleProps().stroke.width
                )}
                onMouseUp={selectAllText}
                onTouchEnd={selectAllText}
                onInput={(e) =>
                  updateProperty(
                    "stroke.width",
                    e.target,
                    selectedObjects,
                    true,
                    styleProps().stroke.width
                  )
                }
                onChange={(e) =>
                  updateProperty(
                    "stroke.width",
                    e.target,
                    selectedObjects,
                    true,
                    styleProps().stroke.width
                  )
                }
              />
            </div>
            {tool() !== "highlighter" && (
              <div
                class="
                flex flex-col gap-1 w-full"
              >
                <h1 class="text-xs text-darkcolor-800 dark:text-white-950">
                  Opacity
                </h1>
                <input
                  class="outline-none"
                  type="range"
                  title={propertyValue(
                    "opacity",
                    selectedObjects,
                    true,
                    myCanvas.defaultValues.get("opacity")
                  )}
                  min="0"
                  max="1"
                  step="0.05"
                  value={propertyValue(
                    "opacity",
                    selectedObjects,
                    true,
                    styleProps().opacity
                  )}
                  onMouseUp={selectAllText}
                  onTouchEnd={selectAllText}
                  onInput={(e) =>
                    updateProperty(
                      "opacity",
                      e.target,
                      selectedObjects,
                      true,
                      styleProps().opacity
                    )
                  }
                  onChange={(e) =>
                    updateProperty(
                      "opacity",
                      e.target,
                      selectedObjects,
                      true,
                      styleProps().opacity
                    )
                  }
                />
              </div>
            )}
            {selectedObjects() && tool() === "cursor" && (
              <div class="grid grid-cols-2 gap-3">
                <div
                  class="
                  flex flex-col gap-3"
                >
                  <div
                    class={`${
                      isTyping() === "rotation"
                        ? "bg-darkcolor-800/5 dark:bg-white-950/5"
                        : ""
                    }
                  flex items-center gap-2 hover:bg-darkcolor-800/5 dark:hover:bg-white-950/5 w-[73px] p-1 rounded-md`}
                    title="Rotation"
                  >
                    <label for="rotation">
                      <svg class="w-3 h-3" viewBox="0 0 8 8">
                        <path
                          class="fill-darkcolor-800 dark:fill-white-950"
                          fill-opacity="1"
                          fill-rule="evenodd"
                          stroke="none"
                          d="M0 0v8h8V7H5c0-2.21-1.79-4-4-4V0H0zm1 4v3h3c0-1.657-1.343-3-3-3z"
                        ></path>
                      </svg>
                    </label>
                    <input
                      value={propertyValue(
                        "rotation",
                        selectedObjects,
                        false,
                        styleProps().rotation
                      )}
                      class="bg-transparent inline-block w-[40px] outline-none text-darkcolor-800 dark:text-white-950 text-sm selection:bg-darkcolor-400 selection:text-white-950"
                      type="text"
                      id="rotation"
                      onChange={(e) =>
                        updateProperty(
                          "rotation",
                          e.target,
                          selectedObjects,
                          false,
                          styleProps().rotation
                        )
                      }
                      onMouseUp={selectAllText}
                      onTouchEnd={selectAllText}
                      onFocus={() => setIsTyping("rotation")}
                      onBlur={() =>
                        isTyping() === "rotation" ? setIsTyping(null) : ""
                      }
                    />
                  </div>
                </div>
                <div
                  class="
                  flex flex-col gap-3"
                >
                  <div
                    class={`${
                      isTyping() === "borderRadius"
                        ? "bg-darkcolor-800/5 dark:bg-white-950/5"
                        : ""
                    }
                  flex items-center gap-2 hover:bg-darkcolor-800/5 dark:hover:bg-white-950/5 w-[73px] p-1 rounded-md`}
                    title="Border Radius"
                  >
                    <label for="borderRadius">
                      <svg
                        stroke-width="3"
                        class="w-3 h-3 text-darkcolor-800 dark:text-white-950"
                        viewBox="0 0 20 20"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        color="currentColor"
                        style="overflow: visible;"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M5 19v-6a8 8 0 0 1 8 -8h6"></path>
                      </svg>
                    </label>
                    <input
                      value={propertyValue(
                        "borderRadius",
                        selectedObjects,
                        false,
                        styleProps().borderRadius
                      )}
                      class="bg-transparent inline-block w-[40px] outline-none text-darkcolor-800 dark:text-white-950 text-sm selection:bg-darkcolor-400 selection:text-white-950"
                      type="text"
                      id="borderRadius"
                      onChange={(e) =>
                        updateProperty(
                          "borderRadius",
                          e.target,
                          selectedObjects,
                          false,
                          styleProps().borderRadius
                        )
                      }
                      onMouseUp={selectAllText}
                      onTouchEnd={selectAllText}
                      onFocus={() => setIsTyping("borderRadius")}
                      onBlur={() =>
                        isTyping() === "borderRadius" ? setIsTyping(null) : ""
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function updateProperty(
  propName,
  target,
  selectedObjects,
  isSlider,
  defaultValue
) {
  const number = target.value.match(/[-+]?[0-9]*\.?[0-9]+/);
  if (!selectedObjects()) {
    if (!number) return (target.value = defaultValue ?? 0);
    if (propName.includes(".")) {
      const [prop, subProp] = propName.split(".");
      myCanvas.defaultValues.set(prop, {
        ...myCanvas.defaultValues.get(prop),
        [subProp]: +number[0],
      });
      setStyleProps((props) => {
        return {
          ...props,
          [prop]: {
            ...props[prop],
            [subProp]: +number[0],
          },
        };
      });
    } else {
      myCanvas.defaultValues.set(propName, +number[0]);
      setStyleProps((props) => {
        return {
          ...props,
          [propName]: +number[0],
        };
      });
    }
    return (target.value = +number[0]);
  }
  if (!propName.includes(".")) {
    if (!number)
      return (target.value = isSlider
        ? (Array.isArray(selectedObjects())
            ? Math.min(...selectedObjects().map((o) => o[propName]))
            : selectedObjects()[propName]) ?? 0
        : Array.isArray(selectedObjects())
        ? selectedObjects()
            .map((o) => o[propName])
            .every((val, i, arr) => val === arr[0])
          ? `${selectedObjects()[0][propName]}`
          : "Mixed"
        : `${selectedObjects()[propName] ?? 0}`);
    if (!selectedObjects()) return;
    const propValue = +number[0];

    if (Array.isArray(selectedObjects())) {
      selectedObjects().forEach((obj) => {
        myCanvas.updateObject(obj.id, {
          [propName]: propValue,
        });
      });
      setHistory((history) => {
        const newHistory = [...history];
        newHistory.push({
          action: "update",
          objects: selectedObjects().map((obj) => ({
            ...obj,
            [propName]: propValue,
          })),
          beforeUpdateObjects: selectedObjects(),
        });
        return newHistory;
      });
      setSelectedObjects((objs) => {
        return objs.map((obj) => ({
          ...obj,
          [propName]: propValue,
        }));
      });
    } else {
      myCanvas.updateObject(selectedObjects().id, {
        [propName]: propValue,
      });
      setHistory((history) => {
        const newHistory = [...history];
        newHistory.push({
          action: "update",
          objects: [
            {
              ...selectedObjects(),
              [propName]: propValue,
            },
          ],
          beforeUpdateObjects: [selectedObjects()],
        });
        return newHistory;
      });
      setSelectedObjects({
        ...selectedObjects(),
        [propName]: propValue,
      });
    }
    saveObjects();
    target.value = propValue;
  } else {
    const [prop, subProp] = propName.split(".");
    if (!number)
      return (target.value = isSlider
        ? (Array.isArray(selectedObjects())
            ? Math.min(...selectedObjects().map((o) => o[prop][subProp]))
            : selectedObjects()[prop][subProp]) ?? 0
        : Array.isArray(selectedObjects())
        ? selectedObjects()
            .map((o) => o[prop][subProp])
            .every((val, i, arr) => val === arr[0])
          ? `${selectedObjects()[0][prop][subProp]}`
          : "Mixed"
        : `${selectedObjects()[prop][subProp] ?? 0}`);
    if (!selectedObjects()) return;
    const propValue = +number[0];
    if (Array.isArray(selectedObjects())) {
      selectedObjects().forEach((obj) => {
        myCanvas.updateObject(obj.id, {
          [prop]: {
            ...obj[prop],
            [subProp]: propValue,
          },
        });
      });
      setHistory((history) => {
        const newHistory = [...history];
        newHistory.push({
          action: "update",
          objects: selectedObjects().map((obj) => ({
            ...obj,
            [prop]: {
              ...obj[prop],
              [subProp]: propValue,
            },
          })),
          beforeUpdateObjects: selectedObjects(),
        });
        return newHistory;
      });
      setSelectedObjects((objs) => {
        return objs.map((obj) => ({
          ...obj,
          [prop]: {
            ...obj[prop],
            [subProp]: propValue,
          },
        }));
      });
    } else {
      myCanvas.updateObject(selectedObjects().id, {
        [prop]: {
          ...selectedObjects()[prop],
          [subProp]: propValue,
        },
      });
      setHistory((history) => {
        const newHistory = [...history];
        newHistory.push({
          action: "update",
          objects: [
            {
              ...selectedObjects(),
              [prop]: {
                ...selectedObjects()[prop],
                [subProp]: propValue,
              },
            },
          ],
          beforeUpdateObjects: [selectedObjects()],
        });
        return newHistory;
      });
      setSelectedObjects({
        ...selectedObjects(),
        [prop]: {
          ...selectedObjects()[prop],
          [subProp]: propValue,
        },
      });
    }
    saveObjects();
    target.value = propValue;
  }
}

function propertyValue(propName, selectedObjects, isSlider, defaultValue) {
  if (!selectedObjects()) return defaultValue ?? 0;
  if (propName.includes(".")) {
    const [prop, subProp] = propName.split(".");
    return isSlider
      ? (Array.isArray(selectedObjects())
          ? Math.min(
              ...selectedObjects().map((o) => (o[prop] ? +o[prop][subProp] : 0))
            )
          : selectedObjects()[prop][subProp]) ?? 0
      : Array.isArray(selectedObjects())
      ? selectedObjects()
          .map((o) => (o[prop] ? o[prop][subProp] : 0))
          .every((val, i, arr) => val === arr[0])
        ? `${
            selectedObjects()[0][prop] ? selectedObjects()[0][prop][subProp] : 0
          }`
        : "Mixed"
      : `${selectedObjects()[prop] ? selectedObjects()[prop][subProp] : 0}`;
  }
  return isSlider
    ? (Array.isArray(selectedObjects())
        ? Math.min(...selectedObjects().map((o) => +o[propName]))
        : selectedObjects()[propName]) ?? 0
    : Array.isArray(selectedObjects())
    ? selectedObjects()
        .map((o) => o[propName])
        .every((val, i, arr) => val === arr[0])
      ? `${selectedObjects()[0][propName] ?? 0}`
      : "Mixed"
    : `${selectedObjects()[propName] ?? 0}`;
}

function selectAllText(e) {
  const selection = window.getSelection().toString();
  if (isNaN(selection)) {
    e.target.select();
  }
}
