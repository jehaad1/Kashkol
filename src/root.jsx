/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route, Routes } from "@solidjs/router";
import { createSignal, lazy } from "solid-js";

if (localStorage.displayMode === "dark") {
  document.querySelector("html").classList.add("dark");
}

export const [displayMode, setDisplayMode] = createSignal(
  localStorage.displayMode
);

export function ToggleDisplayMode() {
  const displayMode = localStorage.displayMode;
  if (displayMode === "dark") {
    localStorage.displayMode = "light";
    document.querySelector("html").classList.remove("dark");
  } else {
    localStorage.displayMode = "dark";
    document.querySelector("html").classList.add("dark");
  }
  setDisplayMode(localStorage.displayMode);
}

const Home = lazy(() => import("./pages/Home/App.jsx"));
const Login = lazy(() => import("./pages/Login/App.jsx"));
const Sketch = lazy(() => import("./pages/Sketch/App.jsx"));
const Workspace = lazy(() => import("./pages/Workspace/App.jsx"));

import "./tailwind.css";

render(
  () => (
    <Router>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/Login" component={Login} />
        <Route path="/workspace" component={Workspace} />
        <Route path="/sketch/:cid" component={Sketch} />
      </Routes>
    </Router>
  ),
  document.body
);
