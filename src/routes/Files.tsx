import React, { useState } from "react";
import FileTree, { FileNode } from "../components/Files/FileTree";
import sampleFiles from "../data/mocks/files";

export default function Files(){
  const [selected, setSelected] = useState<FileNode | null>(null);
  return (
    <div style={{padding:12}}>
      <div className="module-title">Explorador de Arquivos</div>
      <div style={{display:"grid", gridTemplateColumns:"320px 1fr", gap:12, marginTop:12}}>
        <div className="panel" style={{height:520, overflow:"auto"}}>
          <FileTree root={sampleFiles} onSelect={(f)=>setSelected(f)} />
        </div>
        <div className="panel" style={{height:520}}>
          {selected ? (
            <div>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <div style={{fontWeight:700}}>{selected.name}</div>
                <div style={{color:"var(--muted)"}}>{selected.size ?? ""}</div>
              </div>
              <div style={{marginTop:8, color:"var(--muted)"}}>Caminho: {selected.path}</div>
              <div style={{marginTop:12, background:"rgba(255,255,255,0.01)", padding:12, borderRadius:8}}>
                <pre style={{whiteSpace:"pre-wrap", fontFamily:"ui-monospace,monospace"}}>{selected.preview ?? "Sem preview disponível."}</pre>
              </div>
            </div>
          ) : (
            <div style={{color:"var(--muted)"}}>Selecione um arquivo à esquerda para ver detalhes e visualização.</div>
          )}
        </div>
      </div>
    </div>
  );
}