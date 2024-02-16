// self.addEventListener("install", (e) => {
//   e.waitUntil(
//     caches
//       .open("kashkol")
//       .then((cache) =>
//         cache.addAll([
//           "./index.html",
//           "./tailwind.config.js",
//           "./service-worker.js",
//           "./src/root.jsx",
//           "./public/Kashkol.png",
//           "./public/Kashkol White.png",
//           "./public/Logo.png",
//           "./public/Logo White.png",
//           "./public/robots.txt",
//           "./src/tailwind.css",
//           "./Fonts/IBMPlexSansArabic-Bold.ttf",
//           "./Fonts/IBMPlexSansArabic-Regular.ttf",
//           "./Fonts/IBMPlexSansArabic-Medium.ttf",
//           "./Fonts/IBMPlexSansArabic-SemiBold.ttf",
//           "./Fonts/IBMPlexSansArabic-Light.ttf",
//           "./src/pages/Sketch/Sketch.css",
//           "./src/pages/Sketch/App.jsx",
//           "./src/pages/Sketch/components/Popups/ImportSketch.jsx",
//           "./src/pages/Sketch/components/Popups/ExportImage.jsx",
//           "./src/pages/Sketch/components/Popups/ClearSketch.jsx",
//           "./src/pages/Sketch/components/ColorPicker.jsx",
//           "./src/pages/Sketch/components/Sidebar.jsx",
//           "./src/pages/Sketch/components/Stylebar.jsx",
//           "./src/pages/Sketch/components/Toolbar.jsx",
//           "./src/pages/Sketch/events/keyDown.js",
//           "./src/pages/Sketch/events/resize.js",
//           "./src/pages/Sketch/events/main.js",
//           "./src/pages/Sketch/functions/mouseClick.js",
//           "./src/pages/Sketch/functions/mouseDown.js",
//           "./src/pages/Sketch/functions/mouseMove.js",
//           "./src/pages/Sketch/functions/mouseUp.js",
//           "./src/pages/Sketch/functions/pasteObjects.js",
//           "./src/pages/Sketch/utils/dragger.js",
//           "./src/pages/Sketch/utils/getNewProps.js",
//           "./src/pages/Sketch/utils/getPath.js",
//           "./src/pages/Sketch/utils/main.js",
//           "./src/pages/Sketch/utils/moveObjects.js",
//           "./src/pages/Sketch/utils/selection.js",
//           "./src/pages/Sketch/utils/touch.js",
//         ])
//       )
//   );
// });

// self.addEventListener("fetch", (e) => {
//   e.respondWith(
//     caches.match(e.request).then((response) => response || fetch(e.request))
//   );
// });
