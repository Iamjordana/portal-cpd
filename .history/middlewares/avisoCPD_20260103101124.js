const pool = require('../db');

async function avisoCPD(req, res, next) {
  res.locals.avisoCPD = null;

  try {
    const [rows] = await pool.query(
      'SELECT mensagem FROM avisos WHERE ativo = 1 ORDER BY id DESC LIMIT 1'
    );

    if (rows.length > 0) {
      res.locals.avisoCPD = rows[0].mensagem;
    }
  } catch (err) {
    console.warn('AvisoCPD erro:', err.message);
  }

  next();
}

module.exports = avisoCPD;
