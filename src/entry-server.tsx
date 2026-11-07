import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import type { RoutePath } from "./lib/router";

export function render(route: RoutePath): string {
  return renderToString(
    <StrictMode>
      <App initialRoute={route} />
    </StrictMode>
  );
}

