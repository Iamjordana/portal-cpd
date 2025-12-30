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
const session = require('express-session');

// Configuração de sessão
app.use(session({
  secret: 'minha_chave_secreta',  // Troque isso por uma chave mais segura
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Defina para `true` caso esteja usando HTTPS
}));