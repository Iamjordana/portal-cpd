const pool = require('../db');

async function avisoCPD(req, res, next) {
  try {
    // só busca aviso se a tabela existir
    const [rows] = await pool.query(
      "SELECT mensagem FROM avisos WHERE ativo = 1 ORDER BY id DESC LIMIT 1"
    );
    res.locals.avisoCPD = rows[0] ? rows[0].mensagem : null;
  } catch (err) {
    console.warn("Não foi possível buscar aviso:", err.code || err.message);
    res.locals.avisoCPD = null; // não trava a página
  }
  next();
}

module.exports = avisoCPD;
