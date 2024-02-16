import { createMemo } from "solid-js";
import { useLocation } from "@solidjs/router";
import { isLoggedIn, profile } from "../../firebase.config";
import { FaSolidMoon, FaSolidSun } from "solid-icons/fa";
import { ToggleDisplayMode } from "../../root";

export default function Header(props) {
  const currentLocation = useLocation();
  const path = createMemo(() => currentLocation.pathname);
  const { scrolled } = props;

  return (
    // <header
    //   class={`
    //   fixed flex items-center ${
    //     localStorage.lang === "en" ? "text-sm sm:text-base ltr" : "rtl"
    //   } select-none
    //   w-full py-2 px-4 z-30
    //   bg-white-950 dark:bg-darkcolor-950
    //   border-b-2 border-darkcolor-950 dark:border-white-950
    //   transition-all text-darkcolor-950 dark:text-white-950
    //   ${
    //     !scrolled()
    //       ? ""
    //       : `!border-zinc-400 dark:!border-zinc-700
    //     dark:!bg-zinc-700`
    //   }}
    //     `}
    // >
    //   <div class="flex gap-5 sm:gap-10">
    //     <a
    //       class="font-medium"
    //       href="/"
    //     >
    //       {localStorage.lang === "en" ? "Home Page" : "الرئيسية"}
    //     </a>
    //     {isLoggedIn() ? (
    //       <>
    //         <a
    //           class="font-medium"
    //           href="/documents"
    //         >
    //           {localStorage.lang === "en" ? "My Documents" : "مستنداتي"}
    //         </a>
    //       </>
    //     ) : (
    //       <a
    //         class="font-medium"
    //         href="/login"
    //       >
    //         {localStorage.lang === "en" ? "Login" : "تسجيل الدخول"}
    //       </a>
    //     )}
    //   </div>
    //   <div
    //     class={`
    //   flex gap-2 ${localStorage.lang === "en" ? "ml-auto" : "mr-auto"}
    //   `}
    //   >
    //     <div class="h-10 flex gap-2 items-start justify-end">
    //       <button
    //         title={
    //           localStorage.lang === "en"
    //             ? "Switch display mode"
    //             : "تغيير نمط العرض"
    //         }
    // class={`
    // grid place-items-center rounded-lg
    // h-10 aspect-square outline-none
    // ${
    //   scrolled()
    //     ? "fill-darkcolor-950 dark:fill-white-950"
    //     : `
    //     fill-darkcolor-950 dark:fill-white-950
    //     border-darkcolor-950 border dark:border-white-700
    //     dark:bg-darkcolor-950`
    // }`}
    //   onClick={() => ToggleDisplayMode()}
    // >
    //   <FaSolidMoon
    //     size={22}
    //     class="
    // block dark:hidden"
    //   />
    //   <FaSolidSun
    //     size={22}
    //     class="
    // hidden dark:block"
    //   />
    //       </button>
    //     </div>
    //     {isLoggedIn() && (
    //       <div
    //         class={`
    //       flex flex-col items-center justify-center
    //       rounded-lg h-10 px-3 select-none
    //       bg-zinc-50 ${
    //         scrolled()
    //           ? "dark:bg-zinc-800"
    //           : `border-darkcolor-950 border dark:border-white-700 dark:bg-white-950`
    //       }`}
    //         onClick={() => {
    //           if (path() === "/settings") return;
    //           location = "/settings";
    //         }}
    //       >
    //         <div
    //           class="
    //           flex items-center justify-center gap-2
    //           cursor-pointer
    //           h-10"
    //         >
    //           <img
    //             alt="Profile Picture"
    //             class="
    //             w-8 aspect-square
    //             rounded-full"
    //             src={profile().avatar}
    //           />
    //           <h1
    //             class="font-medium
    //           "
    //           >
    //             {profile().username.length > 10
    //               ? `${profile().username.slice(0, 9)}..`
    //               : profile().username}
    //           </h1>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </header>
    <header class="flex items-center justify-between px-6 py-4 bg-white-700 dark:bg-darkcolor-900">
      <nav class="hidden md:block">
        <ul class="flex items-center gap-6">
          <li>
            <a
              class="text-darkcolor-950 hover:underline dark:text-white-950"
              href="#"
              rel="ugc"
            >
              About
            </a>
          </li>
          <li>
            <a
              class="text-darkcolor-950 hover:underline dark:text-white-950"
              href="#"
              rel="ugc"
            >
              Features
            </a>
          </li>
          <li>
            <a
              class="text-darkcolor-950 hover:underline dark:text-white-950"
              href="#"
              rel="ugc"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              class="text-darkcolor-950 hover:underline dark:text-white-950"
              href="#"
              rel="ugc"
            >
              Login
            </a>
          </li>
        </ul>
      </nav>
      <div class="flex items-center">
        <button
          class="
          grid place-items-center rounded-lg
          h-10 aspect-square outline-none
          border-darkcolor-950 border dark:border-white-700
          "
          onClick={() => ToggleDisplayMode()}
        >
          <FaSolidMoon
            size={22}
            class="
            text-darkcolor-950 dark:text-white-950 block dark:hidden"
          />
          <FaSolidSun
            size={22}
            class="
            text-darkcolor-950 dark:text-white-950 hidden dark:block"
          />
        </button>
      </div>
    </header>
  );
}
