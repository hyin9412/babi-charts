import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

const DEBUG_SERVER_URL = "http://127.0.0.1:7777/event";
const DEBUG_SESSION_ID = "specific-chart-blank";
const legacyReactDomRoots = new WeakMap();
const LISTENER_GUARD = "__specificChartDebugListenersInstalled__";

export const reportSpecificChartDebug = (hypothesisId, msg, data = {}) =>
  fetch(DEBUG_SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: DEBUG_SESSION_ID,
      runId: "post-fix",
      hypothesisId,
      location: "src/specific-chart.jsx",
      msg,
      data,
      ts: Date.now(),
    }),
  }).catch(() => {});

export function initializeSpecificChartRuntime() {
  reportSpecificChartDebug("A", "[DEBUG] specific chart module executed");

  if (!window[LISTENER_GUARD]) {
    window[LISTENER_GUARD] = true;

    window.addEventListener("error", (event) =>
      reportSpecificChartDebug("A", "[DEBUG] window error captured", {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      }),
    );

    window.addEventListener("unhandledrejection", (event) =>
      reportSpecificChartDebug("A", "[DEBUG] unhandled rejection captured", {
        reason:
          typeof event.reason === "object" && event.reason !== null
            ? {
                message: event.reason.message,
                stack: event.reason.stack,
                name: event.reason.name,
              }
            : { value: String(event.reason) },
      }),
    );
  }

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

  reportSpecificChartDebug("B", "[DEBUG] root element lookup", {
    found: Boolean(rootElement),
  });

  if (rootElement) {
    reportSpecificChartDebug("C", "[DEBUG] createRoot render start");
    createRoot(rootElement).render(node);
  }
}
