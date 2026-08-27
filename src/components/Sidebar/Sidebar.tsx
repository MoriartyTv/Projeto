import React from "react";
import { NavLink } from "react-router-dom";
import { FiGrid, FiCpu, FiShield, FiFolder, FiTerminal, FiArchive, FiGlobe, FiTrendingUp, FiRepeat, FiBell, FiSettings, FiInfo } from "react-icons/fi";
import logo from "../../assets/logo.svg";
import { useUI } from "../../state/uiStore";

const items = [
  { to: "/", label: "Dashboard", icon: <FiGrid /> },
  { to: "/monitoring", label: "Monitoramento", icon: <FiCpu /> },
  { to: "/ai", label: "Inteligência", icon: <FiShield /> },
  { to: "/files", label: "Arquivos", icon: <FiFolder /> },
  { to: "/terminal", label: "Terminal", icon: <FiTerminal /> },
  { to: "/projects", label: "Projetos", icon: <FiArchive /> },
  { to: "/astronomy", label: "Astronomia", icon: <FiGlobe /> },
  { to: "/visualization", label: "Visualização 3D", icon: <FiTrendingUp /> },
  { to: "/automations", label: "Automações", icon: <FiRepeat /> },
  { to: "/notifications", label: "Notificações", icon: <FiBell /> },
  { to: "/settings", label: "Configurações", icon: <FiSettings /> },
  { to: "/about", label: "Sobre", icon: <FiInfo /> }
];

export default function Sidebar(){
  const { state, dispatch } = useUI();
  return (
    <aside className={`sidebar ${state.sidebarCollapsed ? "collapsed": ""}`} aria-label="Barra lateral">
      <div className="row" style={{justifyContent: state.sidebarCollapsed ? "center" : "space-between"}}>
        <div style={{display:"flex", gap:12, alignItems:"center"}}>
          <img src={logo} alt="Aurora" style={{width:36, height:36}}/>
          {!state.sidebarCollapsed && <div style={{display:"flex",flexDirection:"column"}}>
            <strong style={{fontSize:14}}>AURORA</strong>
            <small style={{color:"var(--muted)", fontSize:12}}>Central de Controle</small>
          </div>}
        </div>
        <button aria-label="Colapsar sidebar" onClick={()=>dispatch({type:"TOGGLE_SIDEBAR"})} style={{background:"transparent", border:"none", color:"var(--muted)"}}>
          {state.sidebarCollapsed ? "⯈" : "⯆"}
        </button>
      </div>

      <nav style={{display:"flex", flexDirection:"column", gap:6, marginTop:8}} aria-label="Navegação principal">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({isActive}) => "row panel" + (isActive ? " active" : "")}
            style={{alignItems:"center", padding:"10px", textDecoration:"none", color:"var(--text)"}}
            >
            <div style={{width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--accent)"}}>
              {it.icon}
            </div>
            {!state.sidebarCollapsed && <div style={{marginLeft:8}}>{it.label}</div>}
          </NavLink>
        ))}
      </nav>

      <div style={{marginTop:"auto"}} className="panel" aria-hidden={false}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>
            <div style={{fontSize:12, color:"var(--muted)"}}>Status</div>
            <div style={{fontWeight:700}}>Online</div>
          </div>
          <div style={{width:36, height:36, borderRadius:999, background:"linear-gradient(180deg,var(--accent),var(--accent-2))", boxShadow:"0 6px 18px rgba(0,194,255,0.12)"}} aria-hidden></div>
        </div>
        {!state.sidebarCollapsed && <div style={{marginTop:10, fontSize:12, color:"var(--muted)"}}>CPU 12% • RAM 34% • Storage 72%</div>}
      </div>
    </aside>
  );
}