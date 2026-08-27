import React, { useEffect, useRef, useState } from "react";
import { useNotifications } from "../state/notifications";

/**
 * Chat UI - purely local/simulated. Shows status, model info, context size and a chat list.
 */
export default function AI(){
  const [messages, setMessages] = useState<{id:string, who:"user"|"ai", text:string, ts:number}[]>([
    {id:"m1", who:"ai", text:"Aurora online. Como posso ajudar?", ts: Date.now()-60000}
  ]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"READY"|"PROCESSING"|"ANALYZING"|"CONNECTED">("READY");
  const { push } = useNotifications();
  const ref = useRef<HTMLDivElement|null>(null);

  useEffect(()=>{ ref.current?.scrollTo({top:ref.current.scrollHeight, behavior:"smooth"}); }, [messages]);

  function send(){
    if (!input.trim()) return;
    const id = Math.random().toString(36).slice(2);
    const m = { id, who:"user" as const, text: input.trim(), ts: Date.now() };
    setMessages((s)=>[...s,m]);
    setInput("");
    setStatus("PROCESSING");
    setTimeout(()=>{
      setStatus("ANALYZING");
      setTimeout(()=>{
        const aiResp = { id: "r"+id, who:"ai" as const, text: `Resposta simulada para: "${m.text}". Análise completa.`, ts: Date.now() };
        setMessages((s)=>[...s, aiResp]);
        setStatus("READY");
        push({ title: "Resposta da IA", description: "AURORA gerou uma resposta", type: "info" });
      }, 800 + Math.random()*1300);
    }, 400 + Math.random()*300);
  }

  return (
    <div style={{padding:12, display:"grid", gridTemplateColumns:"360px 1fr", gap:12}}>
      <div className="panel">
        <div className="module-title">Inteligência Artificial</div>
        <div style={{marginTop:8}} className="small-muted">Status do modelo</div>
        <div style={{display:"flex", justifyContent:"space-between", marginTop:8}}>
          <div>
            <div style={{fontWeight:700}}>Aurora-Lite</div>
            <div style={{color:"var(--muted)", fontSize:13}}>Contexto: 2048 tokens</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontWeight:800}}>{status}</div>
            <div style={{fontSize:12, color:"var(--muted)"}}>Latência aprox. 120ms</div>
          </div>
        </div>

        <div style={{marginTop:12}}>
          <div className="small-muted">Atividade Recente</div>
          <ul style={{marginTop:8, paddingLeft:16}}>
            <li>Consulta: análise de logs — 2m</li>
            <li>Treinamento incremental — 1h</li>
          </ul>
        </div>
      </div>

      <div className="panel" style={{display:"flex", flexDirection:"column", height:520}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div style={{fontWeight:700}}>Chat</div>
          <div style={{fontSize:13, color:"var(--muted)"}}>Modo: Simulado • Local</div>
        </div>

        <div ref={ref} style={{flex:1, overflow:"auto", marginTop:12, padding:8, background:"rgba(255,255,255,0.01)", borderRadius:8}}>
          {messages.map(m=>(
            <div key={m.id} style={{display:"flex", marginBottom:8, justifyContent: m.who==="user" ? "flex-end" : "flex-start"}}>
              <div style={{maxWidth:"70%", padding:10, borderRadius:8, background: m.who==="user" ? "linear-gradient(180deg, rgba(0,194,255,0.12), rgba(0,194,255,0.06))" : "rgba(255,255,255,0.01)", color:"var(--text)"}}>
                <div style={{fontSize:13}}>{m.text}</div>
                <div style={{fontSize:11, color:"var(--muted)", marginTop:6}}>{new Date(m.ts).toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={(e)=>{e.preventDefault(); send();}} style={{display:"flex", gap:8, marginTop:12}}>
          <input aria-label="Mensagem para IA" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Enviar mensagem para Aurora..." style={{flex:1, padding:10, borderRadius:8, border:"1px solid rgba(255,255,255,0.03)", background:"rgba(255,255,255,0.01)"}} />
          <button className="btn" type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}