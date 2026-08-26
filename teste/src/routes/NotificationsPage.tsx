import React from "react";
import { useNotifications } from "../state/notifications";

export default function NotificationsPage(){
  const { notifications, push, remove } = useNotifications();
  return (
    <div style={{padding:12}}>
      <div className="module-title">Notificações</div>
      <div style={{display:"grid", gridTemplateColumns:"1fr 320px", gap:12, marginTop:12}}>
        <div className="panel">
          <div style={{fontWeight:700}}>Inbox</div>
          <div style={{marginTop:10, display:"grid", gap:8}}>
            {notifications.length === 0 && <div style={{color:"var(--muted)"}}>Sem notificações recentes.</div>}
            {notifications.map(n=>(
              <div key={n.id} className="panel" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div>
                  <div style={{fontWeight:700}}>{n.title}</div>
                  <div style={{color:"var(--muted)", fontSize:13}}>{n.description}</div>
                </div>
                <div style={{display:"flex", flexDirection:"column", gap:6}}>
                  <div style={{fontSize:12, color:"var(--muted)"}}>{new Date(n.ts).toLocaleTimeString()}</div>
                  <button className="btn" onClick={()=>remove(n.id)}>Fechar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="panel">
          <div style={{fontWeight:700}}>Gerar notificação</div>
          <div style={{marginTop:8, display:"flex", gap:8}}>
            <button className="btn" onClick={()=>push({title:"Teste info", description:"Mensagem informativa", type:"info"})}>Info</button>
            <button className="btn" onClick={()=>push({title:"Sucesso", description:"Operação concluída", type:"success"})}>Success</button>
            <button className="btn" onClick={()=>push({title:"Aviso", description:"Algo requer atenção", type:"warn"})}>Warn</button>
            <button className="btn" onClick={()=>push({title:"Erro", description:"Falha detectada", type:"err"})}>Err</button>
          </div>
        </aside>
      </div>
    </div>
  );
}