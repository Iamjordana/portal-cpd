const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// LOGIN
router.post('/login', (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.render('login', { error: 'Preencha usuário e senha' });
  }

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [login],
    async (err, results) => {
      if (err) {
        console.error(err);
        return res.render('login', { error: 'Erro no servidor' });
      }

      if (results.length === 0) {
        return res.render('login', { error: 'Usuário ou senha inválidos' });
      }

      const user = results[0];
      const senhaOk = await bcrypt.compare(senha, user.password);

      if (!senhaOk) {
        return res.render('login', { error: 'Usuário ou senha inválidos' });
      }

      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role
      };

      switch (user.role) {
        case 'gerencia':
          return res.redirect('/gerencia');

        case 'cpd':
          return res.redirect('/index');

        case 'frentecaixa':
          return res.redirect('/frentecaixa');

        case 'cadastro':
          return res.redirect('/cadastro');

        case 'prevencao':
          return res.redirect('/prevencao');

        case 'ecommerce':
          return res.redirect('/ecommerce');

        default:
          return res.redirect('/login');
      }
    }
  );
});
console.log('USER DO BANCO:', results[0]);
console.log('SENHA DIGITADA:', senha);
// LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
