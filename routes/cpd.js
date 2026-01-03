const express = require('express');
const router = express.Router();
const pool = require('../db');
const { isCPD } = require('../middlewares/auth');
const avisosCache = require('../middlewares/avisosCache'); // ✅ CACHE CORRETO

// ================= PAINEL CPD =================
router.get('/painel', isCPD, async (req, res) => {
  try {
    // Todos os avisos (tabela do painel)
    const [avisos] = await pool.query(
      'SELECT id, mensagem, ativo FROM avisos ORDER BY id DESC'
    );

    // Avisos ativos (cacheados)
    const avisosAtivos = await avisosCache.getAvisosAtivos();

    res.render('cpdpainel', {
      avisos,
      avisosAtivos
    });

  } catch (err) {
    console.error('Erro painel CPD:', err);
    res.status(500).send('Erro ao carregar painel');
  }
});

// ================= CRIAR AVISO =================
router.post('/novo', isCPD, async (req, res) => {
  const { mensagem } = req.body;

  try {
    await pool.query(
      'INSERT INTO avisos (mensagem, ativo) VALUES (?, 1)',
      [mensagem]
    );

    avisosCache.clearCache(); // 🔥 LIMPA CACHE

    res.redirect('/cpd/painel');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar aviso');
  }
});

// ================= ATIVAR / DESATIVAR =================
router.post('/toggle/:id', isCPD, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      'UPDATE avisos SET ativo = !ativo WHERE id = ?',
      [id]
    );

    avisosCache.clearCache(); // 🔥 LIMPA CACHE

    res.redirect('/cpd/painel');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao alterar status');
  }
});

// ================= DELETAR =================
router.post('/deletar/:id', isCPD, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      'DELETE FROM avisos WHERE id = ?',
      [id]
    );

    avisosCache.clearCache(); // 🔥 LIMPA CACHE

    res.redirect('/cpd/painel');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao deletar aviso');
  }
});

module.exports = router;
