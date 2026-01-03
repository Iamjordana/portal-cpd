const express = require('express');
const router = express.Router();

// 👉 middleware NOVO (corrigido)
const { isAuthenticated, checkRole } = require('../middlewares/auth');

// ========================
// HOME – LIVRE
// ========================
router.get('/', (req, res) => {
  res.render('home');
});

// ========================
// LOGIN – LIVRE
// ========================
router.get('/login', (req, res) => {
  res.render('login');
});

// ========================
// CPD – PROTEGIDO
// ========================
router.get(
  '/index',
  isAuthenticated,
  checkRole('cpd'),
  (req, res) => {
    res.render('index');
  }
);

// ========================
// GERÊNCIA – PROTEGIDO
// ========================
router.get(
  '/gerencia',
  isAuthenticated,
  checkRole('gerencia'),
  (req, res) => {
    res.render('gerencia');
  }
);

// ========================
// FRENTE DE CAIXA – PROTEGIDO
// ========================
router.get(
  '/frentecaixa',
  isAuthenticated,
  checkRole('frentecaixa'),
  (req, res) => {
    res.render('frentecaixa');
  }
);

// ========================
// CADASTRO – PROTEGIDO
// ========================
router.get(
  '/cadastro',
  isAuthenticated,
  checkRole('cadastro'),
  (req, res) => {
    res.render('cadastro');
  }
);

// ========================
// PREVENÇÃO DE PERDAS – PROTEGIDO
// ⚠ role no banco = prevperdas
// ========================
router.get(
  '/prevencao',
  isAuthenticated,
  checkRole('prevperdas'),
  (req, res) => {
    res.render('prevencao');
  }
);

// ========================
// ECOMMERCE – PROTEGIDO
// ========================
router.get(
  '/ecommerce',
  isAuthenticated,
  checkRole('ecommerce'),
  (req, res) => {
    res.render('ecommerce');
  }
);

// ========================
// EXPORT
// ========================
module.exports = router;
