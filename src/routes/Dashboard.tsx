import React from "react";
import useSimulator from "../hooks/useSimulator";

function Sparkline({data}:{data:number[]}) {
  const w=120, h=32;
  const max = Math.max(...data,1);
  const min = Math.min(...data,0);
  const points = data.map((v,i)=>{
    const x = (i/(data.length-1))*w;
    const y = h - ((v - min)/(max-min || 1))*h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={points} fill="none" stroke="url(#g)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="rgba(0,194,255,0.9)"/>
          <stop offset="1" stopColor="rgba(102,240,255,0.6)"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Dashboard(){
  const {cpu, gpu, ram} = useSimulator();
  return (
    <div style={{display:"grid", gridTemplateColumns:"1fr 360px", gap:14, padding:12}}>
      <div style={{display:"grid", gap:12}}>
        <div className="panel" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>
            <div style={{fontSize:12, color:"var(--muted)"}}>Saudações, Operador</div>
            <div style={{fontSize:20, fontWeight:700}}>Bem-vindo ao AURORA</div>
            <div style={{fontSize:13, color:"var(--muted)", marginTop:6}}>Status geral: <span style={{color:"var(--accent-2)", fontWeight:700}}>Estável</span></div>
          </div>
          <div style={{display:"flex", gap:12}}>
            <div style={{minWidth:160}} className="panel">
              <div style={{fontSize:12, color:"var(--muted)"}}>Conexão</div>
              <div style={{fontWeight:700}}>Online • Latência 28ms</div>
            </div>
            <div style={{minWidth:160}} className="panel">
              <div style={{fontSize:12, color:"var(--muted)"}}>Atividade</div>
              <div style={{fontWeight:700}}>Baixa</div>
            </div>
          </div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12}}>
          <div className="panel">
            <div style={{fontSize:12, color:"var(--muted)"}}>CPU</div>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div style={{fontSize:22, fontWeight:800}}>{Math.round(cpu.value)}%</div>
              <div><Sparkline data={cpu.history.slice(-40)}/></div>
            </div>
          </div>
          <div className="panel">
            <div style={{fontSize:12, color:"var(--muted)"}}>GPU</div>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div style={{fontSize:22, fontWeight:800}}>{Math.round(gpu.value)}%</div>
              <div><Sparkline data={gpu.history.slice(-40)}/></div>
            </div>
          </div>
          <div className="panel">
            <div style={{fontSize:12, color:"var(--muted)"}}>RAM</div>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div style={{fontSize:22, fontWeight:800}}>{Math.round(ram.value)}%</div>
              <div><Sparkline data={ram.history.slice(-40)}/></div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div style={{fontSize:13, color:"var(--muted)"}}>Eventos Recentes</div>
          <ul style={{marginTop:8, paddingLeft:16}}>
            <li style={{marginBottom:6}}>IA: análise concluída — modelo "Aurora-Lite" (2s)</li>
            <li style={{marginBottom:6}}>Backup automático iniciado — 34% concluído</li>
            <li style={{marginBottom:6}}>Projeto "Orion" — novo commit em main</li>
          </ul>
        </div>
      </div>

      <div style={{display:"grid", gap:12}}>
        <div className="panel">
          <div style={{fontSize:12, color:"var(--muted)"}}>Atividade da IA</div>
          <div style={{display:"flex", gap:8, marginTop:8}}>
            <div style={{flex:1}}>
              <div style={{fontWeight:700}}>Fila de Tarefas</div>
              <div style={{marginTop:8}}>2 em processamento • 6 aguardando</div>
            </div>
            <div style={{width:120}}>
              <div style={{fontSize:12, color:"var(--muted)"}}>Modelo ativo</div>
              <div style={{fontWeight:700}}>Aurora-Lite</div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div style={{fontSize:12, color:"var(--muted)"}}>Notificações</div>
          <div style={{marginTop:8, display:"flex", flexDirection:"column", gap:8}}>
            <div style={{display:"flex", justifyContent:"space-between"}}><div>Atualização de segurança disponível</div><small style={{color:"var(--muted)"}}>2m</small></div>
            <div style={{display:"flex", justifyContent:"space-between"}}><div>Backup automático — erro recuperado</div><small style={{color:"var(--muted)"}}>12m</small></div>
          </div>
        </div>

      </div>
    </div>
  );
}