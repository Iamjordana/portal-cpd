function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

function isCPD(req, res, next) {
  if (!req.session.user || req.session.user.role !== 'cpd') {
    return res.redirect('/login');
  }
  next();
}

function isGerencia(req, res, next) {
  if (!req.session.user || req.session.user.role !== 'gerencia') {
    return res.redirect('/login');
  }
  next();
}

module.exports = {
  isAuthenticated,
  isCPD,
  isGerencia
};