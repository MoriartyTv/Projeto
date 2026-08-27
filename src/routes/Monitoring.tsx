import React from "react";
import useSimulator from "../hooks/useSimulator";
import LineChart from "../components/charts/LineChart";
import Sparkline from "../components/charts/Sparkline";

export default function Monitoring(){
  const {cpu,gpu,ram} = useSimulator();
  // fake storage and network
  const storage = { used:72, avail: 28, history: Array.from({length:60}, (_,i)=>70 + Math.sin(i/8)*2 + Math.random()*1) };
  const net = { downHistory:Array.from({length:60}, (_,i)=>20 + Math.abs(Math.sin(i/6))*12 + Math.random()*2), upHistory:Array.from({length:60}, (_,i)=>4 + Math.abs(Math.cos(i/5))*6 + Math.random()*1) };

  return (
    <div style={{padding:12}}>
      <div className="panel">
        <div className="module-title">Monitoramento do Sistema</div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 320px", gap:12, marginTop:12}}>
          <div style={{display:"grid", gap:12}}>
            <div className="panel">
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div>
                  <div className="small-muted">CPU • Utilização</div>
                  <div style={{fontSize:20, fontWeight:800}}>{Math.round(cpu.value)}%</div>
                </div>
                <div style={{width:320}}>
                  <LineChart data={cpu.history.slice(-60)} height={90}/>
                </div>
              </div>
              <div style={{display:"flex", gap:12, marginTop:10}}>
                <div style={{flex:1}} className="panel subtle">
                  <div className="small-muted">Temperatura</div>
                  <div style={{fontWeight:700}}>65°C</div>
                </div>
                <div style={{flex:1}} className="panel subtle">
                  <div className="small-muted">Frequência</div>
                  <div style={{fontWeight:700}}>3.6 GHz</div>
                </div>
              </div>
            </div>

            <div className="panel">
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
                <div>
                  <div className="small-muted">GPU • Utilização</div>
                  <div style={{fontSize:20, fontWeight:800}}>{Math.round(gpu.value)}%</div>
                  <div style={{marginTop:8}}><Sparkline data={gpu.history.slice(-40)} /></div>
                </div>
                <div>
                  <div className="small-muted">RAM • Uso</div>
                  <div style={{fontSize:20, fontWeight:800}}>{Math.round(ram.value)}%</div>
                  <div style={{marginTop:8}}><Sparkline data={ram.history.slice(-40)} /></div>
                </div>
              </div>
            </div>

            <div className="panel">
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <div>
                  <div className="small-muted">Armazenamento</div>
                  <div style={{fontWeight:700}}>{storage.used}% usado</div>
                </div>
                <div style={{width:220}}><Sparkline data={storage.history.slice(-40)} /></div>
              </div>
              <div style={{marginTop:10, display:"flex", gap:8}}>
                <div style={{flex:1, background:"rgba(255,255,255,0.01)", padding:8, borderRadius:8}}>Leitura: 32MB/s</div>
                <div style={{flex:1, background:"rgba(255,255,255,0.01)", padding:8, borderRadius:8}}>Escrita: 18MB/s</div>
              </div>
            </div>

            <div className="panel">
              <div className="small-muted">Rede</div>
              <div style={{display:"flex", gap:12, marginTop:8}}>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700}}>Download 28.4 Mbps</div>
                  <Sparkline data={net.downHistory.slice(-40)} />
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700}}>Upload 4.1 Mbps</div>
                  <Sparkline data={net.upHistory.slice(-40)} />
                </div>
              </div>
            </div>
          </div>

          <aside style={{display:"flex", flexDirection:"column", gap:12}}>
            <div className="panel">
              <div className="small-muted">Resumo do Sistema</div>
              <div style={{fontWeight:700, marginTop:6}}>Estável • Conexão: Online</div>
              <div style={{marginTop:8, color:"var(--muted)"}}>Uptime 3h 12m • Temperatura média 63°C</div>
            </div>

            <div className="panel">
              <div className="small-muted">Alertas Recentes</div>
              <ul style={{marginTop:8, paddingLeft:16}}>
                <li style={{marginBottom:6}}>Aviso: pico de CPU (82%) — 12m</li>
                <li style={{marginBottom:6}}>Info: Backup concluído — 1h</li>
              </ul>
            </div>

            <div className="panel">
              <div className="small-muted">Ações Rápidas</div>
              <div style={{display:"flex", gap:8, marginTop:8}}>
                <button className="btn">Reiniciar módulos</button>
                <button className="btn">Iniciar diagnóstico</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}