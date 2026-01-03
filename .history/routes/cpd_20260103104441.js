const express = require('express');
const router = express.Router();
const pool = require('../db');
const { isCPD } = require('../middlewares/auth');

// PAINEL CPD
router.get('/painel', isCPD, async (req, res) => {
  try {
    const [avisos] = await pool.query(
      'SELECT id, mensagem, ativo FROM avisos ORDER BY id DESC'
    );

    res.render('cpdpainel', { avisos });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao carregar painel');
  }
});

// CRIAR AVISO
router.post('/novo', isCPD, async (req, res) => {
  const { mensagem, ativo } = req.body;

  try {
    await pool.query(
      'INSERT INTO avisos (mensagem, ativo) VALUES (?, ?)',
      [mensagem, ativo ? 1 : 0]
    );

    res.redirect('/cpd/painel');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar aviso');
  }
});

// ATIVAR / DESATIVAR
router.post('/toggle/:id', isCPD, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      'UPDATE avisos SET ativo = !ativo WHERE id = ?',
      [id]
    );

    res.redirect('/cpd/painel');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao alterar status');
  }
});

// DELETAR
router.post('/deletar/:id', isCPD, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM avisos WHERE id = ?', [id]);
    res.redirect('/cpd/painel');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao deletar aviso');
  }
});

module.exports = router;
