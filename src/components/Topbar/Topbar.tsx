import React, { useState } from "react";
import { FiSearch, FiBell, FiSettings, FiMenu, FiX } from "react-icons/fi";
import useClock from "../../hooks/useClock";

function RusticMenu({ open, onClose }: { open: boolean; onClose: () => void }){
  if(!open) return null;
  const items = Array.from({length:30}, (_,i)=>`Opção Rústica ${i+1}`);
  return (
    <div role="dialog" aria-modal="true" style={{position:'fixed', inset:0, zIndex:2500, display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div onClick={onClose} style={{position:'absolute', inset:0, background:'rgba(0,0,0,0.55)'}} />
      <div style={{position:'relative', width:'92%', maxWidth:1200, height:'86%', borderRadius:12, overflow:'hidden', boxShadow:'0 30px 80px rgba(0,0,0,0.8)', border:'6px solid #3b2a20', background: 'linear-gradient(180deg,#3b2a20,#5b3a29)'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:20, borderBottom:'4px solid rgba(255,255,255,0.03)'}}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <div style={{width:64, height:64, borderRadius:8, background:'#2b1a10', display:'flex', alignItems:'center', justifyContent:'center', color:'#ffddaa', fontWeight:800, fontSize:18, boxShadow:'inset 0 4px 12px rgba(0,0,0,0.6)'}}>A</div>
            <div>
              <div style={{fontSize:22, fontWeight:900, color:'#FFDD99', letterSpacing:1}}>MENU RÚSTICO</div>
              <div style={{color:'#e6c9a8', fontSize:13}}>Teste temporário — visual marcante</div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Fechar menu" style={{background:'#2b1a10', border:'2px solid rgba(255,255,255,0.04)', color:'#FFDD99', padding:'10px 12px', borderRadius:8, cursor:'pointer', display:'flex', alignItems:'center', gap:8}}><FiX/> Fechar</button>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:14, padding:18, height:'calc(100% - 108px)', overflow:'auto'}}>
          {items.map((it,idx)=> (
            <div key={it} tabIndex={0} style={{background:'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06))', border:'4px solid rgba(0,0,0,0.35)', padding:18, borderRadius:10, minHeight:110, display:'flex', flexDirection:'column', justifyContent:'space-between', boxShadow:'inset 0 -10px 30px rgba(0,0,0,0.4)'}}>
              <div style={{fontWeight:800, color:'#FFE9B8', fontSize:16, textTransform:'uppercase', letterSpacing:1}}>{it}</div>
              <div style={{color:'#d9bfa0', fontSize:13}}>Ação rápida · teste · {idx+1}</div>
              <div style={{display:'flex', gap:8, marginTop:10}}>
                <button className="btn" style={{flex:1}}>Abrir</button>
                <button className="btn ghost" style={{flex:1}}>Ação</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{position:'absolute', right:12, bottom:12, color:'#EEDDBB', fontSize:12}}>Pressione ESC para fechar</div>
      </div>
    </div>
  );
}

export default function Topbar({ title }:{title:string}){
  const clock = useClock();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="topbar panel" role="banner" aria-label="Barra superior" style={{flexDirection:'column', alignItems:'stretch'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div className="row">
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <button onClick={()=>setMenuOpen(true)} aria-label="Abrir menu" style={{marginRight:6, padding:8, borderRadius:8, border:'1px solid rgba(255,255,255,0.04)', background:'linear-gradient(180deg,#28160c,#3b2a20)'}}><FiMenu/></button>
              <div className="module-title">{title}</div>
            </div>
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
        </div>

        <div style={{marginTop:12}}>
          <div style={{fontWeight:700, marginBottom:8}}>Menu de Teste (temporário)</div>
          <div style={{display:'flex', gap:12, overflowX:'auto'}}>
            {Array.from({length:12}, (_,i)=>(
              <div key={i} className="panel" style={{minWidth:160, padding:10, textAlign:'center'}}>
                <div style={{fontWeight:700}}>Item {i+1}</div>
                <div style={{color:'var(--muted)', fontSize:13, marginTop:6}}>Subação {i+1}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <RusticMenu open={menuOpen} onClose={()=>setMenuOpen(false)} />
    </>
  );
}
