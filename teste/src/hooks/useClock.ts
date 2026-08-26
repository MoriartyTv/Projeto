import { useEffect, useState } from "react";

export default function useClock(){
  const [now, setNow] = useState(new Date());
  useEffect(()=>{
    const t = setInterval(()=> setNow(new Date()), 1000);
    return ()=> clearInterval(t);
  },[]);
  const time = now.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", second: "2-digit"});
  const date = now.toLocaleDateString([], {weekday: "short", month: "short", day: "numeric"});
  return { time, date, raw: now };
}