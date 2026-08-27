import React, { useEffect, useRef, useState } from "react";
import { useNotifications } from "../../state/notifications";

const PROMPT = "aurora@core:~$";

export default function TerminalEmulator() {
  const [lines, setLines] = useState<string[]>([
    "AURORA Terminal v0.1",
    "Type 'help' to see available commands."
  ]);
  const [input, setInput] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);
  const { push } = useNotifications();

  useEffect(()=> { ref.current?.scrollTo({top:ref.current.scrollHeight, behavior:"smooth"}); }, [lines]);

  function echo(text: string) {
    setLines((s) => [...s, text]);
  }

  function run(cmdline: string) {
    const parts = cmdline.trim().split(/\s+/);
    const c = parts[0]?.toLowerCase();
    switch (c) {
      case "help":
        echo("Available: help, clear, status, system, projects, ai, scan, about");
        break;
      case "clear":
        setLines([]);
        break;
      case "status":
        echo("System: Online • CPU 12% • RAM 34% • Storage 72%");
        break;
      case "system":
        echo("AURORA Core v0.1\nUptime: ~3h 12m\nLoad: nominal");
        break;
      case "projects":
        echo("Projects:\n - Orion (active)\n - Titan (paused)\n - Helix (completed)");
        break;
      case "ai":
        echo("AI: Aurora-Lite • status: READY");
        break;
      case "scan":
        echo("Scanning network... OK\nNo threats found.");
        push({ title: "Scan completado", description: "Rede verificada — nenhum anomalia", type: "success" });
        break;
      case "about":
        echo("AURORA — Central de Controle\nDeveloper: Equipe Aurora\nVersion: 0.1");
        break;
      default:
        if (c) echo(`Comando não encontrado: ${c}`);
    }
  }

  function onSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim()) return;
    setLines((s) => [...s, `${PROMPT} ${input}`]);
    run(input);
    setInput("");
  }

  return (
    <div>
      <div className="terminal panel" ref={ref} role="log" aria-live="polite">
        {lines.map((l, i) => <div key={i} style={{whiteSpace:"pre-wrap"}}>{l}</div>)}
      </div>
      <form onSubmit={onSubmit} style={{display:"flex", gap:8, marginTop:8}}>
        <div style={{fontFamily:"ui-monospace,monospace", padding:"10px 12px", background:"#071228", borderRadius:8, minWidth:120}}>{PROMPT}</div>
        <input aria-label="Terminal input" value={input} onChange={(e)=>setInput(e.target.value)} style={{flex:1, padding:10, borderRadius:8, border:"1px solid rgba(255,255,255,0.03)", background:"rgba(255,255,255,0.01)", color:"var(--text)"}} />
        <button className="btn" onClick={onSubmit}>Enviar</button>
      </form>
    </div>
  );
}