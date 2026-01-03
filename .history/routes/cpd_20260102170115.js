const express = require('express');
const router = express.Router();
const pool = require('../db');

// Middleware opcional: aqui você pode checar se o usuário é CPD
function isCPD(req, res, next) {
  if (req.session.user && req.session.user.role === 'cpd') {
    return next();
  }
  res.status(403).send('Acesso negado');
}

// Página de edição do aviso
router.get('/painel', isCPD, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM avisos LIMIT 1');
    const aviso = rows[0] || null;
    res.render('cpd-painel', { aviso });
  } catch (err) {
    console.error(err);
    res.send('Erro ao carregar painel');
  }
});

// Atualizar aviso
router.post('/painel', isCPD, async (req, res) => {
  try {
    const { texto, ativo } = req.body;

    // Se já existe um aviso, atualiza; senão, cria
    const [rows] = await pool.query('SELECT * FROM avisos LIMIT 1');

    if (rows.length > 0) {
      await pool.query(
        'UPDATE avisos SET texto = ?, ativo = ? WHERE id = ?',
        [texto, ativo ? 1 : 0, rows[0].id]
      );
    } else {
      await pool.query(
        'INSERT INTO avisos (texto, ativo) VALUES (?, ?)',
        [texto, ativo ? 1 : 0]
      );
    }

    res.redirect('/cpd/painel');
  } catch (err) {
    console.error(err);
    res.send('Erro ao salvar aviso');
  }
});

module.exports = router;
