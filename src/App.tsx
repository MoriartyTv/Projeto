import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./routes/Dashboard";
import Monitoring from "./routes/Monitoring";
import AI from "./routes/AI";
import Files from "./routes/Files";
import Terminal from "./routes/Terminal";
import Projects from "./routes/Projects";
import Astronomy from "./routes/Astronomy";
import Visualization3D from "./routes/Visualization3D";
import Automations from "./routes/Automations";
import NotificationsPage from "./routes/NotificationsPage";
import Settings from "./routes/Settings";
import About from "./routes/About";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="monitoring" element={<Monitoring />} />
        <Route path="ai" element={<AI />} />
        <Route path="files" element={<Files />} />
        <Route path="terminal" element={<Terminal />} />
        <Route path="projects" element={<Projects />} />
        <Route path="astronomy" element={<Astronomy />} />
        <Route path="visualization" element={<Visualization3D />} />
        <Route path="automations" element={<Automations />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<Settings />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}