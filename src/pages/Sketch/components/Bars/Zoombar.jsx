import { FaSolidMinus, FaSolidPlus } from "solid-icons/fa";
import { createSignal } from "solid-js";
import { myCanvas } from "../../App";

export const [zoom, setZoom] = createSignal(100);
export function zoomIn() {
  setZoom(zoom() + 10);
  myCanvas.defaultValues.scale = zoom() / 100;
  myCanvas.setObjects(
    myCanvas.getObjects().map((obj) => {
      return { ...obj, scale: zoom() / 100 };
    })
  );
}
export function zoomOut() {
  if (zoom() <= 10) return;
  setZoom(zoom() - 10);
  myCanvas.defaultValues.scale = zoom() / 100;
  myCanvas.setObjects(
    myCanvas.getObjects().map((obj) => {
      return { ...obj, scale: zoom() / 100 };
    })
  );
}
export function resetZoom() {
  setZoom(100);
  myCanvas.defaultValues.scale = 1;
  myCanvas.setObjects(
    myCanvas.getObjects().map((obj) => {
      return { ...obj, scale: 1 };
    })
  );
}

export default function Zoombar() {
  return (
    <>
      <div
        class="
        pointer-events-none ltr
        fixed bottom-5 left-5
        flex items-center justify-center"
      >
        <div
          class="
          pointer-events-auto
          max-sm:w-full
          flex gap-2 select-none
          items-center justify-center bg-white-950 dark:bg-darkcolor-800
          shadow-lg sm:rounded-lg"
        >
          <button
            class="
            rounded-l-lg outline-none hover:bg-darkcolor-400/10 transition-colors
            text-lg w-[40px] h-[40px] inline-flex items-center justify-center"
            title="Zoom out"
            onClick={() => zoomOut()}
          >
            <FaSolidMinus class="fill-darkcolor-800 dark:fill-white-950" />
          </button>
          <button
            class="
            w-[60px] text-center
            text-sm text-darkcolor-800 dark:text-white-950"
            title="Reset zoom"
            onClick={() => resetZoom()}
          >
            {zoom()}%
          </button>
          <button
            class="
            rounded-r-lg outline-none hover:bg-darkcolor-400/10 transition-colors
            text-lg w-[40px] h-[40px] inline-flex items-center justify-center"
            title="Zoom in"
            onClick={() => zoomIn()}
          >
            <FaSolidPlus class="fill-darkcolor-800 dark:fill-white-950" />
          </button>
        </div>
      </div>
    </>
  );
}
