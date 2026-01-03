const express = require('express');
const router = express.Router();
const pool = require('../db'); // ajuste se o nome for diferente
const { isAuthenticated, isCPD } = require('../middlewares/auth');

// 📌 PAINEL CPD
router.get('/painel', isAuthenticated, isCPD, async (req, res) => {
  try {
    const [avisos] = await pool.query(`
      SELECT 
        id,
        mensagem AS texto,
        ativo
      FROM avisos
      ORDER BY id DESC
    `);

    res.render('cpdpainel', { avisos });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao carregar painel CPD');
  }
});

// 📌 CRIAR NOVO AVISO
router.post('/novo', isAuthenticated, isCPD, async (req, res) => {
  const { texto, ativo } = req.body;

  try {
    await pool.query(
      'INSERT INTO avisos (mensagem, ativo) VALUES (?, ?)',
      [texto, ativo ? 1 : 0]
    );

    res.redirect('/cpd/painel');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar aviso');
  }
});

// 📌 ATIVAR / DESATIVAR
router.post('/toggle/:id', isAuthenticated, isCPD, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      'UPDATE avisos SET ativo = NOT ativo WHERE id = ?',
      [id]
    );

    res.redirect('/cpd/painel');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao alterar status');
  }
});

// 📌 EDITAR AVISO
router.post('/editar/:id', isAuthenticated, isCPD, async (req, res) => {
  const { id } = req.params;
  const { texto, ativo } = req.body;

  try {
    await pool.query(
      'UPDATE avisos SET mensagem = ?, ativo = ? WHERE id = ?',
      [texto, ativo ? 1 : 0, id]
    );

    res.redirect('/cpd/painel');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao editar aviso');
  }
});

// 📌 DELETAR AVISO
router.post('/deletar/:id', isAuthenticated, isCPD, async (req, res) => {
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
