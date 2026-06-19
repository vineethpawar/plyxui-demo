import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// @plyxui/* ships source .ts/.tsx files; exclude from prebundle so
// Vite transpiles them inline and respects the platform-specific
// resolution (.tsx for web, .native.tsx for RN — irrelevant here).
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      "@plyxui/core",
      "@plyxui/styles",
      "@plyxui/primitives",
      "@plyxui/icons",
      "@plyxui/hooks",
      "@plyxui/forms",
      "@plyxui/comps",
      "@plyxui/layouts",
    ],
  },
  esbuild: { loader: "tsx", include: /\.(ts|tsx)$/ },
  server: { host: true, port: 5173 },
});
