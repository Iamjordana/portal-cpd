const db = require('../db');

module.exports = (req, res, next) => {
  db.query(
    'SELECT mensagem FROM avisos WHERE ativo = true ORDER BY id DESC LIMIT 1',
    (err, results) => {
      if (!err && results.length > 0) {
        res.locals.avisoCPD = results[0].mensagem;
      } else {
        res.locals.avisoCPD = null;
      }
      next();
    }
  );
};
console.log('Aviso enviado para view:', res.locals.avisoCPD);
