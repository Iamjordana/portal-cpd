const express = require('express');
const router = express.Router(); // <-- ESTA LINHA É ESSENCIAL
const { isCPD, isGerencia } = require('../middlewares/auth');

// HOME – LIVRE
router.get('/', (req, res) => {
  res.render('home'); // Use a versão simplificada que sugeri anteriormente
});

// LOGIN (simplificado)
router.get('/login', (req, res) => {
  res.render('login');
});

// CPD – PROTEGIDO (simplificado)
router.get('/index', isCPD, (req, res) => {
  res.render('index');
});

// GERÊNCIA – PROTEGIDO (simplificado)
router.get('/gerencia', isGerencia, (req, res) => {
  res.render('gerencia');
});

// OUTRAS PÁGINAS (simplificado)
router.get('/cadastro', is (req, res) => {
  res.render('cadastro');
});

router.get('/prevencao', (req, res) => {
  res.render('prevencao');
});

router.get('/ecommerce', (req, res) => {
  res.render('ecommerce');
});
router.get('/frentecaixa', (req, res) => {
  res.render('frentecaixa');
});


// Exportando todas as rotas
module.exports = router;