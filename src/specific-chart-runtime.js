import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { registerBrowserEnv } from "@visactor/vchart/esm/env";

const legacyReactDomRoots = new WeakMap();

export function initializeSpecificChartRuntime() {
  registerBrowserEnv();

  if (typeof ReactDOM.render !== "function") {
    ReactDOM.render = (node, container) => {
      let root = legacyReactDomRoots.get(container);
      if (!root) {
        root = createRoot(container);
        legacyReactDomRoots.set(container, root);
      }
      root.render(node);
      return root;
    };
  }

  if (typeof ReactDOM.unmountComponentAtNode !== "function") {
    ReactDOM.unmountComponentAtNode = (container) => {
      const root = legacyReactDomRoots.get(container);
      if (!root) {
        return false;
      }
      root.unmount();
      legacyReactDomRoots.delete(container);
      return true;
    };
  }
}

export function mountSpecificChartApp(node) {
  const rootElement = document.getElementById("root");

  if (rootElement) {
    createRoot(rootElement).render(node);
  }
}
