const pool = require('../db');

let cache = null;
let lastUpdate = 0;
const CACHE_TTL = 60 * 1000; // 1 minuto

async function getAvisosAtivos() {
  const now = Date.now();

  // Se cache válido, retorna
  if (cache && (now - lastUpdate) < CACHE_TTL) {
    return cache;
  }

  // Busca no banco
  const [rows] = await pool.query(
    'SELECT mensagem FROM avisos WHERE ativo = 1 ORDER BY criado_em DESC'
  );

  cache = rows;
  lastUpdate = now;

  return cache;
}

function clearCache() {
  cache = null;
  lastUpdate = 0;
}

module.exports = {
  getAvisosAtivos,
  clearCache
};
