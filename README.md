# AURORA // Control Center

AURORA is a modular futuristic control-center interface built with React and Vite. It is intentionally a local UI: telemetry, filesystem, terminal, astronomy, 3D, automation and AI data are simulated unless a future adapter/backend is connected.

## Architecture

- `src/main.jsx` — application bootstrap.
- `src/App.jsx` — reusable UI primitives, module routing and local state.
- `src/data.js` — mock domain data and terminal commands.
- `src/styles.css` — visual system, responsive layout, accessibility-oriented focus/controls and reduced-motion support.
- `index.html` — Vite entry document.

## Navigation

Dashboard · System Monitor · AI Console · File Explorer · Terminal · Projects · Astronomy · 3D Visualization · Automations · Notifications · Settings · About.

## Implementation phases

1. Foundation: Vite/React structure, navigation, sidebar, header and design tokens.
2. Core telemetry: dashboard, animated simulated metrics, charts and event stream.
3. Tools: local AI console, file explorer, simulated terminal and project registry.
4. Science/orchestration: astronomy visualization, interactive 3D placeholder and automation controls.
5. Preferences: appearance, glow, motion, transparency and responsive behavior.
6. Review: reusable components, explicit simulation boundaries, keyboard-friendly controls and `prefers-reduced-motion` support.

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Backend boundary

No component claims access to the host filesystem, real terminal, external AI, or real hardware telemetry. Those integrations can be added later behind adapters/API endpoints without replacing the UI layer.
