function isAuthenticated(req, res, next) {
  // Verifica se o usuário está autenticado
  if (!req.session.user) {
    req.session.message = 'Você precisa estar logado para acessar essa página.'; // Mensagem de erro
    return res.redirect('/login'); // Redireciona para a página de login
  }
  next();
}

function isCPD(req, res, next) {
  // Verifica se o usuário tem a permissão de CPD
  if (!req.session.user || req.session.user.role !== 'cpd') {
    req.session.message = 'Você não tem permissão para acessar esta página. Acesse o portal com um usuário CPD.'; // Mensagem de erro
    return res.redirect('/login'); // Redireciona para a página de login
  }
  next();
}

function isGerencia(req, res, next) {
  // Verifica se o usuário tem a permissão de Gerência
  if (!req.session.user || req.session.user.role !== 'gerencia') {
    req.session.message = 'Você não tem permissão para acessar esta página. Acesse o portal com um usuário Gerência.'; // Mensagem de erro
    return res.redirect('/login'); // Redireciona para a página de login
  }
  next();
}
function isFrenteCaixa(req, res, next) {
  // Verifica se o usuário tem a permissão de Frente de Caixa
  if (!req.session.user || req.session.user.role !== 'frentecaixa') {
    req.session.message = 'Você não tem permissão para acessar esta página. Acesse o portal com um usuário Frente de Caixa.'; // Mensagem de erro
    return res.redirect('/login'); // Redireciona para a página de login
  }
  next();
  unction isFrenteCaixa(req, res, next) {
  // Verifica se o usuário tem a permissão de Frente de Caixa
  if (!req.session.user || req.session.user.role !== 'frentecaixa') {
    req.session.message = 'Você não tem permissão para acessar esta página. Acesse o portal com um usuário Frente de Caixa.'; // Mensagem de erro
    return res.redirect('/login'); // Redireciona para a página de login
  }
  next();
}
module.exports = {
  isAuthenticated,
  isCPD,
  isGerencia
};