import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { useAI } from "../../state/aiStore";

export default function AISettingsModal({ open, onClose }: { open: boolean; onClose: () => void }){
  const { mode, model, setMode, setModel } = useAI();
  const [m, setM] = useState(mode);
  const [mod, setMod] = useState(model);

  React.useEffect(()=>{ if(open){ setM(mode); setMod(model); } }, [open, mode, model]);

  function save(){
    setMode(m as any);
    setModel(mod);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{display:"flex", flexDirection:"column", gap:12}}>
        <h3 style={{margin:0}}>Configurações de IA</h3>
        <div>
          <label className="small-muted">Modo</label>
          <div style={{marginTop:6}}>
            <select className="select" value={m} onChange={(e)=>setM(e.target.value as any)}>
              <option value="disabled">Desativado</option>
              <option value="local">Local (MSW)</option>
              <option value="external">Externo</option>
            </select>
          </div>
        </div>
        <div>
          <label className="small-muted">Modelo</label>
          <div style={{marginTop:6}}>
            <select className="select" value={mod} onChange={(e)=>setMod(e.target.value)}>
              <option>Aurora-Lite</option>
              <option>Aurora-Pro</option>
              <option>Custom</option>
            </select>
          </div>
        </div>
        <div style={{display:"flex", justifyContent:"flex-end", gap:8, marginTop:6}}>
          <button className="btn" onClick={onClose} type="button">Cancelar</button>
          <button className="btn" onClick={save} type="button">Salvar</button>
        </div>
      </div>
    </Modal>
  );
}
