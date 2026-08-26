import React, { useEffect, useRef, useState } from "react";

/**
 * Lightweight 3D-looking cube using canvas + manual rotation (not three.js).
 * Prepared to be replaced by three.js later.
 */
export default function Visualization3D(){
  const cvsRef = useRef<HTMLCanvasElement|null>(null);
  const [rot, setRot] = useState({x: 0.6, y: 0.6});
  const dragging = useRef(false);
  const last = useRef<{x:number,y:number}|null>(null);

  useEffect(()=>{
    const cvs = cvsRef.current!;
    const ctx = cvs.getContext("2d")!;
    let raf = 0;
    function draw(){
      const w = cvs.width = cvs.clientWidth * devicePixelRatio;
      const h = cvs.height = cvs.clientHeight * devicePixelRatio;
      ctx.clearRect(0,0,w,h);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      ctx.translate(cvs.clientWidth/2, cvs.clientHeight/2);
      // cube 2D projection
      const size = Math.min(cvs.clientWidth, cvs.clientHeight)/4;
      const s = size;
      const xRot = rot.x;
      const yRot = rot.y;
      // simple vertices
      const verts = [
        project([-s,-s,-s], xRot, yRot),
        project([ s,-s,-s], xRot, yRot),
        project([ s, s,-s], xRot, yRot),
        project([-s, s,-s], xRot, yRot),
        project([-s,-s, s], xRot, yRot),
        project([ s,-s, s], xRot, yRot),
        project([ s, s, s], xRot, yRot),
        project([-s, s, s], xRot, yRot),
      ];
      const faces = [
        [0,1,2,3],
        [4,5,6,7],
        [0,1,5,4],
        [2,3,7,6],
        [1,2,6,5],
        [0,3,7,4]
      ];
      // painter's algorithm by avg z
      const faceDepths = faces.map((f,i)=>({i,depth: (verts[f[0]][2]+verts[f[1]][2]+verts[f[2]][2]+verts[f[3]][2])/4 }));
      faceDepths.sort((a,b)=>a.depth-b.depth);
      for(const fd of faceDepths){
        const f = faces[fd.i];
        ctx.beginPath();
        ctx.moveTo(verts[f[0]][0], verts[f[0]][1]);
        for(let j=1;j<f.length;j++) ctx.lineTo(verts[f[j]][0], verts[f[j]][1]);
        ctx.closePath();
        ctx.fillStyle = `rgba(0,194,255,${0.06 + (0.9 - fd.depth/1000) * 0.25})`;
        ctx.fill();
        ctx.strokeStyle = "rgba(102,240,255,0.12)";
        ctx.stroke();
      }
      ctx.restore();
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return ()=> cancelAnimationFrame(raf);

    function project([x,y,z]: [number,number,number], rx:number, ry:number){
      // rotate
      const cosy = Math.cos(ry), siny = Math.sin(ry);
      const cosx = Math.cos(rx), sinx = Math.sin(rx);
      let x1 = x * cosy + z * siny;
      let z1 = -x * siny + z * cosy;
      let y1 = y * cosx - z1 * sinx;
      z1 = y * sinx + z1 * cosx;
      const scale = 400 / (600 + z1);
      return [x1*scale, y1*scale, z1];
    }
  }, [rot]);

  return (
    <div style={{padding:12}}>
      <div className="module-title">Visualização 3D</div>
      <div className="panel" style={{height:480, display:"flex", flexDirection:"column"}}>
        <div style={{flex:1}}>
          <canvas ref={cvsRef} style={{width:"100%", height:"100%", borderRadius:8, background:"linear-gradient(180deg, rgba(255,255,255,0.008), rgba(255,255,255,0.004))"}} />
        </div>
        <div style={{display:"flex", gap:8, marginTop:8}}>
          <div className="small-muted">Rotação X</div>
          <input type="range" min={0} max={6.28} step={0.01} value={rot.x} onChange={(e)=>setRot(r=>({...r, x: Number(e.target.value)}))} />
          <div className="small-muted">Rotação Y</div>
          <input type="range" min={0} max={6.28} step={0.01} value={rot.y} onChange={(e)=>setRot(r=>({...r, y: Number(e.target.value)}))} />
        </div>
      </div>
    </div>
  );
}