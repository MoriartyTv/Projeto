import React, { createContext, useContext, useState, useCallback } from "react";

export type Notification = {
  id: string;
  title: string;
  description?: string;
  type?: "info" | "success" | "warn" | "err";
  ts: number;
};

const NotificationsContext = createContext<{
  notifications: Notification[];
  push: (n: Omit<Notification, "id" | "ts">) => void;
  remove: (id: string) => void;
} | null>(null);

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const push = useCallback((n: Omit<Notification, "id" | "ts">) => {
    const note: Notification = { id: uid(), ts: Date.now(), ...n };
    setNotifications((s) => [note, ...s].slice(0, 10));
    // auto remove
    setTimeout(() => {
      setNotifications((s) => s.filter((x) => x.id !== note.id));
    }, 10000);
  }, []);

  const remove = useCallback((id: string) => {
    setNotifications((s) => s.filter((x) => x.id !== id));
  }, []);

  return (
    <NotificationsContext.Provider value={{ notifications, push, remove }}>
      {children}
      <NotificationCenter />
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}

/* inline component to render toasts */
function NotificationCenter() {
  const ctx = useContext(NotificationsContext)!;
  return (
    <div className="notifications-root" role="region" aria-live="polite" aria-label="Notificações do sistema">
      {ctx.notifications.map((n) => (
        <div key={n.id} className={`toast ${n.type || "info"}`}>
          <div style={{flex:1}}>
            <div style={{fontWeight:700}}>{n.title}</div>
            {n.description && <div style={{fontSize:13, color:"var(--muted)", marginTop:6}}>{n.description}</div>}
          </div>
          <div style={{textAlign:"right", fontSize:12, color:"var(--muted)"}}>
            <div>{timeAgo(n.ts)}</div>
            <button onClick={() => ctx.remove(n.id)} className="btn" style={{marginTop:8}}>Fechar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  return `${Math.floor(s / 3600)}h`;
}