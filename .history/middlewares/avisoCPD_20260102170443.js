const pool = require('../db');

async function avisoCPD(req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT mensagem FROM avisos WHERE ativo = 1 ORDER BY id DESC LIMIT 1"
    );
    res.locals.avisoCPD = rows[0] ? rows[0].mensagem : null;
  } catch (err) {
    console.error("Erro ao buscar aviso:", err);
    res.locals.avisoCPD = null;
  }
  next();
}

module.exports = avisoCPD;
