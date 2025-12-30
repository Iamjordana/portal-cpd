const express = require('express');
const router = express.Router();
const { isCPD, isGerencia } = require('../middlewares/auth');

// HOME – LIVRE
router.get('/', (req, res) => {
  res.render('home', { user: req.session.user });
});

// LOGIN
router.get('/login', (req, res) => {
  res.render('login');
});

// CPD – PROTEGIDO
router.get('/index', isCPD, (req, res) => {
  res.render('index', { user: req.session.user });
});

// GERÊNCIA – PROTEGIDO
router.get('/gerencia', isGerencia, (req, res) => {
  res.render('gerencia', { user: req.session.user });
});

// OUTRAS PÁGINAS (sem login necessário)
router.get('/cadastro', (req, res) => {
  res.render('cadastro', { user: req.session.user });
});

router.get('/prevencao', (req, res) => {
  res.render('prevencao', { user: req.session.user });
});

router.get('/ecommerce', (req, res) => {
  res.render('ecommerce', { user: req.session.user });
});

// Exportando todas as rotas
module.exports = router;
