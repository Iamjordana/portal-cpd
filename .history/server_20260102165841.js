const pool = require("../db"); // conexão MySQL

async function avisoCPD(req, res, next) {
  try {
    const [rows] = await pool.query("SELECT texto FROM avisos WHERE ativo = 1 LIMIT 1");
    res.locals.avisoCPD = rows[0] ? rows[0].texto : null;
  } catch (err) {
    console.error("Erro ao buscar aviso:", err);
    res.locals.avisoCPD = null;
  }
  next();
}

module.exports = avisoCPD; // ✅ exportando apenas uma vez
