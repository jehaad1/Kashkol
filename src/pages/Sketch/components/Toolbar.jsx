import { isLocked, setIsLocked, setSelectedObjects } from "../App";
import {
  FaRegularHand,
  FaRegularSquare,
  FaSolidPen,
  FaSolidImage,
  FaRegularCircle,
  FaSolidPenNib,
} from "solid-icons/fa";
import { FaSolidEraser } from "solid-icons/fa";
import { setIsSidebarOpened } from "./Sidebar";
import { BiSolidLockOpen, BiSolidLock, BiRegularText } from "solid-icons/bi";
import { AiFillHighlight } from "solid-icons/ai";

export default function Toolbar(props) {
  const { tool, setTool, isDrawing, image } = props;
  return (
    <div
      class="
      pointer-events-none
      fixed top-5 max-sm:top-0
      w-screen
      flex items-center justify-center"
      onClick={() => {
        setIsSidebarOpened(false);
        setSelectedObjects(null);
      }}
      onMouseDown={() => {
        setIsSidebarOpened(false);
        setSelectedObjects(null);
      }}
    >
      <div
        class={`
        ${image() || isDrawing() ? "hidden" : ""}
        max-sm:w-full
        sm:rounded-lg`}
      >
        <div
          class={`
          pointer-events-auto
          ${image() || isDrawing() ? "hidden" : ""}
          max-sm:w-full
          flex gap-2 p-0.5 select-none
          items-center justify-center bg-white-950 dark:bg-darkcolor-800
          shadow-lg sm:rounded-lg`}
        >
          <div
            class="
            flex gap-1 p-0.5
            items-center justify-center"
          >
            <button
              class={`
              rounded-lg outline-none hover:bg-darkcolor-400/10 transition-colors
              text-lg w-[40px] h-[40px] inline-flex items-center justify-center
              ${isLocked() ? "!bg-darkcolor-400/50" : ""}`}
              onClick={() => {
                setIsLocked(!isLocked());
                localStorage.setItem("isLocked", isLocked() ? "locked" : "");
              }}
              title={isLocked() ? "Unlock" : "Lock"}
            >
              {isLocked() ? (
                <BiSolidLock class="fill-darkcolor-800 dark:fill-white-950" />
              ) : (
                <BiSolidLockOpen class="fill-darkcolor-800 dark:fill-white-950" />
              )}
            </button>
            <div
              class="
              bg-darkcolor-800/30 dark:bg-darkcolor-100/5 mx-2
              h-7 w-[0.2px]"
            ></div>
            <button
              class={`
              rounded-lg outline-none hover:bg-darkcolor-400/10 transition-colors
              w-[40px] h-[40px] inline-flex items-center justify-center
              ${tool() === "hand" ? "!bg-darkcolor-400/50" : ""}
              text-sm`}
              onClick={() => setTool("hand")}
              title="Hand"
            >
              <FaRegularHand class="fill-darkcolor-800 dark:fill-white-950" />
            </button>
            <button
              class={`
              rounded-lg outline-none hover:bg-darkcolor-400/10 transition-colors
              w-[40px] h-[40px] inline-flex items-center justify-center
              ${tool() === "cursor" ? "!bg-darkcolor-400/50" : ""}
              text-sm`}
              onClick={() => setTool("cursor")}
              title="Cursor"
            >
              <svg
                height="1em"
                width="1em"
                viewBox="0 0 320 512"
                class="fill-darkcolor-800 dark:fill-white-950"
              >
                <path d="M0 55.2V426c0 12.2 9.9 22 22 22c6.3 0 12.4-2.7 16.6-7.5L121.2 346l58.1 116.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9L179.8 320H297.9c12.2 0 22.1-9.9 22.1-22.1c0-6.3-2.7-12.3-7.4-16.5L38.6 37.9C34.3 34.1 28.9 32 23.2 32C10.4 32 0 42.4 0 55.2z" />
              </svg>
            </button>
            <button
              class={`
              rounded-lg outline-none hover:bg-darkcolor-400/10 transition-colors
              w-[40px] h-[40px] inline-flex items-center justify-center
              ${tool() === "rectangle" ? "!bg-darkcolor-400/50" : ""}
              text-sm`}
              onClick={() => setTool("rectangle")}
              title="Rectangle"
            >
              <FaRegularSquare class="fill-darkcolor-800 dark:fill-white-950" />
            </button>
            <button
              class={`
              rounded-lg outline-none hover:bg-darkcolor-400/10 transition-colors
              w-[40px] h-[40px] inline-flex items-center justify-center
              ${tool() === "circle" ? "!bg-darkcolor-400/50" : ""}
              text-sm`}
              onClick={() => setTool("circle")}
              title="Circle"
            >
              <FaRegularCircle class="fill-darkcolor-800 dark:fill-white-950" />
            </button>
            <button
              class={`
              rounded-lg outline-none hover:bg-darkcolor-400/10 transition-colors
              w-[40px] h-[40px] inline-flex items-center justify-center
              ${tool() === "text" ? "!bg-darkcolor-400/50" : ""}
              text-lg`}
              onClick={() => setTool("text")}
            >
              <BiRegularText class="fill-darkcolor-800 dark:fill-white-950" />
            </button>
            <button
              class={`
              rounded-lg outline-none hover:bg-darkcolor-400/10 transition-colors
              w-[40px] h-[40px] inline-flex items-center justify-center
              ${tool() === "eraser" ? "!bg-darkcolor-400/50" : ""}
              text-lg`}
              onClick={() => setTool("eraser")}
              title="Eraser"
            >
              <FaSolidEraser class="fill-darkcolor-800 dark:fill-white-950" />
            </button>
            <button
              class={`
              rounded-lg outline-none hover:bg-darkcolor-400/10 transition-colors
              w-[40px] h-[40px] inline-flex items-center justify-center
              ${tool() === "pen" ? "!bg-darkcolor-400/50" : ""}
              }
              text-sm`}
              onClick={() => setTool("pen")}
              title="Pen"
            >
              <FaSolidPenNib class="fill-darkcolor-800 dark:fill-white-950" />
            </button>
            <button
              class={`
              rounded-lg outline-none hover:bg-darkcolor-400/10 transition-colors
              w-[40px] h-[40px] inline-flex items-center justify-center
              ${tool() === "pencil" ? "!bg-darkcolor-400/50" : ""}
              text-sm`}
              onClick={() => setTool("pencil")}
              title="Pencil"
            >
              <FaSolidPen class="fill-darkcolor-800 dark:fill-white-950" />
            </button>
            <button
              class={`
              rounded-lg outline-none hover:bg-darkcolor-400/10 transition-colors
              w-[40px] h-[40px] inline-flex items-center justify-center
              ${tool() === "highlighter" ? "!bg-darkcolor-400/50" : ""}
              text-lg`}
              onClick={() => setTool("highlighter")}
              title="Highlighter"
            >
              <AiFillHighlight class="fill-darkcolor-800 dark:fill-white-950" />
            </button>
            <button
              class={`
              rounded-lg outline-none hover:bg-darkcolor-400/10 transition-colors
              w-[40px] h-[40px] inline-flex items-center justify-center
              ${tool() === "image" ? "!bg-darkcolor-400/50" : ""}
              text-sm`}
              onClick={() => {
                document.querySelector("input[type=file]").click();
                setTool("image");
              }}
              title="Image"
            >
              <FaSolidImage class="fill-darkcolor-800 dark:fill-white-950" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
