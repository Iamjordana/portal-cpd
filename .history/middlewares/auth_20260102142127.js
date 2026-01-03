const db = require('../db'); // ✅ FALTAVA ISSO

function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

function checkRole(role) {
  return (req, res, next) => {
    if (!req.session.user || req.session.user.role !== role) {
      return res.redirect('/login');
    }
    next();
  };
}

// ✅ MIDDLEWARE DO AVISO CPD
function carregarAviso(req, res, next) {
  db.query(
    'SELECT mensagem FROM avisos WHERE ativo = true ORDER BY criado_em DESC LIMIT 1',
    (err, results) => {
      if (!err && results.length > 0) {
        res.locals.avisoCPD = results[0].mensagem;
      } else {
        res.locals.avisoCPD = null;
      }
      next();
    }
  );
}

module.exports = {
  isAuthenticated,
  carregarAviso, // ✅ AGORA ESTÁ EXPORTADO

  isCPD: [isAuthenticated, checkRole('cpd')],
  isGerencia: [isAuthenticated, checkRole('gerencia')],
  isFrenteCaixa: [isAuthenticated, checkRole('frentecaixa')],
  isCadastro: [isAuthenticated, checkRole('cadastro')],
  isPrevencao: [isAuthenticated, checkRole('prevencao')],
  isEcommerce: [isAuthenticated, checkRole('ecommerce')]
};
