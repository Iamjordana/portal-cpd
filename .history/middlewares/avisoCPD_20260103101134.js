const pool = require('../db');

module.exports = async function avisoCPD(req, res, next) {
  res.locals.avisoCPD = null;

  if (!pool) return next();

  try {
    const timeout = new Promise((resolve) =>
      setTimeout(() => resolve(null), 2000)
    );

    const query = pool.query(
      "SELECT mensagem FROM avisos WHERE ativo = 1 ORDER BY id DESC LIMIT 1"
    );

    const result = await Promise.race([query, timeout]);

    if (result && result[0] && result[0][0]) {
      res.locals.avisoCPD = result[0][0].mensagem;
    }
  } catch (err) {
    console.warn("AvisoCPD:", err.message);
  }

  next();
};
