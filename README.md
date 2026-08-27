# AURORA Control Center 2.0

A modular futuristic control workspace built with React + Vite, with an optional dependency-free Node HTTP API.

## Run frontend

```bash
npm install
npm run dev
```

## Run local API

In another terminal:

```bash
node server/index.js
```

The API listens on `http://localhost:8787` by default. The frontend automatically falls back to local simulation when the API is unavailable.

## API surface

- `GET /api/health`
- `GET /api/metrics`
- `GET /api/system/summary`
- `GET /api/automations`
- `PATCH /api/automations/:id`
- `GET /api/notifications`
- `POST /api/notifications`

## Frontend architecture

- `src/main.jsx` — bootstrap and layered styles.
- `src/App.jsx` — application shell, navigation and module composition.
- `src/api.js` — resilient API client and offline fallback.
- `src/styles.css` — original base layer retained for compatibility.
- `src/styles2.css` — upgraded visual system and responsive UI.
- `src/data.js` — legacy domain data retained for compatibility.
- `server/index.js` — local API/control plane.

## Modules

Command, Telemetry, Intelligence, Projects, Workspace, Terminal, Astronomy, Spatial Lab, Automation, Inbox, Analytics, Security, Settings and System.

The terminal is deliberately sandboxed and never executes arbitrary host commands. The Intelligence module never claims an external model is connected when it is not.
