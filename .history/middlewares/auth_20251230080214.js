module.exports = (role = null) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    if (role && req.session.user.role !== role) {
      return res.send('Acesso negado');
    }

    next();
  };
};
