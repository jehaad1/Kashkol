import { createEffect, createSignal, onMount } from "solid-js";
import CanvasFlow from "../../../canvasFlow";

import { isMobile, getTouch, setTouch, getPosition } from "./utils/main";
import { handleKeyDown, handleResize } from "./events/main";

import "./Sketch.css";
import Toolbar from "./components/Bars/Toolbar";
import Stylebar from "./components/Bars/Stylebar";
import Sidebar, { setIsSidebarOpened } from "./components/Bars/Sidebar";

import { drawDragger, isCursorOnDragger } from "./utils/dragger";
import onMouseDown from "./functions/mouseDown";
import onMouseMove from "./functions/mouseMove";
import onMouseUp from "./functions/mouseUp";
import ClearSketchPopup from "./components/Popups/ClearSketch";
import ExportImagePopup from "./components/Popups/ExportImage";
import ImportSketchPopup from "./components/Popups/ImportSketch";
import onMouseClick from "./functions/mouseClick";
import Zoombar from "./components/Bars/Zoombar";
import Historybar from "./components/Bars/Historybar";

export const [clearCanvas, setClearCanvas] = createSignal(null);
export const [tool, setTool] = createSignal("hand");
export const [isDrawing, setIsDrawing] = createSignal(false);
export const [isTyping, setIsTyping] = createSignal(false);
export const [isLocked, setIsLocked] = createSignal(
  localStorage.isLocked || false
);
export const [isDragging, setIsDragging] = createSignal(false);
export const [side, setSide] = createSignal("");
export const [onText, setOnText] = createSignal("");
export const [styleProps, setStyleProps] = createSignal({
  fill: "transparent",
  stroke: {
    fill: "#fafafa",
    width: 2,
  },
  path: {
    fill: "#fafafa",
    size: 5,
  },
  font: {
    size: 24,
  },
  opacity: 1,
});
export const [startPoint, setStartPoint] = createSignal({});
export const [history, setHistory] = createSignal([]);
export const [currentAction, setCurrentAction] = createSignal(null);

export const [currentObject, setCurrentObject] = createSignal(null);
export const [selectedObjects, setSelectedObjects] = createSignal(null);
export const [erasedObjects, setErasedObjects] = createSignal([]);
export const [copiedObjects, setCopiedObjects] = createSignal([]);
export const [objects, setObjects] = createSignal([]);

export const [strokePoints, setStrokePoints] = createSignal([]);

export const [image, setImage] = createSignal(false);
export const [uploadImage, setUploadImage] = createSignal(null);

export const [canvasDoc, setCanvasDoc] = createSignal({});
export const [loading, setLoading] = createSignal(false);
let id = 0;
export const newId = () => id++;
export let myCanvas;

