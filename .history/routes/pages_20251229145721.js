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
https://chatgpt.com/share/6952c094-c954-8013-bed5-c0c1276c8526