const db = require('../db');

function avisoCPD(req, res, next) {
  db.query(
    'SELECT mensagem FROM avisos WHERE ativo = 1 ORDER BY criado_em DESC LIMIT 1',
    (err, results) => {
      if (err) {
        console.error('Erro ao buscar aviso CPD:', err);
        res.locals.avisoCPD = null;
      } else if (results.length > 0) {
        res.locals.avisoCPD = results[0].mensagem;
      } else {
        res.locals.avisoCPD = null;
      }

      next();
    }
  );
}

function avisoCPD(req, res, next) {
  res.locals.avisoCPD = '⚠️ Sistema SAVE em manutenção das 14h às 15h';
  next();
}

module.exports = avisoCPD;


module.exports = avisoCPD;