export default function App() {
  // const [focused, setFocused] = createSignal(false);
  // const [updateText, setUpdateText] = createSignal(null);
  // const [onText, setOnText] = createSignal(false);

  let canvas, textarea;

  // createEffect(() => {
  //   if (!onText()) return;
  //   setTimeout(() => textarea.focus(), 50);
  // });

  onMount(() => {
    myCanvas = new CanvasFlow(canvas, {
      defaultValues: {
        fill: "transparent",
      },
    });
    setHistory([]);
    if (localStorage.getItem("objects")) {
      let objs = [];
      try {
        objs = JSON.parse(localStorage.getItem("objects"));
        objs.forEach((obj) => {
          const id = newId();
          obj.id = id;
          obj.zIndex = id;
        });
        setObjects(objs);
        myCanvas.setObjects(objs);
      } catch (err) {
        localStorage.removeItem("objects");
      }
    }

    if (objects().length > 0) {
      handleResize(myCanvas, objects());
    }

    createEffect(() => {
      const obj = selectedObjects();
      drawDragger(obj);
    });

    createEffect(() => {
      setCurrentAction(history().length - 1);
    });

    setClearCanvas(() => {
      return function () {
        setIsDrawing(false);
        setCurrentObject(null);
        setObjects([]);
        setTool("cursor");
        myCanvas.clearCanvas();
        localStorage.removeItem("objects");
      };
    });
    setUploadImage(() => {
      return function (image) {
        const object = {
          id: newId(),
          zIndex: newId(),
          type: "image",
          x: 0,
          y: 0,
          width: image.naturalWidth,
          height: image.naturalHeight,
          url: image.src,
        };
        myCanvas.setObject(object).then(() => {
          setImage(true);
          setCurrentObject(object);
        });
        setObjects((objects) => [...objects, object]);
      };
    });

    let clickDate, isMoved;

    myCanvas.on(isMobile ? "touchstart" : "mousedown", (e) => {
      clickDate = Date.now();
      if (isLocked()) return;
      // if (focused()) {
      //   updateText()(textarea.value);
      //   textarea.value = "";
      //   return setFocused(false);
      // }
      if (isMobile) {
        e.preventDefault();
        setTouch(e.touches[0].identifier);
      }
      const { x, y } = getPosition(e);

      if (isDrawing()) {
        onMouseUp(x, y);
        setIsDrawing(false);
      } else {
        setIsDrawing(true);
        setStartPoint({ x, y });
        onMouseDown(x, y, e.objects);
      }
    });

    window.addEventListener(isMobile ? "touchmove" : "mousemove", (e) => {
      isMoved = true;
      if (isLocked()) return;
      if (tool() === "eraser" || tool() === "hand" || tool() === "cursor")
        return;
      const { x, y } = getPosition(e, "changedTouches");
      isCursorOnDragger(x, y, e.objects);
      if (isMobile && e.touches[0].identifier !== getTouch()) return;
      if ((!isDrawing() && !image()) || tool() === "text") return;
      onMouseMove(x, y);
    });

    myCanvas.on(isMobile ? "touchmove" : "mousemove", (e) => {
      isMoved = true;
      if (tool() !== "eraser" && tool() !== "hand" && tool() !== "cursor")
        return;
      const { x, y } = getPosition(e, "changedTouches");
      if (tool() === "eraser") {
        myCanvas.setObject({
          id: "cursor",
          zIndex: Infinity,
          type: "circle",
          x,
          y,
          width: 12,
          height: 12,
          fill: "transparent",
          stroke: {
            fill: "white",
            width: 1,
          },
        });
      }
      if (isLocked()) return;
      isCursorOnDragger(x, y, e.objects);
      if (isMobile && e.touches[0].identifier !== getTouch()) return;
      if (!isDrawing()) return;
      onMouseMove(
        x,
        y,
        e.objects.filter((obj) => !isNaN(obj.id))
      );
    });

    myCanvas.on(isMobile ? "touchcancel" : "mouseout", () => {
      myCanvas.deleteObject("cursor");
    });

    window.addEventListener(isMobile ? "touchend" : "mouseup", (e) => {
      isMoved = false;
      clickDate = Date.now() - clickDate;
      if (isLocked()) return;
      if (isMobile) {
        e.preventDefault();
        setTouch(e.changedTouches[0].identifier);
      }
      const { x, y } = getPosition(e, "changedTouches");
      setIsDrawing(false);
      onMouseUp(x, y);
    });

    myCanvas.on("click", (e) => {
      if (clickDate >= 200 || isMoved) return;
      if (isLocked()) return;
      // if (focused()) {
      //   updateText()(textarea.value);
      //   textarea.value = "";
      //   return setFocused(false);
      // }
      onMouseClick(e.objects);
    });

    document.onkeydown = handleKeyDown;
    window.onresize = () => handleResize(myCanvas, objects());
    // });
  });

  return (
    <>
      {/* <textarea
        ref={textarea}
        style={`
        font-size: ${styleProps().font.size}px;
        top: ${startPoint().y - 7}px;
        left: ${startPoint().x}px`}
        class={`
        absolute ${onText() ? "" : "hidden"}
        bg-transparent text-gray-50
        resize-none outline-none`}
        onFocus={() => setFocused(true)}
      ></textarea> */}
      <Sidebar />
      <Zoombar />
      <Historybar />
      <Toolbar
        tool={tool}
        setTool={setTool}
        isDrawing={isDrawing}
        image={image}
      />
      <Stylebar
        tool={tool}
        isDrawing={isDrawing}
        styleProps={styleProps}
        setStyleProps={setStyleProps}
        image={image}
      />
      <ClearSketchPopup clearCanvas={clearCanvas} />
      <ImportSketchPopup clearCanvas={clearCanvas} />
      <ExportImagePopup />
      <canvas
        class={
          image()
            ? "cursor-none"
            : tool() === "eraser"
            ? "cursor-none"
            : tool() === "hand"
            ? isDragging()
              ? "cursor-move"
              : side()
              ? ["left", "right"].includes(side())
                ? "cursor-ew-resize"
                : "cursor-ns-resize"
              : isDrawing()
              ? "cursor-grabbing"
              : "cursor-grab"
            : tool() === "cursor"
            ? "cursor-default"
            : "cursor-crosshair"
        }
        ref={canvas}
        width={window.innerWidth}
        height={window.innerHeight}
        onGesturestart={(e) => e.preventDefault()}
        onTouchStart={(e) => {
          if (e.touches.length > 1) e.preventDefault();
          setIsSidebarOpened(false);
        }}
        onClick={() => setIsSidebarOpened(false)}
        onMouseDown={() => setIsSidebarOpened(false)}
      ></canvas>
      {/* <input
        type="file"
        accept="image/*"
        class="hidden"
        onCancel={() => setTool("hand")}
        onChange={(e) => {
          const files = e.target.files;
          if (e.target.files.length === 0) return setTool("hand");
          const reader = new FileReader();

          reader.onload = function (event) {
            const img = new Image();

            img.onload = function () {
              uploadImage()(img);
            };

            img.src = event.target.result;
          };

          reader.readAsDataURL(files[0]);
        }}
      /> */}
      {loading() && (
        <div
          class="
          rtl
          fixed top-0 left-0 right-0 bottom-0
          flex items-center justify-center
          text-darkcolor-950 dark:text-white-950
          text-2xl font-medium
          z-[100] bg-darkcolor-950/10 dark:bg-darkcolor-950/20"
        >
          يتم تحميل الرسمة..
        </div>
      )}
    </>
  );
}
