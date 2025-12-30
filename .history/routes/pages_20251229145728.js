const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/index', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  res.render('index');
});

router.get('/gerencia', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'gerencia') {
    return res.redirect('/');
  }
  res.render('gerencia');
});

module.exports = router;
// LOGOUT
router.get('/logout', (req, res) => {
  // Destroi a sessão do usuário
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao destruir a sessão:', err);
      return res.redirect('/');  // Redireciona para a página inicial em caso de erro
    }
    // Após destruir a sessão, redireciona para a página inicial (login)
    res.redirect('/');
  });
});
