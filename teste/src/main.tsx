import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";
import "./styles/ui-overrides.css";
import { UIProvider } from "./state/uiStore";
import { NotificationProvider } from "./state/notifications";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UIProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </UIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
