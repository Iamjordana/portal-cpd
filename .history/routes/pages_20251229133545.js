const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/index', auth(), (req, res) => {
  res.render('index', { user: req.session.user });
});

router.get('/gerencia', auth('gerencia'), (req, res) => {
  res.render('gerencia');
});

router.get('/cpd', auth('cpd'), (req, res) => {
  res.render('cpd');
});

module.exports = router;
