import "./Home.css";
import { isLoggedIn, onLoggedIn, auth } from "../../firebase.config";

import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer";

import { createSignal } from "solid-js";
import { AiOutlineBuild } from "solid-icons/ai";
import { CgProfile } from "solid-icons/cg";
import { IoDocumentTextOutline } from "solid-icons/io";

function App() {
  const [scrolled, setScrolled] = createSignal(window.scrollY > 50);
  window.addEventListener("scroll", () => setScrolled(window.scrollY > 50));

  onLoggedIn((p) => {
    if (p.isAnonymous) return deleteUser(auth.currentUser);
  });

  return (
    <>
      {/* <div
        class="
        flex flex-col items-center
        w-screen h-screen overflow-x-hidden overflow-y-auto
        bg-white-950 dark:bg-darkcolor-950"
        onScroll={(e) => setScrolled(e.target.scrollTop > 50)}
      >
        <Header scrolled={scrolled} />
        <div
          class={`
          w-11/12 ${localStorage.lang === "en" ? "ltr" : "rtl"} pt-12 sm:pt-32
          flex flex-col sm:gap-14 sm:gap-3
          lg:justify-center items-center sm:items-start`}
        >
          <div
            class={`
            select-none
            w-full sm:w-2/5 lg:w-2/5
            flex flex-col items-center
            `}
          >
            <h1
              class="
              text-6xl lg:text-7xl
              text-center
              text-darkcolor-950 dark:text-white-950
              font-semibold
              mt-20 sm:mt-10 lg:mt-20
              sm:mr-2 lg:mr-5"
            >
              {localStorage.lang === "en" ? "Kashkol" : "كشكول"}
            </h1>
            <h2
              class={`
              text-lg lg:text-2xl
              text-center
              text-darkcolor-950 dark:text-white-950 opacity-90
              mt-7`}
            >
              {localStorage.lang === "en"
                ? "Sketch what you want, then present it"
                : "ارسم ما تريد, ثم أعرضه"}
              .
            </h2>
            {isLoggedIn() ? (
              <button
                class="
                mt-10 w-7/12 sm:mr-5
                text-xl button transparent"
                onClick={() => (location = "/documents")}
              >
                {localStorage.lang === "en" ? "My Documents" : "مستنداتي"}
              </button>
            ) : (
              <button
                class="
                mt-10 w-7/12 sm:mr-5
                text-xl button transparent"
                onClick={() => (location = "/login")}
              >
                {localStorage.lang === "en" ? "Login" : "تسجيل الدخول"}
              </button>
            )}
          </div>
          <img
            alt="Hero Illustration"
            class="w-96 sm:w-3/5 max-w-xl select-none"
            src={HeroImage}
          />
        </div>
        {!window.matchMedia("(display-mode: standalone)").matches && (
          <>
            <div
              class={`
              select-none
              flex flex-col items-center gap-3
              mt-20 sm:mt-40
              py-10 ${localStorage.lang === "en" ? "ltr" : "rtl"}
              w-screen text-center`}
            >
              <h1
                class="
                text-4xl lg:text-6xl mb-4
                text-center
                text-darkcolor-950 dark:text-white-950
                font-semibold"
              >
                {localStorage.lang === "en" ? "What's Risha?" : "ما هو كشكول؟"}
              </h1>
              <h2
                class="
                text-md lg:text-xl text-center
                text-darkcolor-950 dark:text-white-950 opacity-90
                w-1/2"
              >
                {localStorage.lang === "en"
                  ? "Risha is an easy-to-use platform with tools for writing, note-taking, and blogging"
                  : "ريشه هي منصة سهلة الإستخدام بأدوات للكتابة والتدوين"}
                .
              </h2>
            </div>
            <div
              class={`
              select-none
              flex flex-col gap-3
              my-20 sm:my-40 lg:my-60
              py-10 ${localStorage.lang === "en" ? "ltr" : "rtl"}
              w-screen text-center`}
            >
              <h1
                class="
                text-4xl lg:text-6xl lg:mb-12
                text-center
                text-darkcolor-950 dark:text-white-950
                font-semibold"
              >
                {localStorage.lang === "en" ? "Features" : "المميزات"}
              </h1>
              <div
                class="
                mt-10
                grid grid-cols-1 gap-3 lg:gap-12 px-[10%] sm:px-[20%] lg:px-5
                lg:grid-cols-3 xl:grid-cols-5
                place-items-center"
              >
                <div class="hidden xl:block" />
                <div
                  class="
                  shadow-lg py-3 px-6 rounded-lg
                  border-zinc-400 border h-full w-full
                  dark:border-zinc-700 dark:bg-zinc-700"
                >
                  <div
                    class="
                  flex items-center justify-center gap-2 mb-2"
                  >
                    <AiOutlineBuild
                      class="
                    fill-darkcolor-950 dark:fill-white-950"
                      size={40}
                    />
                    <h1
                      class="
                    font-medium
                    text-xl text-darkcolor-950 dark:text-white-950"
                    >
                      {localStorage.lang === "en"
                        ? "Easy to use"
                        : "سهل الإستخدام"}
                    </h1>
                  </div>
                  <p
                    class="
                    px-5
                    text-darkcolor-950 dark:text-white-950"
                  >
                    {localStorage.lang === "en"
                      ? "Simple app interface and easy to use, helps you writing faster."
                      : "واجهة تطبيق بسيطة وسهلة الإستخدام, تساعدك بالكتابة أسرع."}
                  </p>
                </div>
                <div
                  class="
                  shadow-lg py-3 px-6 rounded-lg
                  border-zinc-400 border h-full w-full
                  dark:border-zinc-700 dark:bg-zinc-700"
                >
                  <div
                    class="
                    flex items-center justify-center gap-2 mb-2"
                  >
                    <IoDocumentTextOutline
                      class="
                    text-darkcolor-950 dark:text-white-950"
                      size={40}
                    />
                    <h1
                      class="
                      font-medium
                      text-xl text-darkcolor-950 dark:text-white-950"
                    >
                      {localStorage.lang === "en"
                        ? "Customization"
                        : "تخصيص كامل"}
                    </h1>
                  </div>
                  <p
                    class="
                    px-5
                    text-darkcolor-950 dark:text-white-950"
                  >
                    {localStorage.lang === "en"
                      ? "A set of tools gives you the full control over your documents."
                      : "مجموعة من الأدوات تمنحك التحكم الكامل في مستنداتك."}
                  </p>
                </div>
                <div
                  class="
                  shadow-lg py-3 px-6 rounded-lg
                  border-zinc-400 border h-full w-full
                  dark:border-zinc-700 dark:bg-zinc-700"
                >
                  <div
                    class="
                    flex items-center justify-center gap-2 mb-2"
                  >
                    <CgProfile
                      class="
                      text-darkcolor-950 dark:text-white-950"
                      size={40}
                    />
                    <h1
                      class="
                      font-medium
                      text-xl text-darkcolor-950 dark:text-white-950"
                    >
                      {localStorage.lang === "en"
                        ? "Publish Documents"
                        : "نشر المستندات"}
                    </h1>
                  </div>
                  <p
                    class="
                    px-5
                    text-darkcolor-950 dark:text-white-950"
                  >
                    {localStorage.lang === "en"
                      ? "Design your own profile and publish your documents."
                      : "صمم ملف شخصي خاص بك وأنشر مستنداتك."}
                  </p>
                </div>
                <div class="hidden xl:block" />
              </div>
            </div>
          </>
        )}
        <div class="max-sm:mt-24" />
        <Footer />
      </div> */}
      <div class="bg-white-700 dark:bg-darkcolor-900 h-screen !overflow-scroll rtl">
        <Header scrolled={scrolled} />
        <main>
          <section class="flex items-center justify-center px-4 py-32 bg-white-950 dark:bg-darkcolor-950 space-x-8">
            <div class="flex items-center justify-between w-1/2 max-2xl:flex-col-reverse max-2xl:gap-28">
              <div class="flex flex-col items-stretch w-[300px] gap-8 max-2xl:items-center">
                <h2 class="text-7xl font-bold text-darkcolor-950 dark:text-white-950">
                  كشكول
                </h2>
                <p class="text-3xl font-medium text-darkcolor-700 dark:text-white-300">
                  أرسم ماتريد، ثم أعرضه.
                </p>
                <button class="mt-8 bg-white-700 text-darkcolor-950 dark:bg-darkcolor-700 dark:text-white-950 w-full rounded-md text-2xl font-medium px-4 py-2">
                  تسجيل الدخول
                </button>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="316"
                height="316"
                viewBox="0 0 316 316"
                class="scale-[1.35]"
              >
                <rect
                  x="133.787"
                  y="0.868591"
                  width="225"
                  height="225"
                  rx="27"
                  transform="rotate(36.21 133.787 0.868591)"
                  class="fill-white-950 stroke-darkcolor-950 dark:fill-darkcolor-950 dark:stroke-white-950"
                  stroke-width="13"
                />
                <rect
                  x="199.277"
                  y="4.42108"
                  width="225"
                  height="225"
                  rx="27"
                  transform="rotate(60 199.277 4.42108)"
                  class="fill-white-950 stroke-darkcolor-950 dark:fill-darkcolor-950 dark:stroke-white-950"
                  // class="fill-darkcolor-950 stroke-white-950 dark:fill-white-950 dark:stroke-darkcolor-950"
                  stroke-width="13"
                />
                <rect
                  x="17"
                  y="158.421"
                  width="200"
                  height="200"
                  rx="27"
                  transform="rotate(-45 17 158.421)"
                  class="fill-darkcolor-950 dark:fill-white-950"
                />
              </svg>
            </div>
          </section>
          <section class="px-4 py-16">
            <h2 class="text-5xl font-bold text-center text-darkcolor-950 dark:text-white-950">
              المميزات
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-3xl mx-auto">
              <div
                class="rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div class="flex flex-col space-y-1.5 p-6">
                  <h3 class="text-lg font-semibold">Simple to use</h3>
                </div>
                <div class="p-6">
                  <p class="text-darkcolor-800 dark:text-white-700">
                    Our platform is easy to navigate, making it easy for you to
                    create and share your work.
                  </p>
                </div>
              </div>
              <div
                class="rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div class="flex flex-col space-y-1.5 p-6">
                  <h3 class="text-lg font-semibold">High Quality</h3>
                </div>
                <div class="p-6">
                  <p class="text-darkcolor-800 dark:text-white-700">
                    We offer high resolution for your drawings, ensuring they
                    look great on any device.
                  </p>
                </div>
              </div>
              <div
                class="rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div class="flex flex-col space-y-1.5 p-6">
                  <h3 class="text-lg font-semibold">Share Everywhere</h3>
                </div>
                <div class="p-6">
                  <p class="text-darkcolor-800 dark:text-white-700">
                    Easily share your drawings on social media platforms with
                    just a click of a button.
                  </p>
                </div>
              </div>
              <div
                class="rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div class="flex flex-col space-y-1.5 p-6">
                  <h3 class="text-lg font-semibold">Community</h3>
                </div>
                <div class="p-6">
                  <p class="text-darkcolor-800 dark:text-white-700">
                    Join our community of artists and share your work, get
                    feedback, and collaborate.
                  </p>
                </div>
              </div>
              <div
                class="rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div class="flex flex-col space-y-1.5 p-6">
                  <h3 class="text-lg font-semibold">Customizable</h3>
                </div>
                <div class="p-6">
                  <p class="text-darkcolor-800 dark:text-white-700">
                    Customize your profile and gallery to reflect your unique
                    style.
                  </p>
                </div>
              </div>
              <div
                class="rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div class="flex flex-col space-y-1.5 p-6">
                  <h3 class="text-lg font-semibold">Secure</h3>
                </div>
                <div class="p-6">
                  <p class="text-darkcolor-800 dark:text-white-700">
                    We prioritize your privacy and ensure all your data is safe
                    and secure.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
