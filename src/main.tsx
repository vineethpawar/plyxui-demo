import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerColorTokens } from "@plyxui/core";
import { ThemeProvider } from "@plyxui/styles";
import { ToastProvider } from "@plyxui/hooks";
import { App } from "./App";

// Extend plyxui's token table with the demo's brand palette.
// Light values are tuned to match the warm cream / peach / yellow language
// the dashboard sits in; dark values are sensible neutrals so the toggle
// still feels right out of the box.
registerColorTokens({
  cream:           { light: "#FAF3EC", dark: "#161412" },
  card:            { light: "#FFFFFF", dark: "#1F1C19" },
  cardSubtle:      { light: "#F6EFE8", dark: "#26221E" },
  peach:           { light: "#F8C9C0", dark: "#5B3A35" },
  peachDeep:       { light: "#F0AA9E", dark: "#A06A60" },
  yellow:          { light: "#F6E27A", dark: "#806F2C" },
  yellowDeep:      { light: "#E8D060", dark: "#A89230" },
  bubbleMine:      { light: "#F6CBC1", dark: "#5B3A35" },
  bubbleTheirs:    { light: "#F2EBE3", dark: "#2A2522" },
  inkStrong:       { light: "#1F1A17", dark: "#F5F1EC" },
  inkSoft:         { light: "#7A716A", dark: "#A39B92" },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
);
