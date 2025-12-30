const express = require('express');
const router = express.Router();
const db = require('../db');

// LOGIN
router.post('/login', (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.redirect('/');
  }

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(sql, [login, senha], (err, results) => {
    if (err) {
      console.error('Erro no login:', err);
      return res.redirect('/');
    }

    if (results.length === 0) {
      return res.redirect('/');
    }

    // cria sessão
    req.session.user = {
      id: results[0].id,
      username: results[0].username,
      role: results[0].role
    };

    // redireciona por perfil
    if (results[0].role === 'gerencia') {
      return res.redirect('/gerencia');
    }

    res.redirect('/index');
  });
});

// LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
