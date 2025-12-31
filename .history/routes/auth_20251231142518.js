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
      if (err || results.length === 0) {
        return res.render('login', { error: 'Usuário ou senha inválidos', login });
      }

      const user = results[0];
      const senhaOk = await bcrypt.compare(senha, user.password);

      if (!senhaOk) {
        return res.render('login', { error: 'Usuário ou senha inválidos', login });
      }

      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role
      };

      if (user.role === 'gerencia') return res.redirect('/gerencia');
      res.redirect('/index'); res.redirect('/frente');
    }
  );
});

// LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
