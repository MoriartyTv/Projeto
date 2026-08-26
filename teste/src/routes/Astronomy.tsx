import React, { useState } from "react";
import planets from "../data/mocks/astronomy";

export default function Astronomy(){
  const [sel, setSel] = useState(planets[0]);
  return (
    <div style={{padding:12}}>
      <div className="module-title">Astronomia</div>
      <div style={{display:"grid", gridTemplateColumns:"320px 1fr", gap:12, marginTop:12}}>
        <div className="panel">
          <div className="small-muted">Objetos</div>
          <ul style={{marginTop:8}}>
            {planets.map(p=>(
              <li key={p.id} style={{marginBottom:8, cursor:"pointer"}} onClick={()=>setSel(p)}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                  <div>{p.name}</div>
                  <div style={{color:"var(--muted)"}}>{p.type}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel" style={{display:"grid", gridTemplateColumns:"320px 1fr", gap:12}}>
          <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <svg width="280" height="280" viewBox="0 0 280 280">
              <defs>
                <radialGradient id="planetGrad">
                  <stop offset="0" stopColor={sel.color}/>
                  <stop offset="1" stopColor="#001219" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" rx="16" fill="transparent" />
              <g transform="translate(140,140)">
                <circle r="76" fill="url(#planetGrad)" />
                <g opacity="0.12">
                  <circle r="90" stroke="rgba(255,255,255,0.03)" fill="none"/>
                </g>
              </g>
            </svg>
          </div>

          <div>
            <div style={{fontWeight:800}}>{sel.name}</div>
            <div style={{color:"var(--muted)", marginTop:6}}>{sel.description}</div>
            <div style={{marginTop:12}}>
              <div><span className="small-muted">Distância:</span> {sel.distance}</div>
              <div><span className="small-muted">Magnitude:</span> {sel.magnitude}</div>
              <div><span className="small-muted">Temperatura:</span> {sel.temperature}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}