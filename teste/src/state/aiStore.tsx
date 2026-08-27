import React, { createContext, useContext, useEffect, useState } from "react";

export type AIMode = "disabled" | "local" | "external";

type AIState = {
  mode: AIMode;
  model: string;
  setMode: (m: AIMode) => void;
  setModel: (m: string) => void;
};

const defaultState: AIState = {
  mode: "disabled",
  model: "Aurora-Lite",
  // placeholders
  setMode: () => {},
  setModel: () => {},
};

const AIContext = createContext<AIState | undefined>(undefined);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AIMode>(() => {
    try { const raw = localStorage.getItem("aurora-ai-mode"); return (raw as AIMode) || "disabled"; } catch { return "disabled"; }
  });
  const [model, setModel] = useState<string>(() => {
    try { return localStorage.getItem("aurora-ai-model") || "Aurora-Lite"; } catch { return "Aurora-Lite"; }
  });

  useEffect(() => { try { localStorage.setItem("aurora-ai-mode", mode); } catch {} }, [mode]);
  useEffect(() => { try { localStorage.setItem("aurora-ai-model", model); } catch {} }, [model]);

  const value: AIState = {
    mode,
    model,
    setMode: (m) => setMode(m),
    setModel: (m) => setModel(m),
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}

export function useAI(){
  const ctx = useContext(AIContext);
  if(!ctx) throw new Error("useAI must be used within AIProvider");
  return ctx;
}
