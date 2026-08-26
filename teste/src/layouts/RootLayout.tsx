import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";

export default function RootLayout() {
  const location = useLocation();
  return (
    <div className="app-shell" role="application" aria-label="Aurora Control">
      <Sidebar />
      <div className="main-area" style={{minWidth:0}}>
        <Topbar title={getTitleFromPath(location.pathname)} />
        <div style={{paddingTop:8, paddingBottom:8, paddingLeft:0, paddingRight:0, minHeight:0}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function getTitleFromPath(path: string){
  if(path === "/" || path === "") return "Dashboard";
  const p = path.split("/")[1] || "Dashboard";
  return p.charAt(0).toUpperCase() + p.slice(1);
}