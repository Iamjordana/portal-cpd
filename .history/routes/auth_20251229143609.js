const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = `
    SELECT * FROM users
    WHERE username = ? AND password = ?
  `;

  db.query(sql, [username, password], (err, results) => {
    if (err) return res.send('Erro no banco');

    if (results.length === 0) {
      return res.render('login', {
        error: 'Usuário ou senha inválidos'
      });
    }

    req.session.user = {
      id: results[0].id,
      username: results[0].username,
      role: results[0].role
    };

    res.redirect('/index');
  });
});

module.exports = router;
