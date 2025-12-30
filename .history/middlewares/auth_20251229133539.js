module.exports = function (perfilPermitido) {
  return function (req, res, next) {
    if (!req.session.user) {
      return res.redirect('/');
    }

    if (perfilPermitido && req.session.user.perfil !== perfilPermitido) {
      return res.send('Acesso negado');
    }

    next();
  };
};
