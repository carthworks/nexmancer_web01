import { SpeedInsights } from "@vercel/speed-insights/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initConsoleSignature } from "./utils/consoleSignature";

initConsoleSignature();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SpeedInsights />
    <App />
  </StrictMode>
);
