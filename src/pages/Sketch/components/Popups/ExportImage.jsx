import { createSignal } from "solid-js";
import { myCanvas } from "../../App";
import { displayMode } from "../../../../root";
import { FaSolidXmark } from "solid-icons/fa";

export const [popupVisibility, setPopupVisibility] = createSignal(false);
export default function ExportImagePopup() {
  let includesBackground;
  return (
    <>
      <div
        class={`
        fixed pointer-event-none
        w-screen h-screen
        flex items-center justify-center
        popup
        ${popupVisibility() ? "top-0 z-[150]" : "top-[-100vh] -z-1"}`}
      >
        {popupVisibility() && (
          <div
            class="
            fixed
            top-0 left-0 right-0 bottom-0
            -z-[1] bg-darkcolor-950/10 dark:bg-darkcolor-950/20"
            onClick={() => setPopupVisibility(false)}
          ></div>
        )}
        <div class="relative">
          <button
            class="
            absolute top-3 right-3
            rounded-lg outline-none text-2xl
            bg-white-950 dark:bg-darkcolor-800"
            onClick={() => setPopupVisibility(false)}
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
              Export Image
            </h1>
            <p>How would you like to export the image of the sketch?</p>
            <p class="flex items-center gap-3 select-none mt-5">
              <label
                class="font-medium cursor-pointer"
                for="includesBackground"
              >
                Includes Background
              </label>
              <input
                ref={includesBackground}
                class="w-4 h-4 cursor-pointer"
                id="includesBackground"
                type="checkbox"
                checked={true}
              />
            </p>
            <div
              class="
             grid grid-cols-2 gap-3
             mt-10"
            >
              <button
                class="
                 px-4 py-2 rounded-lg text-white-950
                bg-blue-500 select-none"
                onClick={() => {
                  setPopupVisibility(false);
                  const object = {
                    id: Date.now(),
                    type: "rectangle",
                    x: 0,
                    y: 0,
                    width: myCanvas.canvas.width,
                    height: myCanvas.canvas.height,
                    zIndex: -10000,
                    opacity: displayMode() === "light" ? 1 : 0.95,
                    fill: displayMode() === "light" ? "#ffffff" : "#000000",
                  };
                  if (includesBackground.checked) myCanvas.setObject(object);
                  const data = myCanvas.canvas.toDataURL();
                  myCanvas.deleteObject(object.id);
                  const a = document.createElement("a");
                  a.href = data;
                  a.download = "sketchName.png";
                  a.click();
                }}
              >
                PNG
              </button>
              <button
                class="
                px-4 py-2 rounded-lg text-white-950
                 bg-zinc-600 select-none"
                onClick={async () => {
                  setPopupVisibility(false);
                  const object = {
                    id: Date.now(),
                    type: "rectangle",
                    x: 0,
                    y: 0,
                    width: myCanvas.canvas.width,
                    height: myCanvas.canvas.height,
                    zIndex: -10000,
                    opacity: displayMode() === "light" ? 1 : 0.95,
                    fill: displayMode() === "light" ? "#ffffff" : "#000000",
                  };
                  if (includesBackground.checked) myCanvas.setObject(object);
                  const data = myCanvas.canvas.toDataURL();
                  myCanvas.deleteObject(object.id);
                  const blob = await (await fetch(data)).blob();

                  // Write the image data to the clipboard
                  navigator.clipboard.write([
                    new ClipboardItem({
                      "image/png": blob,
                    }),
                  ]);
                }}
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
