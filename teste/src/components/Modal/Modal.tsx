import React from "react";

export default function Modal({ children, open, onClose }: { children: React.ReactNode; open: boolean; onClose: () => void; }){
  if(!open) return null;
  return (
    <div style={{position:"fixed", inset:0, zIndex:1200, display:"flex", alignItems:"center", justifyContent:"center"}}>
      <div onClick={onClose} style={{position:"absolute", inset:0, background:"rgba(0,0,0,0.45)"}} />
      <div style={{position:"relative", background:"var(--glass)", borderRadius:12, padding:20, width:480, boxShadow:"0 20px 60px rgba(0,0,0,0.6)", border:"1px solid rgba(255,255,255,0.04)"}}>
        {children}
      </div>
    </div>
  );
}
