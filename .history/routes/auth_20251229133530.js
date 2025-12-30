const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.query(
    'SELECT * FROM usuarios WHERE email = ?',
    [email],
    (err, results) => {
      if (err) return res.send('Erro no banco');
      if (results.length === 0) return res.send('Usuário não encontrado');

      const user = results[0];

      if (!bcrypt.compareSync(senha, user.senha)) {
        return res.send('Senha incorreta');
      }

      req.session.user = {
        id: user.id,
        nome: user.nome,
        perfil: user.perfil
      };

      res.redirect('/index');
    }
  );
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;