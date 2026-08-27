import React from "react";
import { useUI } from "../state/uiStore";

export default function Settings(){
  const { state, dispatch } = useUI();
  return (
    <div style={{padding:12}}>
      <div className="module-title">Configurações</div>
      <div style={{display:"grid", gridTemplateColumns:"1fr 360px", gap:12, marginTop:12}}>
        <div className="panel">
          <div style={{fontWeight:700}}>Aparência</div>
          <div style={{marginTop:8}}>
            <label className="small-muted">Intensidade de brilho</label>
            <input type="range" min={10} max={100} value={state.brightness} onChange={(e)=>dispatch({type:"SET_BRIGHTNESS", payload: Number(e.target.value)})} />
          </div>

          <div style={{marginTop:12}}>
            <label className="small-muted">Efeitos visuais</label>
            <div style={{marginTop:6}}>
              <button className="btn" onClick={()=>dispatch({type:"SET_EFFECTS", payload: !state.effectsEnabled})}>{state.effectsEnabled ? "Desativar efeitos" : "Ativar efeitos"}</button>
            </div>
          </div>

          <div style={{marginTop:12}}>
            <label className="small-muted">Reduzir animações</label>
            <div style={{marginTop:6}}>
              <button className="btn" onClick={()=>dispatch({type:"SET_REDUCED_MOTION", payload: !state.reducedMotion})}>{state.reducedMotion ? "Desativar reduced-motion" : "Ativar reduced-motion"}</button>
            </div>
          </div>
        </div>

        <aside className="panel">
          <div style={{fontWeight:700}}>Interface</div>
          <div style={{marginTop:8}}>
            <button className="btn" onClick={()=>dispatch({type:"TOGGLE_SIDEBAR"})}>{state.sidebarCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}</button>
          </div>
        </aside>
      </div>
    </div>
  );
}