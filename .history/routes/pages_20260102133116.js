const express = require('express');
const router = express.Router();
const {
  isCPD,
  isGerencia,
  isFrenteCaixa,
  isCadastro,
  isPrevencao,
  isEcommerce
} = require('../middlewares/auth');

// HOME
router.get('/', (req, res) => {
  res.render('home');
});

// LOGIN
router.get('/login', (req, res) => {
  res.render('login');
});

// ROTAS PROTEGIDAS
router.get('/index', isCPD, (req, res) => {
  res.render('index');
});

router.get('/gerencia', isGerencia, (req, res) => {
  res.render('gerencia');
});

router.get('/frentecaixa', isFrenteCaixa, (req, res) => {
  res.render('frentecaixa');
});

router.get('/cadastro', isCadastro, (req, res) => {
  res.render('cadastro');
});

router.get('/prevencao', isPrevencao, (req, res) => {
  res.render('prevencao');
});

router.get('/eecommerce', isEcommerce, (req, res) => {
  res.render('ecommerce');
});

module.exports = router;
