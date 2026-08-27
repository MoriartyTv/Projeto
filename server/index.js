import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const port = Number(process.env.PORT || 8787);
const state = {
  startedAt: Date.now(),
  automation: [
    { id:'telemetry', name:'Telemetry refresh', schedule:'10 seconds', active:true, runs:1284 },
    { id:'snapshot', name:'Project snapshot', schedule:'30 minutes', active:true, runs:86 },
    { id:'astro', name:'Astronomy sync', schedule:'Daily 21:00', active:false, runs:31 },
    { id:'cleanup', name:'Workspace cleanup', schedule:'Sunday 03:00', active:true, runs:12 }
  ],
  notifications: []
};

function metrics(){
  const t = Date.now()/1000;
  return {
    cpu: Math.round(34 + Math.sin(t/4)*8 + Math.sin(t/1.7)*3),
    gpu: Math.round(43 + Math.sin(t/5)*11),
    ram: Math.round(59 + Math.sin(t/13)*3),
    temp: Math.round(53 + Math.sin(t/8)*4),
    network: Math.round(160 + Math.abs(Math.sin(t/3))*115),
    uptime: Math.floor((Date.now()-state.startedAt)/1000)
  };
}

function json(res, code, data){ res.writeHead(code, {'Content-Type':'application/json','Access-Control-Allow-Origin':'*','Cache-Control':'no-store'}); res.end(JSON.stringify(data)); }
function body(req){ return new Promise(resolve=>{let s=''; req.on('data',c=>s+=c); req.on('end',()=>{try{resolve(s?JSON.parse(s):{})}catch{resolve({})}})}) }

const server=createServer(async(req,res)=>{
  if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type'});return res.end()}
  const url=new URL(req.url,`http://${req.headers.host}`);
  if(url.pathname==='/api/health') return json(res,200,{ok:true,service:'AURORA API',version:'2.0.0',time:new Date().toISOString()});
  if(url.pathname==='/api/metrics') return json(res,200,metrics());
  if(url.pathname==='/api/automations' && req.method==='GET') return json(res,200,state.automation);
  if(url.pathname.startsWith('/api/automations/') && req.method==='PATCH'){
    const id=url.pathname.split('/').pop(); const b=await body(req); const item=state.automation.find(x=>x.id===id);
    if(!item) return json(res,404,{error:'Automation not found'}); if(typeof b.active==='boolean') item.active=b.active; if(b.active) item.runs++; return json(res,200,item);
  }
  if(url.pathname==='/api/notifications' && req.method==='GET') return json(res,200,state.notifications);
  if(url.pathname==='/api/notifications' && req.method==='POST'){
    const b=await body(req); const n={id:crypto.randomUUID(),type:b.type||'info',title:b.title||'AURORA event',text:b.text||'',time:new Date().toISOString()}; state.notifications.unshift(n); return json(res,201,n);
  }
  if(url.pathname==='/api/system/summary') return json(res,200,{status:'operational',modules:12,channels:18,region:'LOCAL',metrics:metrics()});
  if(url.pathname==='/api') return json(res,200,{name:'AURORA API',endpoints:['/api/health','/api/metrics','/api/automations','/api/notifications','/api/system/summary']});
  if(url.pathname==='/') { const p=join(process.cwd(),'index.html'); if(existsSync(p)){res.writeHead(200,{'Content-Type':'text/html'});return res.end(readFileSync(p))} }
  res.writeHead(404); res.end('Not found');
});
server.listen(port,()=>console.log(`AURORA API listening on http://localhost:${port}`));
