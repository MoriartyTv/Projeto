const API = import.meta.env.VITE_API_URL || 'http://localhost:8787/api';
export async function api(path, options={}){
  try{const r=await fetch(`${API}${path}`,{headers:{'Content-Type':'application/json',...(options.headers||{})},...options}); if(!r.ok) throw new Error(`${r.status}`); return await r.json()}
  catch(error){ return {offline:true,error:error.message} }
}
export { API };
