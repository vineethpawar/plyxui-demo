// Tell TypeScript about the brand tokens we registered at runtime.
// Pair with `registerColorTokens` in main.tsx.
import "@plyxui/core";

declare module "@plyxui/core" {
  interface OmniColorTokens {
    cream: string;
    card: string;
    cardSubtle: string;
    peach: string;
    peachDeep: string;
    yellow: string;
    yellowDeep: string;
    bubbleMine: string;
    bubbleTheirs: string;
    inkStrong: string;
    inkSoft: string;
  }
}
