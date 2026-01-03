const express = require('express');
const router = express.Router();
const pool = require('../db');
const { isCPD } = require('../middlewares/auth');

// 👉 ABRIR PAINEL
router.get('/painel', isCPD, async (req, res) => {
  try {
    const [avisos] = await pool.query(
      'SELECT id, texto, ativo FROM avisos ORDER BY id DESC'
    );

    res.render('cpdpainel', { avisos });
  } catch (err) {
    console.error(err);
    res.render('cpdpainel', { avisos: [] });
  }
});

// 👉 NOVO AVISO
router.post('/novo', isCPD, async (req, res) => {
  const { texto, ativo } = req.body;

  await pool.query(
    'INSERT INTO avisos (texto, ativo) VALUES (?, ?)',
    [texto, ativo ? 1 : 0]
  );

  res.redirect('/cpd/painel');
});

// 👉 ATIVAR / DESATIVAR
router.post('/toggle/:id', isCPD, async (req, res) => {
  await pool.query(
    'UPDATE avisos SET ativo = NOT ativo WHERE id = ?',
    [req.params.id]
  );

  res.redirect('/cpd/painel');
});

// 👉 EDITAR
router.post('/editar/:id', isCPD, async (req, res) => {
  const { texto, ativo } = req.body;

await pool.query(
  'INSERT INTO avisos (mensagem, ativo) VALUES (?, ?)',
  [texto, ativo]
);
    

  res.redirect('/cpd/painel');
});

// 👉 DELETAR
router.post('/deletar/:id', isCPD, async (req, res) => {
  await pool.query(
    'DELETE FROM avisos WHERE id = ?',
    [req.params.id]
  );

  res.redirect('/cpd/painel');
});

module.exports = router;
