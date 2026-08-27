import React from "react";
import { FiSearch, FiBell, FiSettings } from "react-icons/fi";
import useClock from "../../hooks/useClock";

export default function Topbar({ title }:{title:string}){
  const clock = useClock();
  return (
    <header className="topbar panel" role="banner" aria-label="Barra superior">
      <div className="row">
        <div className="module-title">{title}</div>
      </div>
      <div className="row" style={{alignItems:"center"}}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", marginRight:8}}>
          <div style={{fontWeight:600}}>{clock.time}</div>
          <div style={{fontSize:12, color:"var(--muted)"}}>{clock.date}</div>
        </div>
        <button className="panel" aria-label="Pesquisar" style={{marginRight:8}}><FiSearch/></button>
        <button className="panel" aria-label="Notificações" style={{marginRight:8}}><FiBell/></button>
        <button className="panel" aria-label="Configurações"><FiSettings/></button>
      </div>
    </header>
  );
}