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
app.use(session({
  secret: 'minha_chave_secreta',
  resave: false,
  saveUninitialized: false, // 👈 IMPORTANTE
  cookie: { secure: false }
}));