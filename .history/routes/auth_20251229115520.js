const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    const [users] = await pool.query(
        'SELECT * FROM usuarios WHERE email = ?', [email]
    );

    if (!users.length) return res.redirect('/login');

    const user = users[0];
    const ok = await bcrypt.compare(senha, user.senha);

    if (!ok) return res.redirect('/login');

    req.session.usuario = user.nome;
    req.session.perfil = user.perfil;

    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;
