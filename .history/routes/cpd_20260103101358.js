const express = require('express');
const router = express.Router();

// Proteção CPD
function isCPD(req, res, next) {
  if (req.session.user && req.session.user.role === 'cpd') {
    return next();
  }
  return res.redirect('/login');
}

// Painel de avisos CPD
router.get('/painel', isCPD, (req, res) => {
  res.render('cpdpainel');
});

module.exports = router;
