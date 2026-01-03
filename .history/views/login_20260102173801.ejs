const express = require('express');
const router = express.Router();
const pool = require('../db'); // pool promise
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.render('login', { error: 'Preencha usuário e senha' });
  }

  try {
    const [results] = await pool.query('SELECT * FROM users WHERE username = ?', [login]);

    console.log('LOGIN DIGITADO:', login);
    console.log('RESULTS DO BANCO:', results);

    if (results.length === 0) {
      console.log('❌ USUÁRIO NÃO ENCONTRADO');
      return res.render('login', { error: 'Usuário ou senha inválidos' });
    }

    const user = results[0];

    const senhaOk = await bcrypt.compare(senha, user.password);

    console.log('SENHA CONFERE?', senhaOk);

    if (!senhaOk) {
      console.log('❌ SENHA INCORRETA');
      return res.render('login', { error: 'Usuário ou senha inválidos' });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    console.log('✅ LOGIN OK, REDIRECIONANDO...');

    switch (user.role) {
      case 'gerencia':
        return res.redirect('/gerencia');
      case 'cpd':
        return res.redirect('/cpd/painel');
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

  } catch (err) {
    console.error('Erro no login:', err);
    return res.render('login', { error: 'Erro no servidor' });
  }
});

// LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
