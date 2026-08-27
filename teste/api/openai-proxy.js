// Mock proxy removed intentionally. Do not rely on this endpoint.
module.exports = async function handler(req, res){
  res.setHeader('Content-Type','application/json');
  return res.status(410).json({ error: 'Mock removed', message: 'Local mock proxy removed. IA integration disabled.' });
};
