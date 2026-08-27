import React from "react";
import TerminalEmulator from "../components/Terminal/TerminalEmulator";

export default function Terminal(){
  return (
    <div style={{padding:12}}>
      <div className="module-title">Terminal</div>
      <div style={{marginTop:12}}>
        <TerminalEmulator />
      </div>
    </div>
  );
}