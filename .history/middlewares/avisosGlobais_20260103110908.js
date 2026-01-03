const pool = require('../db');

module.exports = async (req, res, next) => {
  try {
    const [avisosAtivos] = await pool.query(
      'SELECT mensagem FROM avisos WHERE ativo = 1'
    );

    res.locals.avisosAtivos = avisosAtivos;
    next();
  } catch (err) {
    console.error('Erro avisos globais:', err);
    next();
  }
};