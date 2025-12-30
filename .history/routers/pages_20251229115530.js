const express = require('express');
const { autenticar, apenasGerencia, cpdOuGerencia } = require('../middlewares/auth');

const router = express.Router();

router.get('/', autenticar, (req, res) => {
    res.render('index', { perfil: req.session.perfil });
});

router.get('/gerencia', apenasGerencia, (req, res) => {
    res.render('gerencia');
});

router.get('/cpd', cpdOuGerencia, (req, res) => {
    res.render('cpd');
});

module.exports = router;
