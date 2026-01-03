const pool = require('../db');

module.exports = async (req, res, next) => {
  try {
    const [avisosAtivos] = await pool.query(
      'SELECT mensagem FROM avisos WHERE ativo = 1 ORDER BY id DESC'
    );

    // Disponível em TODAS as views
    res.locals.avisosAtivos = avisosAtivos;
  } catch (err) {
    console.error('Erro ao carregar avisos globais:', err);
    res.locals.avisosAtivos = [];
  }

  next();
};
