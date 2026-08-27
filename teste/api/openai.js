// Mock handlers removed — replaced with inert responses to avoid accidental use.
// If you later want to re-enable local mocks, restore previous implementations.

module.exports = async function handler(req, res){
  res.setHeader('Content-Type','application/json');
  return res.status(410).json({ error: 'Mock removed', message: 'Local mock handlers have been removed. IA integration is currently disabled.' });
};
