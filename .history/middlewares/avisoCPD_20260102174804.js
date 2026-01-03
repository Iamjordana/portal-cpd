const pool = require('../db');

async function avisoCPD(req, res, next) {
  res.locals.avisoCPD = null; // inicializa para não travar

  if (!pool) return next();

  try {
    // Timeout de 2 segundos para não travar
    const timeout = new Promise((resolve) => setTimeout(() => resolve([]), 2000));

    const query = pool.query(
      "SELECT mensagem FROM avisos WHERE ativo = 1 ORDER BY id DESC LIMIT 1"
    );

    const [rows] = await Promise.race([query, timeout]);

    if (rows && rows[0]) {
      res.locals.avisoCPD = rows[0].mensagem;
    }
  } catch (err) {
    console.warn("AvisoCPD: erro ao buscar aviso", err.code || err.message);
    res.locals.avisoCPD = null;
  }

  next();
}

module.exports = avisoCPD;
