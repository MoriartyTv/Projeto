import { useEffect, useRef, useState } from "react";

// small helper: lerp
function lerp(a:number,b:number,t:number){ return a + (b-a)*t; }

export type Metric = {
  value:number;
  history:number[];
};

export default function useSimulator(){
  const [cpu, setCpu] = useState<Metric>({value:12, history:Array(60).fill(12)});
  const [gpu, setGpu] = useState<Metric>({value:8, history:Array(60).fill(8)});
  const [ram, setRam] = useState<Metric>({value:34, history:Array(60).fill(34)});
  const raf = useRef<number | null>(null);
  const tRef = useRef(0);

  useEffect(()=>{
    let last = performance.now();
    function step(now: number){
      const dt = (now - last) / 1000;
      last = now;
      tRef.current += dt;

      // every 0.7s propose a small target change
      if (tRef.current > 0.7){
        tRef.current = 0;
        // propose new targets (small random walk)
        const newCpu = clamp(cpu.value + (Math.random()-0.45)*6, 4, 92);
        const newGpu = clamp(gpu.value + (Math.random()-0.45)*4, 2, 96);
        const newRam = clamp(ram.value + (Math.random()-0.45)*3, 10, 96);

        // smooth towards them over next frames
        setCpu(prev => {
          const v = lerp(prev.value, newCpu, 0.18);
          const h = [...prev.history.slice(-119), v].slice(-120);
          return { value: v, history: h };
        });
        setGpu(prev => {
          const v = lerp(prev.value, newGpu, 0.14);
          const h = [...prev.history.slice(-119), v].slice(-120);
          return { value: v, history: h };
        });
        setRam(prev => {
          const v = lerp(prev.value, newRam, 0.12);
          const h = [...prev.history.slice(-119), v].slice(-120);
          return { value: v, history: h };
        });
      } else {
        // micro-smoothing each frame
        setCpu(prev => {
          const v = clamp(prev.value + (Math.random()-0.5)*0.6, 0, 100);
          const h = [...prev.history.slice(-119), v].slice(-120);
          return { value: v, history: h };
        });
        setGpu(prev => {
          const v = clamp(prev.value + (Math.random()-0.5)*0.4, 0, 100);
          const h = [...prev.history.slice(-119), v].slice(-120);
          return { value: v, history: h };
        });
        setRam(prev => {
          const v = clamp(prev.value + (Math.random()-0.5)*0.45, 0, 100);
          const h = [...prev.history.slice(-119), v].slice(-120);
          return { value: v, history: h };
        });
      }

      raf.current = requestAnimationFrame(step);
    }
    raf.current = requestAnimationFrame(step);
    return ()=> {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { cpu, gpu, ram };
}

function clamp(v:number, a:number, b:number){ return Math.max(a, Math.min(b, v)); }