import "./app.css";
import Router from "./Router.svelte";
import { createRoot } from "svelte";

const app = createRoot(Router, {
  target: document.getElementById("app")!,
});

export default app;
