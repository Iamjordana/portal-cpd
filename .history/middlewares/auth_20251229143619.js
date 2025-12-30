module.exports = (role) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/');
    }

    if (role && req.session.user.role !== role) {
      return res.send('Acesso negado');
    }

    next();
  };
};
