import { FileNode } from "../../components/Files/FileTree";

const files: FileNode[] = [
  { name:"src", type:"folder", path:"/src", children:[
    { name:"components", type:"folder", path:"/src/components", children:[
      { name:"App.tsx", type:"file", path:"/src/components/App.tsx", size:"3.2 KB", preview:"export default function App(){ /* ... */ }" },
      { name:"Sidebar.tsx", type:"file", path:"/src/components/Sidebar.tsx", size:"5.2 KB", preview:"Sidebar component code preview..." }
    ]},
    { name:"routes", type:"folder", path:"/src/routes", children:[
      { name:"Dashboard.tsx", type:"file", path:"/src/routes/Dashboard.tsx", size:"4.3 KB", preview:"Dashboard page..." }
    ]},
    { name:"main.tsx", type:"file", path:"/src/main.tsx", size:"1.2 KB", preview:"main bootstrapping code" }
  ]},
  { name:"package.json", type:"file", path:"/package.json", size:"2 KB", preview:'{ "name":"aurora-control" }' },
  { name:"README.md", type:"file", path:"/README.md", size:"1 KB", preview:"# AURORA" }
];

export default files;