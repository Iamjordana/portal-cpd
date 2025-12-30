const express = require('express');
const auth = require('../middlewares/auth');

const router = express.Router();

// LOGIN (rota inicial)
router.get('/', (req, res) => {
  res.render('login');
});

// Página inicial após login
router.get('/index', auth(), (req, res) => {
  res.render('index');
});

// Página CPD
router.get('/cpd', auth('cpd'), (req, res) => {
  res.render('cpd');
});

// Página Gerência
router.get('/gerencia', auth('gerencia'), (req, res) => {
  res.render('gerencia');
});

module.exports = router;