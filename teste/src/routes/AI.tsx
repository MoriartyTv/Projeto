import React, { useEffect, useRef, useState } from "react";
import { useNotifications } from "../state/notifications";
import { useAI } from "../state/aiStore";
import AISettingsModal from "../components/AISettings/AISettingsModal";

export default function AI(){
  const { mode, model } = useAI();
  const [messages, setMessages] = useState<{id:string, who:"user"|"ai", text:string, ts:number}[]>([
    {id:"m1", who:"ai", text: mode === 'disabled' ? "Aurora online, integração de IA desativada." : "Aurora pronta.", ts: Date.now()-60000}
  ]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<string>(mode === 'disabled' ? "DESATIVADO" : "READY");
  const { push } = useNotifications();
  const ref = useRef<HTMLDivElement|null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(()=>{ ref.current?.scrollTo({top:ref.current.scrollHeight, behavior:"smooth"}); }, [messages]);

  useEffect(()=>{ setStatus(mode === 'disabled' ? 'DESATIVADO' : 'READY'); }, [mode]);

  function send(){
    if(mode === 'disabled'){
      push({ title: "IA desativada", description: "A integração com IA está desativada no momento.", type: "warning" });
      const id = Math.random().toString(36).slice(2);
      const aiResp = { id: "r"+id, who:"ai" as const, text: `Integração de IA desativada — nenhuma solicitação foi enviada.`, ts: Date.now() };
      setMessages((s)=>[...s, aiResp]);
      setInput("");
      return;
    }

    if(!input.trim()) return;
    const id = Math.random().toString(36).slice(2);
    const m = { id, who:"user" as const, text: input.trim(), ts: Date.now() };
    setMessages((s)=>[...s,m]);
    setInput("");
    setStatus("PROCESSING");

    // Local mode: simulate quick local reply
    if(mode === 'local'){
      setTimeout(()=>{
        setStatus("ANALYZING");
        setTimeout(()=>{
          const aiResp = { id: "r"+id, who:"ai" as const, text: `Resposta (local) para: "${m.text}" — modelo: ${model}`, ts: Date.now() };
          setMessages((s)=>[...s, aiResp]);
          setStatus("READY");
          push({ title: "Resposta da IA", description: "Resposta gerada localmente", type: "info" });
        }, 600 + Math.random()*800);
      }, 200 + Math.random()*200);
      return;
    }

    // External mode: show placeholder (integration to be implemented later)
    setTimeout(()=>{
      const aiResp = { id: "r"+id, who:"ai" as const, text: `Modo Externo selecionado — integração não configurada.`, ts: Date.now() };
      setMessages((s)=>[...s, aiResp]);
      setStatus("READY");
      push({ title: "IA externa", description: "Integração externa não configurada", type: "warning" });
    }, 500 + Math.random()*800);
  }

  return (
    <div style={{padding:12, display:"grid", gridTemplateColumns:"360px 1fr", gap:12}}>
      <AISettingsModal open={settingsOpen} onClose={()=>setSettingsOpen(false)} />

      <div className="panel">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>
            <div className="module-title">Inteligência Artificial</div>
            <div style={{color:"var(--muted)", fontSize:13}}>Modelo: <strong>{model}</strong></div>
          </div>
          <div>
            <button className="btn" onClick={()=>setSettingsOpen(true)} style={{marginRight:8}}>Configurar IA</button>
            <div style={{fontSize:12, color:"var(--muted)", textAlign:"right"}}>
              <div style={{fontWeight:800}}>{status}</div>
              <div style={{fontSize:12, color:"var(--muted)"}}>Modo: {mode}</div>
            </div>
          </div>
        </div>

        <div style={{marginTop:12}}>
          <div className="small-muted">Atividade Recente</div>
          <ul style={{marginTop:8, paddingLeft:16}}>
            <li>Integração: {mode}</li>
            <li>Modelo ativo: {model}</li>
          </ul>
        </div>
      </div>

      <div className="panel" style={{display:"flex", flexDirection:"column", height:520}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div style={{fontWeight:700}}>Chat</div>
          <div style={{fontSize:13, color:"var(--muted)"}}>Modo: {mode}</div>
        </div>

        <div ref={ref} style={{flex:1, overflow:"auto", marginTop:12, padding:8, background:"rgba(255,255,255,0.01)", borderRadius:8}}>
          {messages.map(m=> (
            <div key={m.id} style={{display:"flex", marginBottom:8, justifyContent: m.who==="user" ? "flex-end" : "flex-start"}}>
              <div style={{maxWidth:"70%", padding:10, borderRadius:8, background: m.who==="user" ? "linear-gradient(180deg, rgba(0,194,255,0.12), rgba(0,194,255,0.06))" : "rgba(255,255,255,0.01)", color:"var(--text)"}}>
                <div style={{fontSize:13}}>{m.text}</div>
                <div style={{fontSize:11, color:"var(--muted)", marginTop:6}}>{new Date(m.ts).toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={(e)=>{e.preventDefault(); send();}} style={{display:"flex", gap:8, marginTop:12}}>
          <input aria-label="Mensagem para IA" value={input} onChange={(e)=>setInput(e.target.value)} placeholder={mode === 'disabled' ? 'Integração de IA desativada' : 'Enviar mensagem para Aurora...'} style={{flex:1, padding:10, borderRadius:8, border:"1px solid rgba(255,255,255,0.03)", background: mode==='disabled' ? "rgba(255,255,255,0.01)" : "transparent", color:"var(--text)"}} disabled={mode==='disabled'} />
          <button className="btn" type="submit" disabled={mode==='disabled'}>Enviar</button>
        </form>
      </div>
    </div>
  );
}
