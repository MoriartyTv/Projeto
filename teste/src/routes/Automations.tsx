import React, { useState } from "react";

const initial = [
  { id:"a1", name:"Backup diário", active:true, last:"1h", next:"23:00" },
  { id:"a2", name:"Sincronizar repositório", active:false, last:"2d", next:"--" },
  { id:"a3", name:"Varredura de segurança", active:true, last:"10m", next:"2:40" }
];

export default function Automations(){
  const [list, setList] = useState(initial);
  function toggle(id:string){ setList(l=> l.map(i=> i.id===id?{...i, active:!i.active}:i)); }
  return (
    <div style={{padding:12}}>
      <div className="module-title">Automações</div>
      <div style={{display:"grid", gridTemplateColumns:"1fr 320px", gap:12, marginTop:12}}>
        <div>
          {list.map(it=>(
            <div key={it.id} className="panel" style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8}}>
              <div>
                <div style={{fontWeight:700}}>{it.name}</div>
                <div style={{color:"var(--muted)"}}>Última: {it.last} • Próxima: {it.next}</div>
              </div>
              <div style={{display:"flex", flexDirection:"column", gap:6, alignItems:"flex-end"}}>
                <div style={{fontSize:13, color: it.active ? "var(--success)" : "var(--muted)"}}>{it.active ? "Ativo" : "Inativo"}</div>
                <button className="btn" onClick={()=>toggle(it.id)}>{it.active ? "Desativar" : "Ativar"}</button>
              </div>
            </div>
          ))}
        </div>

        <aside className="panel">
          <div style={{fontWeight:700}}>Execuções recentes</div>
          <ul style={{marginTop:8}}>
            <li style={{color:"var(--muted)"}}>Backup diário — concluído 1h</li>
            <li style={{color:"var(--muted)"}}>Varredura de segurança — 10m</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}