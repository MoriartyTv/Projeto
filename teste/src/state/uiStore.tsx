import React, { createContext, useContext, useEffect, useReducer } from "react";

type UIState = {
  sidebarCollapsed: boolean;
  effectsEnabled: boolean;
  reducedMotion: boolean;
  brightness: number; // 0-100
};

type Action =
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_REDUCED_MOTION"; payload: boolean }
  | { type: "SET_EFFECTS"; payload: boolean }
  | { type: "SET_BRIGHTNESS"; payload: number };

const defaultState: UIState = {
  sidebarCollapsed: false,
  effectsEnabled: true,
  reducedMotion: false,
  brightness: 60,
};

const UIContext = createContext<{ state: UIState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

function uiReducer(state: UIState, action: Action): UIState {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case "SET_REDUCED_MOTION":
      return { ...state, reducedMotion: action.payload };
    case "SET_EFFECTS":
      return { ...state, effectsEnabled: action.payload };
    case "SET_BRIGHTNESS":
      return { ...state, brightness: action.payload };
    default:
      return state;
  }
}

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(uiReducer, defaultState, (init) => {
    try {
      const raw = localStorage.getItem("aurora-ui");
      return raw ? { ...init, ...JSON.parse(raw) } : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("aurora-ui", JSON.stringify(state));
    } catch {}
  }, [state]);

  return <UIContext.Provider value={{ state, dispatch }}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}