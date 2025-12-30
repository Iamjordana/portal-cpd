const express = require('express');
const router = express.Router(); // 👈 ESTA LINHA É O QUE FALTAVA
const db = require('../db');

// LOGIN
router.post('/login', (req, res) => {
  let { login, senha } = req.body;

  login = login.trim();
  senha = senha.trim();


router.post('/login', (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
return res.render('login', {
  error: 'Preencha usuário e senha',
  login
});
  }

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(sql, [login, senha], (err, results) => {
    if (err) {
      console.error('Erro no login:', err);
      return res.render('login', {
        error: 'Erro interno',
        login
      });
    }

    if (results.length === 0) {
      return res.render('login', {
        error: 'Usuário ou senha inválidos',
        login
      });
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
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

module.exports = router;