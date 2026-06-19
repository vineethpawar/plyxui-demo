# plyxui-demo

A team-chat dashboard built end-to-end with [`@plyxui/*`](https://npmjs.com/org/plyxui). Cream + peach + yellow palette, Montserrat typography, responsive at every breakpoint.

## Live

- **StackBlitz** (no login required, runs Vite via WebContainers): https://stackblitz.com/github/vineethpawar/plyxui-demo
- **CodeSandbox** (needs an account — spins up a Devbox with the same Vite env): https://codesandbox.io/p/github/vineethpawar/plyxui-demo/main?file=src/App.tsx
- **Walkthrough on plyxui.com:** https://plyxui.com/docs/getting-started/playground/

> Why two surfaces: StackBlitz runs an actual `npm install && npm run dev` in your browser, so Vite + plyxui's source-published `.ts` files transpile naturally. CodeSandbox's anonymous Define-API sandboxes use a legacy bundler that doesn't handle Vite, so the proper CodeSandbox experience is a Devbox — which means signing in once.

## Run locally

```bash
git clone https://github.com/vineethpawar/plyxui-demo
cd plyxui-demo
npm install
npm run dev
```

Vite serves on `http://localhost:5173`.

## What's here

One Vite app. One `App.tsx`. Every UI element comes from `@plyxui/*`:

| Where | What | From |
|---|---|---|
| Sidebar shell | `AppShell` | `@plyxui/layouts` |
| Sidebar nav + Quick Add | `Box`, `Text`, `Flex`, `Button`, `Divider` | `@plyxui/primitives` |
| Top bar search | `Input` | `@plyxui/primitives` |
| Theme + bell tooltips | `Tooltip` | `@plyxui/comps` |
| Mobile sidebar | `Drawer` | `@plyxui/comps` |
| Chat avatars | `Image` (with `fallback`) | `@plyxui/primitives` |
| Chat input → send | `Input`, `useToast` | `@plyxui/primitives`, `@plyxui/hooks` |
| Theming | `ThemeProvider`, `useTheme` | `@plyxui/styles` |
| Brand palette | `registerColorTokens` | `@plyxui/core` |
| Responsive breakpoints | `useMediaQuery`, `useDisclosure` | `@plyxui/hooks` |

## Brand extension

The cream / peach / yellow palette isn't a fork — it's a brand extension registered against plyxui's token table in [`src/main.tsx`](src/main.tsx):

```ts
registerColorTokens({
  cream:        { light: "#FAF3EC", dark: "#161412" },
  peach:        { light: "#F8C9C0", dark: "#5B3A35" },
  yellow:       { light: "#F6E27A", dark: "#806F2C" },
  bubbleMine:   { light: "#F6CBC1", dark: "#5B3A35" },
  // ...
});
```

Pair with a TS module augmentation in `src/tokens.d.ts` for full autocomplete on `colors.peach`, `colors.yellow`, etc. Same `useTheme()` hook, same `colors.X` access pattern — the only thing that changes is the brand.
