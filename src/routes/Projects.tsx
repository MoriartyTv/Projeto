import React, { useState } from "react";
import projectsData from "../data/mocks/projects";

export default function Projects(){
  const [projects, setProjects] = useState(projectsData);

  function toggleFavorite(id:string){
    setProjects(ps => ps.map(p => p.id === id ? {...p, favorite: !p.favorite} : p));
  }

  return (
    <div style={{padding:12}}>
      <div className="module-title">Projetos</div>
      <div style={{display:"grid", gridTemplateColumns:"1fr 360px", gap:12, marginTop:12}}>
        <div>
          <div style={{display:"grid", gap:10}}>
            {projects.map(p=>(
              <div key={p.id} className="panel" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div>
                  <div style={{fontWeight:800}}>{p.name} {p.favorite && <span style={{color:"var(--accent-2)"}}>★</span>}</div>
                  <div style={{color:"var(--muted)"}}>{p.language} • {p.status} • Última alteração: {p.updated}</div>
                  <div style={{height:8, background:"rgba(255,255,255,0.02)", borderRadius:8, marginTop:8, width:220}}>
                    <div style={{width:`${p.progress}%`, height:8, background:"linear-gradient(90deg,var(--accent),var(--accent-2))", borderRadius:8}} />
                  </div>
                </div>
                <div style={{display:"flex", flexDirection:"column", gap:8, alignItems:"flex-end"}}>
                  <div style={{fontWeight:800}}>{p.progress}%</div>
                  <button className="btn" onClick={()=>toggleFavorite(p.id)}>{p.favorite ? "Desfavoritar" : "Favoritar"}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="panel">
          <div style={{fontWeight:700}}>Atalhos</div>
          <div style={{marginTop:8, display:"flex", flexDirection:"column", gap:8}}>
            <button className="btn">Novo Projeto</button>
            <button className="btn">Importar</button>
          </div>
        </aside>
      </div>
    </div>
  );
}