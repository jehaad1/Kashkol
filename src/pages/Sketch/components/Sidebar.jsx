import { FaSolidBars } from "solid-icons/fa";
import { createSignal } from "solid-js";
import { ToggleDisplayMode, displayMode } from "../../../root";
import { isDrawing, objects, setSelectedObjects } from "../App";
import { CgSoftwareDownload } from "solid-icons/cg";
import { FaSolidMoon, FaSolidSun, FaRegularTrashCan } from "solid-icons/fa";
import { TbFileUpload } from "solid-icons/tb";
import { TbLogout } from "solid-icons/tb";
import { BiRegularImageAdd } from "solid-icons/bi";
import { setPopupVisibility as ExportImagePopup } from "./Popups/ExportImage";
import { setImportedSketch } from "./Popups/ImportSketch";
import { setPopupVisibility as ClearSketchPopup } from "./Popups/ClearSketch";

export const [isSidebarOpened, setIsSidebarOpened] = createSignal(false);
export default function Sidebar() {
  return (
    <div
      class="
      pointer-events-none
      fixed left-5 max-sm:left-0 top-5 max-sm:top-0
      w-[300px] z-50
      flex flex-col gap-2
      items-start justify-center"
      onClick={() => setSelectedObjects(null)}
      onMouseDown={() => setSelectedObjects(null)}
    >
      {!isDrawing() && (
        <div
          class="
          sm:rounded-lg"
        >
          <div
            class="
            pointer-events-auto
            aspect-square
            flex select-none
            items-center justify-center bg-white-950 dark:bg-darkcolor-800
            shadow-lg sm:rounded-lg"
          >
            <button
              class="
              rounded-lg outline-none
              p-3 text-md"
              onClick={() => setIsSidebarOpened(!isSidebarOpened())}
            >
              <FaSolidBars class="fill-darkcolor-800 dark:fill-white-950" />
            </button>
          </div>
        </div>
      )}
      {!isDrawing() && isSidebarOpened() && (
        <div
          class="
          sm:rounded-lg"
        >
          <div
            class="
            pointer-events-auto text-xs z-50 w-[200px]
            p-3 bg-white-950 dark:bg-darkcolor-800 text-darkcolor-800 dark:text-white-950
            flex flex-col items-start justify-center
            shadow-lg sm:rounded-lg"
          >
            <button
              class="flex gap-1 items-center justify-start px-1 py-2 w-full rounded-lg hover:bg-darkcolor-800/5 dark:hover:bg-white-950/5"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".kashkol";
                input.onchange = (e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const data = JSON.parse(e.target.result);
                    setImportedSketch([...data]);
                  };
                  reader.readAsText(file);
                };
                input.click();
              }}
            >
              <TbFileUpload class="w-1/4" size={21} />
              Import Sketch
            </button>
            <button
              class="flex gap-1 items-center justify-start px-1 py-2 w-full rounded-lg hover:bg-darkcolor-800/5 dark:hover:bg-white-950/5"
              onClick={() => ExportImagePopup(true)}
            >
              <BiRegularImageAdd class="w-1/4" size={21} />
              Export Image
            </button>
            <button
              class="flex gap-1 items-center justify-start px-1 py-2 w-full rounded-lg hover:bg-darkcolor-800/5 dark:hover:bg-white-950/5"
              onClick={() => {
                const a = document.createElement("a");
                a.href = URL.createObjectURL(
                  new Blob([JSON.stringify(objects())], {
                    type: "application/json",
                  })
                );
                a.download = "sketchName.kashkol";
                a.click();
              }}
            >
              <CgSoftwareDownload class="w-1/4" size={24} />
              Export as File
            </button>
            <button
              class="flex gap-1 items-center justify-start px-1 py-2 w-full rounded-lg text-red-400 hover:bg-darkcolor-800/5 dark:hover:bg-white-950/5"
              onClick={() => ClearSketchPopup(true)}
            >
              <FaRegularTrashCan class="w-1/4" size={16} />
              Delete Sketch
            </button>
            <hr class="w-full my-3 opacity-15 bg-darkcolor-800 dark:bg-white-950/5" />
            <button
              class="flex gap-1 items-center justify-start px-1 py-2 w-full rounded-lg hover:bg-darkcolor-800/5 dark:hover:bg-white-950/5"
              onClick={() => ToggleDisplayMode()}
            >
              {displayMode() === "dark" ? (
                <FaSolidSun class="w-1/4" size={18} />
              ) : (
                <FaSolidMoon class="w-1/4" size={18} />
              )}
              {displayMode() === "dark" ? "Light" : "Dark"} Mode
            </button>
            <button class="flex gap-1 items-center justify-start px-1 py-2 w-full rounded-lg text-red-400 hover:bg-darkcolor-800/5 dark:hover:bg-white-950/5">
              <TbLogout class="w-1/4" size={21} />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
