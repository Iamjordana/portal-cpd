const pool = require('../db');

let avisosCache = null;
let ultimaAtualizacao = null;

// Tempo máximo do cache (ex: 2 minutos)
const CACHE_TTL = 2 * 60 * 1000;

module.exports = async function avisosGlobais(req, res, next) {
  try {
    const agora = Date.now();

    // Se cache existe e ainda é válido
    if (
      avisosCache &&
      ultimaAtualizacao &&
      agora - ultimaAtualizacao < CACHE_TTL
    ) {
      res.locals.avisosAtivos = avisosCache;
      return next();
    }

    // Busca no banco
    const [avisos] = await pool.query(
      'SELECT id, mensagem FROM avisos WHERE ativo = 1 ORDER BY id DESC'
    );

    avisosCache = avisos;
    ultimaAtualizacao = agora;

    res.locals.avisosAtivos = avisos;
    next();
  } catch (err) {
    console.error('Erro cache avisos:', err);
    res.locals.avisosAtivos = [];
    next();
  }
};

// 🔥 Função para limpar cache (export extra)
module.exports.clearCache = () => {
  avisosCache = null;
  ultimaAtualizacao = null;
};