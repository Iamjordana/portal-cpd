// middlewares/avisoCPD.js
const pool = require('../db');

async function avisoCPD(req, res, next) {
  res.locals.avisoCPD = null; // inicializa para não travar

  if (!pool) return next();

  try {
    // Timeout de 2 segundos para não travar a requisição
    const timeout = new Promise((resolve) => setTimeout(() => resolve([[]]), 2000));

    // Executa a query
    const query = pool.query(
      "SELECT mensagem AS texto FROM avisos WHERE ativo = 1 ORDER BY id DESC LIMIT 1"
    );

    // Espera pelo resultado ou timeout
    const [rows] = await Promise.race([query, timeout]);

    if (rows && rows[0]) {
      res.locals.avisoCPD = rows[0].texto;
    }
  } catch (err) {
    console.warn("AvisoCPD: erro ao buscar aviso", err.code || err.message);
    res.locals.avisoCPD = null;
  }

  next();
}

// ⚠️ Exporta diretamente a função, para poder usar app.use(avisoCPD)
module.exports = avisoCPD;
