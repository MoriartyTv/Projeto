import React, { useEffect, useRef, useState } from "react";

/**
 * Robust 3D-looking cube using canvas with pointer drag to rotate.
 * Fixes: angle normalization, clamping, resize handling, safer projection and tuned inertia.
 */
export default function Visualization3D(){
  const cvsRef = useRef<HTMLCanvasElement|null>(null);
  const [rot, setRot] = useState({x: 0.6, y: 0.6});
  const dragging = useRef(false);
  const last = useRef<{x:number,y:number}|null>(null);
  const velocity = useRef({vx:0, vy:0});
  const rafRef = useRef<number|0>(0);

  // normalize angle to 0..2PI
  function norm(a:number){
    const two = Math.PI*2;
    return ((a % two) + two) % two;
  }

  useEffect(()=>{
    const cvs = cvsRef.current!;
    const ctx = cvs.getContext("2d")!;

    let lastTimestamp = performance.now();

    function updateCanvasSize(){
      if(!cvs) return;
      const w = Math.max(1, Math.floor(cvs.clientWidth * devicePixelRatio));
      const h = Math.max(1, Math.floor(cvs.clientHeight * devicePixelRatio));
      if(cvs.width !== w || cvs.height !== h){
        cvs.width = w; cvs.height = h;
      }
    }

    updateCanvasSize();

    const ro = new ResizeObserver(()=>{ updateCanvasSize(); });
    ro.observe(cvs);

    function draw(ts?: number){
      const now = ts || performance.now();
      const dt = Math.max(1, now - lastTimestamp);
      lastTimestamp = now;

      if(!cvs) return;
      updateCanvasSize();

      const w = cvs.width, h = cvs.height;
      ctx.clearRect(0,0,w,h);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      ctx.translate(cvs.clientWidth/2, cvs.clientHeight/2);

      ctx.imageSmoothingEnabled = true;

      // cube 2D projection
      const size = Math.min(cvs.clientWidth, cvs.clientHeight)/4;
      const s = size;
      // ensure angles normalized
      let xRot = norm(rot.x);
      let yRot = norm(rot.y);

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

      // painter's algorithm by avg z (farther first)
      const faceDepths = faces.map((f,i)=>({i,depth: (verts[f[0]][2]+verts[f[1]][2]+verts[f[2]][2]+verts[f[3]][2])/4 }));
      faceDepths.sort((a,b)=>a.depth-b.depth);

      for(const fd of faceDepths){
        const f = faces[fd.i];
        ctx.beginPath();
        ctx.moveTo(verts[f[0]][0], verts[f[0]][1]);
        for(let j=1;j<f.length;j++) ctx.lineTo(verts[f[j]][0], verts[f[j]][1]);
        ctx.closePath();
        // subtle shading based on depth
        const shade = Math.max(0.06, 0.25 - fd.depth/1500);
        ctx.fillStyle = `rgba(0,194,255,${shade})`;
        ctx.fill();
        ctx.strokeStyle = "rgba(102,240,255,0.12)";
        ctx.stroke();
      }

      ctx.restore();

      // inertia integration when not dragging
      if(!dragging.current){
        // apply velocity with decay
        const decay = 0.90;
        velocity.current.vx *= decay;
        velocity.current.vy *= decay;
        const vx = velocity.current.vx * 0.002; // scale down pixel velocity
        const vy = velocity.current.vy * 0.002;
        if(Math.abs(vx) > 0.0001 || Math.abs(vy) > 0.0001){
          setRot(r=>({ x: norm(r.x + vy * (dt/16)), y: norm(r.y + vx * (dt/16)) }));
        } else {
          velocity.current.vx = 0; velocity.current.vy = 0;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return ()=>{ cancelAnimationFrame(rafRef.current as number); ro.disconnect(); };

    function project([x,y,z]: [number,number,number], rx:number, ry:number){
      // rotate
      const cosy = Math.cos(ry), siny = Math.sin(ry);
      const cosx = Math.cos(rx), sinx = Math.sin(rx);
      let x1 = x * cosy + z * siny;
      let z1 = -x * siny + z * cosy;
      let y1 = y * cosx - z1 * sinx;
      z1 = y * sinx + z1 * cosx;
      // focal length based on canvas size for stable perspective
      const minSide = Math.max(200, Math.min(cvs.clientWidth, cvs.clientHeight));
      const focal = minSide * 1.2;
      const denom = focal + z1 + 300;
      const scale = denom > 0 ? focal / denom : 1;
      return [x1*scale, y1*scale, z1];
    }
  }, [rot]);

  // pointer handlers attached directly to the canvas element
  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>){
    const cvs = cvsRef.current!;
    try{ cvs.setPointerCapture(e.pointerId); }catch(_){ }
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    velocity.current = {vx:0, vy:0};
    // visual feedback
    if(cvs) cvs.style.cursor = 'grabbing';
  }
  function handlePointerUp(e: React.PointerEvent<HTMLCanvasElement>){
    const cvs = cvsRef.current!;
    try{ cvs.releasePointerCapture(e.pointerId); }catch(_){ }
    dragging.current = false;
    last.current = null;
    // restore cursor
    if(cvs) cvs.style.cursor = 'grab';
  }
  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>){
    if(!dragging.current || !last.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    // sensibility tuned to feel natural, clamp incremental change
    const incX = dy * 0.008;
    const incY = dx * 0.008;
    setRot(r=>({ x: norm(r.x + incX), y: norm(r.y + incY) }));
    // velocity in px per frame (smoothed)
    velocity.current.vx = velocity.current.vx * 0.6 + dx * 0.4;
    velocity.current.vy = velocity.current.vy * 0.6 + dy * 0.4;
    last.current = { x: e.clientX, y: e.clientY };
  }

  // reset function
  function reset(){ setRot({x:0.6, y:0.6}); velocity.current = {vx:0, vy:0}; }

  return (
    <div style={{padding:12}}>
      <div className="module-title">Visualização 3D</div>
      <div className="panel" style={{height:480, display:"flex", flexDirection:"column"}}>
        <div style={{flex:1}}>
          <canvas
            ref={cvsRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={{width:"100%", height:"100%", display:'block', borderRadius:8, background:"linear-gradient(180deg, rgba(255,255,255,0.008), rgba(255,255,255,0.004))", cursor: 'grab', touchAction: 'none'}}
          />
        </div>
        <div style={{display:"flex", gap:8, marginTop:8, alignItems:'center'}}>
          <div className="small-muted">Rotação X</div>
          <input type="range" min={0} max={6.28} step={0.01} value={rot.x} onChange={(e)=>setRot(r=>({...r, x: Number(e.target.value)}))} />
          <div className="small-muted">Rotação Y</div>
          <input type="range" min={0} max={6.28} step={0.01} value={rot.y} onChange={(e)=>setRot(r=>({...r, y: Number(e.target.value)}))} />
          <button className="btn" onClick={reset} style={{marginLeft:8}}>Reset</button>
        </div>
      </div>
    </div>
  );
}
