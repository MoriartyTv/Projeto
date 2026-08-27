export const modules = [
  ['dashboard','Dashboard'],['monitor','System Monitor'],['ai','Intelligence'],['files','File Explorer'],['terminal','Terminal'],['projects','Projects'],['astronomy','Astronomy'],['visual3d','3D Visualization'],['automation','Automations'],['notifications','Notifications'],['settings','Settings'],['about','About System']
];

export const projects = [
  {name:'FlyMind Lab', type:'Neural simulation', lang:'Python', progress:72, status:'active', updated:'12 min ago'},
  {name:'Aurora Core', type:'Interface engine', lang:'TypeScript', progress:91, status:'development', updated:'34 min ago'},
  {name:'Stellar Atlas', type:'Astronomy toolkit', lang:'React', progress:48, status:'paused', updated:'2 hours ago'},
  {name:'Atmospheric Lab', type:'Storm visualization', lang:'WebGL', progress:100, status:'complete', updated:'Yesterday'}
];

export const files = [
  {name:'aurora-core', kind:'folder', size:'—'}, {name:'experiments', kind:'folder', size:'—'}, {name:'datasets', kind:'folder', size:'—'},
  {name:'system-config.json', kind:'file', size:'8.4 KB'}, {name:'neural-map.wlz', kind:'file', size:'24.7 MB'}, {name:'stellar-catalog.csv', kind:'file', size:'4.2 MB'}, {name:'README.md', kind:'file', size:'12.1 KB'}
];

export const automations = [
  {name:'System telemetry refresh', schedule:'Every 10 seconds', next:'in 8 sec', active:true},
  {name:'Project status snapshot', schedule:'Every 30 minutes', next:'in 18 min', active:true},
  {name:'Astronomy data sync', schedule:'Daily · 21:00', next:'tomorrow', active:false},
  {name:'Workspace cleanup', schedule:'Sunday · 03:00', next:'4 days', active:true}
];

export const notifications = [
  {type:'success', title:'Telemetry online', text:'All simulated system channels are responding normally.', time:'2 min ago'},
  {type:'info', title:'Aurora initialized', text:'Control center loaded with local mock data.', time:'9 min ago'},
  {type:'warning', title:'Storage threshold', text:'Archive volume is approaching its configured warning level.', time:'22 min ago'},
  {type:'error', title:'External AI unavailable', text:'No backend endpoint is configured. Local simulation remains active.', time:'41 min ago'}
];

export const commandHelp = {
  help:'Commands: help, clear, status, system, projects, ai, scan, about',
  status:'AURORA STATUS: ONLINE · telemetry nominal · 12 modules loaded',
  system:'CPU 37% · GPU 42% · RAM 61% · TEMP 54°C · NET 184 Mbps',
  projects:'4 indexed projects · 1 complete · 1 active · 1 paused · 1 development',
  ai:'LOCAL AI CONSOLE: READY · backend: not connected · simulation: enabled',
  scan:'Scan complete. 247 simulated objects indexed across 3 workspaces.',
  about:'AURORA v1.0 · Futuristic local control center · no external telemetry.'
};
