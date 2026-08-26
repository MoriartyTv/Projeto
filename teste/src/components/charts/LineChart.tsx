import React from "react";

/**
 * Simple SVG line chart with area fill. Accepts width/height and numeric data.
 * Lightweight, responsive, and accessible.
 */
export default function LineChart({ data, width = 600, height = 140, color = "url(#g)" }: { data:number[]; width?:number; height?:number; color?:string }) {
  const w = width;
  const h = height;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / ((max - min) || 1)) * h;
    return `${x},${y}`;
  }).join(" ");

  const area = data.map((v,i)=>{
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / ((max - min) || 1)) * h;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} aria-hidden="true" className="chart-line">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="rgba(0,194,255,0.9)" />
          <stop offset="1" stopColor="rgba(102,240,255,0.35)" />
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`${area} ${w},${h} 0,${h}`} fill="rgba(0,194,255,0.06)"/>
    </svg>
  );
}