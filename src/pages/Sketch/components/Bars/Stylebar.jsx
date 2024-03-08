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
                  <div
                    class="
              flex flex-col gap-3"
                  >
                    <h1 class="text-xs text-darkcolor-800 dark:text-white-950">
                      Fill
                    </h1>
                    {/* <ColorPicker property="fill" /> */}
                  </div>
                )}
            <div
              class="
                  flex flex-col gap-3"
            >
              <h1 class="text-xs text-darkcolor-800 dark:text-white-950">
                Stroke
              </h1>
              {/* <ColorPicker property="stroke" /> */}
            </div>
            <div
              class="
                  flex flex-col gap-1 w-full"
            >
              <h1 class="text-xs text-darkcolor-800 dark:text-white-950">
                Stroke Width
              </h1>
              <input
                class="outline-none"
                type="range"
                title={
                  selectedObjects()
                    ? (Array.isArray(selectedObjects())
                        ? selectedObjects()[0]?.stroke?.width
                        : selectedObjects()?.stroke?.width) ??
                      styleProps().stroke.width
                    : styleProps().stroke.width
                }
                min="0"
                max="20"
                step="1"
                value={
                  selectedObjects()
                    ? (Array.isArray(selectedObjects())
                        ? selectedObjects()[0]?.stroke?.width
                        : selectedObjects()?.stroke?.width) ??
                      styleProps().stroke.width
                    : styleProps().stroke.width
                }
                onChange={(e) => {
                  if (!selectedObjects()) return;
                  if (Array.isArray(selectedObjects())) {
                    setHistory((history) => {
                      const newHistory = [...history];
                      newHistory.push({
                        action: "update",
                        objects: selectedObjects().map((obj) => ({
                          ...obj,
                          stroke: { ...obj.stroke, width: +e.target.value },
                        })),
                        beforeUpdateObjects: selectedObjects(),
                      });
                      return newHistory;
                    });
                  } else {
                    setHistory((history) => {
                      const newHistory = [...history];
                      newHistory.push({
                        action: "update",
                        objects: [
                          {
                            ...selectedObjects(),
                            stroke: {
                              ...selectedObjects().stroke,
                              width: +e.target.value,
                            },
                          },
                        ],
                        beforeUpdateObjects: [selectedObjects()],
                      });
                      return newHistory;
                    });
                  }
                }}
                onInput={(e) => {
                  if (selectedObjects()) {
                    if (Array.isArray(selectedObjects())) {
                      selectedObjects().forEach((obj) => {
                        myCanvas.updateObject(obj.id, {
                          stroke: {
                            ...obj.stroke,
                            width: +e.target.value,
                          },
                        });
                        setObjects((objs) => {
                          const index = objs.findIndex((o) => o.id === obj.id);
                          objs[index].stroke = {
                            ...objs[index].stroke,
                            width: +e.target.value,
                          };
                          return [...objs];
                        });
                      });
                      setSelectedObjects((objs) => {
                        return objs.map((obj) => ({
                          ...obj,
                          stroke: {
                            ...obj.stroke,
                            width: +e.target.value,
                          },
                        }));
                      });
                    } else {
                      const obj = selectedObjects();
                      myCanvas.updateObject(obj.id, {
                        stroke: {
                          ...obj.stroke,
                          width: +e.target.value,
                        },
                      });
                      setObjects((objs) => {
                        const index = objs.findIndex((o) => o.id === obj.id);
                        objs[index].stroke = {
                          ...obj.stroke,
                          width: +e.target.value,
                        };
                        return [...objs];
                      });
                      setSelectedObjects((obj) => {
                        return {
                          ...obj,
                          stroke: {
                            ...obj.stroke,
                            width: +e.target.value,
                          },
                        };
                      });
                    }
                    saveObjects();
                  } else {
                    setStyleProps((props) => ({
                      ...props,
                      stroke: { ...props.stroke, width: +e.target.value },
                    }));
                  }
                }}
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
                  title={
                    selectedObjects()
                      ? (Array.isArray(selectedObjects())
                          ? selectedObjects()[0]?.opacity
                          : selectedObjects()?.opacity) ?? styleProps().opacity
                      : styleProps().opacity
                  }
                  min="0"
                  max="1"
                  step="0.05"
                  value={
                    selectedObjects()
                      ? Array.isArray(selectedObjects())
                        ? selectedObjects()[0]?.opacity
                        : selectedObjects()?.opacity
                      : styleProps().opacity
                  }
                  onChange={(e) => {
                    if (!selectedObjects()) return;
                    if (Array.isArray(selectedObjects())) {
                      setHistory((history) => {
                        const newHistory = [...history];
                        newHistory.push({
                          action: "update",
                          objects: selectedObjects().map((obj) => ({
                            ...obj,
                            opacity: +e.target.value,
                          })),
                          beforeUpdateObjects: selectedObjects(),
                        });
                        return newHistory;
                      });
                    } else {
                      setHistory((history) => {
                        const newHistory = [...history];
                        newHistory.push({
                          action: "update",
                          objects: [
                            {
                              ...selectedObjects(),
                              opacity: +e.target.value,
                            },
                          ],
                          beforeUpdateObjects: [selectedObjects()],
                        });
                        return newHistory;
                      });
                    }
                  }}
                  onInput={(e) => {
                    if (selectedObjects()) {
                      if (Array.isArray(selectedObjects())) {
                        selectedObjects().forEach((obj) => {
                          myCanvas.updateObject(obj.id, {
                            opacity: +e.target.value,
                          });
                          setObjects((objs) => {
                            const index = objs.findIndex(
                              (o) => o.id === obj.id
                            );
                            objs[index].opacity = +e.target.value;
                            return [...objs];
                          });
                        });
                        setSelectedObjects((objs) => {
                          return objs.map((obj) => ({
                            ...obj,
                            opacity: +e.target.value,
                          }));
                        });
                      } else {
                        const obj = selectedObjects();
                        myCanvas.updateObject(obj.id, {
                          opacity: +e.target.value,
                        });
                        setObjects((objs) => {
                          const index = objs.findIndex((o) => o.id === obj.id);
                          objs[index].opacity = +e.target.value;
                          return [...objs];
                        });
                        setSelectedObjects((obj) => {
                          return {
                            ...obj,
                            opacity: +e.target.value,
                          };
                        });
                      }
                      localStorage.setItem(
                        "objects",
                        JSON.stringify(objects())
                      );
                    } else {
                      setStyleProps((props) => ({
                        ...props,
                        opacity: +e.target.value,
                      }));
                    }
                  }}
                  selectedObjects={selectedObjects()}
                />
              </div>
            )}
            {tool() === "cursor" && (
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
                      value={"0°"}
                      class="bg-transparent inline-block w-[40px] outline-none text-darkcolor-800 dark:text-white-950 text-sm selection:bg-darkcolor-400 selection:text-white-950"
                      type="text"
                      id="rotation"
                      onChange={(e) => {
                        const number =
                          e.target.value.match(/[-+]?[0-9]*\.?[0-9]+/)[0];
                        if (!number) return (e.target.value = "0°");
                        const rotation = +number % 360;
                        setStyleProps((props) => ({
                          ...props,
                          rotation,
                        }));
                        e.target.value = rotation + "°";
                      }}
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
                      value={2}
                      class="bg-transparent inline-block w-[40px] outline-none text-darkcolor-800 dark:text-white-950 text-sm selection:bg-darkcolor-400 selection:text-white-950"
                      type="text"
                      id="borderRadius"
                      onChange={(e) => {
                        const number =
                          e.target.value.match(/[-+]?[0-9]*\.?[0-9]+/)[0];
                        if (!number) return (e.target.value = "0");
                        const borderRadius = +number;
                        setStyleProps((props) => ({
                          ...props,
                          borderRadius,
                        }));
                        e.target.value = borderRadius;
                      }}
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
