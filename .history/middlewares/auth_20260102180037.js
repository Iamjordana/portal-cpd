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

module.exports = {
  isAuthenticated,
  isCPD: [isAuthenticated, checkRole('cpd')],
  isGerencia: [isAuthenticated, checkRole('gerencia')],
  isFrenteCaixa: [isAuthenticated, checkRole('frentecaixa')],
  isCadastro: [isAuthenticated, checkRole('cadastro')],
  isPrevencao: [isAuthenticated, checkRole('prevencao')],
  isEcommerce: [isAuthenticated, checkRole('ecommerce')]
  is
};


