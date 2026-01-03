function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

function checkRole(role) {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    if (req.session.user.role !== role) {
      return res.redirect('/login');
    }
    next();
  };
}

module.exports = {
  isAuthenticated,
  isCPD: checkRole('cpd'),
  isGerencia: checkRole('gerencia'),
  isFrenteCaixa: checkRole('frentecaixa'),
  isCadastro: checkRole('cadastro'),
  isPrevencao: checkRole('prevencao'),
  isEcommerce: checkRole('ecommerce')
};
