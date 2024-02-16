import { createSignal } from "solid-js";
import ShortUniqueId from "short-unique-id";

import "./Workspace.css";
import {
  db,
  collection,
  doc,
  getDocs,
  setDoc,
  onLoggedIn,
  onLoggedOut,
  profile,
} from "../../firebase.config";
import { FaSolidPlus } from "solid-icons/fa";

export default function App() {
  const [canvases, setCanvases] = createSignal(null);
  const cid = new ShortUniqueId({ length: 12 });

  onLoggedOut(() => (location = "/"));
  onLoggedIn(async (p) => {
    const collectionId = collection(db, p.uid);
    const snapshot = await getDocs(collectionId);
    setCanvases(snapshot.docs);
  });

  return (
    <div class="rtl w-full flex justify-center">
      <div
        class="
        mt-20 min-w-[400px] w-1/2 max-w-[800px]
        flex flex-col gap-3 items-center justify-center"
      >
        <h1
          class="
          relative w-full
          text-center text-4xl font-medium text-darkcolor-950 dark:text-white-950"
        >
          مساحة العمل
          <button
            class="
            absolute right-0 p-1
            border rounded-lg border-darkcolor-950/50 dark:border-white-700"
            onClick={() => {
              const canvasId = cid.rnd();
              setDoc(doc(db, profile().uid, canvasId), {
                objects: [],
                name: canvasId,
              }).then(() => {
                location = `/canvas/${canvasId}`;
                // popup with loading
              });
            }}
          >
            <FaSolidPlus />
          </button>
        </h1>
        <h2 class="text-xl text-darkcolor-950 dark:text-white-950">
          {canvases()?.length === 0
            ? "لا يوجد رسمات."
            : !canvases() && "يتم التحميل الرسمات.."}
        </h2>
        <div class="mt-10 w-full grid grid-cols-2 gap-5">
          {canvases()?.length &&
            canvases().map((canvas) => (
              <a
                href={`/canvas/${canvas.id}`}
                class="
                flex flex-col items-center
                px-4 py-2 text-darkcolor-950 dark:text-white-950
                border rounded-lg border-darkcolor-950/50 dark:border-white-700"
              >
                <h1 class="text-2xl font-medium">{canvas.data().name}</h1>
                <img src={""} />
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
