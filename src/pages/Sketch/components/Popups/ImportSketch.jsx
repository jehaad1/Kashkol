import { createSignal } from "solid-js";
import { FaSolidXmark } from "solid-icons/fa";
import { myCanvas, setObjects } from "../../App";

export const [importedSketch, setImportedSketch] = createSignal(null);
export default function ImportSketchPopup(props) {
  const { clearCanvas } = props;
  return (
    <>
      <div
        class={`
        fixed pointer-event-none
        w-screen h-screen
        flex items-center justify-center
        popup
        ${importedSketch() ? "top-0 z-[150]" : "top-[-100vh] -z-1"}`}
      >
        {importedSketch() && (
          <div
            class="
            fixed
            top-0 left-0 right-0 bottom-0
            -z-[1] bg-darkcolor-950/10 dark:bg-darkcolor-950/20"
            onClick={() => setImportedSketch(null)}
          ></div>
        )}
        <div class="relative">
          <button
            class="
            absolute top-3 right-3
            rounded-lg outline-none text-2xl
            bg-white-950 dark:bg-darkcolor-800"
            onClick={() => setImportedSketch(null)}
          >
            <FaSolidXmark class="fill-darkcolor-800 dark:fill-white-950" />
          </button>
          <div
            class="
            flex flex-col py-4 px-8
            z-30 w-[500px]
            items-center justify-center
            bg-white-950 dark:bg-darkcolor-800
            shadow-lg text-darkcolor-800 dark:text-white-950
            rounded-lg"
          >
            <h1
              class="
              font-bold
              text-4xl mb-7 select-none"
            >
              Import Sketch
            </h1>
            <p>Are you sure you want to replace the current sketch?</p>
            <p>This action can't be undone.</p>

            <div
              class="
             grid grid-cols-2 gap-3
             mt-10"
            >
              <button
                class="
                 px-4 py-2 rounded-lg text-white-950
                bg-red-400 select-none"
                onClick={() => {
                  clearCanvas()();
                  const objs = importedSketch();
                  objs.forEach((obj) => {
                    const id = newId();
                    obj.id = id;
                    obj.zIndex = id;
                  });
                  setObjects(objs);
                  if (importedSketch()) myCanvas.setObjects(objs);
                  setImportedSketch(null);
                }}
              >
                Replace
              </button>
              <button
                class="
                px-4 py-2 rounded-lg text-white-950
                 bg-zinc-600 select-none"
                onClick={() => setImportedSketch(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
