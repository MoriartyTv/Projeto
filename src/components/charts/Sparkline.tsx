import React from "react";

export default function Sparkline({ data, height=36 }: { data:number[]; height?:number }) {
  const w=140;
  const h=height;
  const max = Math.max(...data,1);
  const min = Math.min(...data,0);
  const points = data.map((v,i)=>{
    const x = (i/(data.length-1))*w;
    const y = h - ((v - min)/(max-min || 1))*h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="chart-spark" aria-hidden="true">
      <defs>
        <linearGradient id="sg" x1="0" x2="1">
          <stop offset="0" stopColor="rgba(0,194,255,0.9)"/>
          <stop offset="1" stopColor="rgba(102,240,255,0.6)"/>
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke="url(#sg)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}