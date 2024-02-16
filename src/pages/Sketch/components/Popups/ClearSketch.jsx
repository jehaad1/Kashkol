import { createSignal } from "solid-js";
import { FaSolidXmark } from "solid-icons/fa";

export const [popupVisibility, setPopupVisibility] = createSignal(false);
export default function ClearSketchPopup(props) {
  const { clearCanvas } = props;
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
              Delete Sketch
            </h1>
            <p>Are you sure you want to delete the sketch?</p>
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
                  setPopupVisibility(false);
                  clearCanvas()();
                }}
              >
                Clear
              </button>
              <button
                class="
                px-4 py-2 rounded-lg text-white-950
                 bg-zinc-600 select-none"
                onClick={() => setPopupVisibility(false)}
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
