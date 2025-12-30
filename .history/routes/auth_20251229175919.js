const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db'); // sua conexão MySQL

router.post('/login', (req, res) => {
  let { login, senha } = req.body;

  login = login.trim();
  senha = senha.trim();

  if (!login || !senha) {
    return res.render('login', {
      error: 'Preencha usuário e senha',
      login
    });
  }

  const sql = 'SELECT * FROM users WHERE username = ?';

  db.query(sql, [login], async (err, results) => {
    if (err) {
      console.error(err);
      return res.render('login', { error: 'Erro no servidor' });
    }

    if (results.length === 0) {
      return res.render('login', {
        error: 'Usuário não encontrado',
        login
      });
    }

    const user = results[0];

    const senhaValida = await bcrypt.compare(senha, user.password);

    if (!senhaValida) {
      return res.render('login', {
        error: 'Senha inválida',
        login
      });
    }

    // ✅ LOGIN OK
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    res.redirect('/');
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
