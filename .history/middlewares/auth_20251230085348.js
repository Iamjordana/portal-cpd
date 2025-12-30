function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    req.session.message = 'Você precisa estar logado para acessar essa página.'; // Mensagem de erro
    return res.redirect('/login'); // Redireciona para login
  }
  next();
}

function isCPD(req, res, next) {
  if (!req.session.user || req.session.user.role !== 'cpd') {
    req.session.message = 'Você não tem permissão para acessar esta página. Acesse o portal com um usuário CPD.'; // Mensagem de erro
    return res.redirect('/login'); // Redireciona para login
  }
  next();
}

function isGerencia(req, res, next) {
  if (!req.session.user || req.session.user.role !== 'gerencia') {
    req.session.message = 'Você não tem permissão para acessar esta página. Acesse o portal com um usuário Gerência.'; // Mensagem de erro
    return res.redirect('/login'); // Redireciona para login
  }
  next();
}

module.exports = {
  isAuthenticated,
  isCPD,
  isGerencia
};
