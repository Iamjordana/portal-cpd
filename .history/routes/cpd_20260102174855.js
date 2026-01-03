const express = require('express');
const router = express.Router();
const pool = require('../db');

// Middleware opcional: só CPD
function isCPD(req, res, next) {
  if (req.session.user && req.session.user.role === 'cpd') {
    return next();
  }
  res.status(403).send('Acesso negado');
}

// Painel CPD
router.get('/painel', isCPD, async (req, res) => {
  try {
    const [avisos] = await pool.query('SELECT * FROM avisos ORDER BY id DESC');
    res.render('cpdpainel', { avisos });
  } catch (err) {
    console.error('Erro ao carregar painel:', err.message);
    res.send('Erro ao carregar painel');
  }
});

// Criar novo aviso
router.post('/novo', isCPD, async (req, res) => {
  const { texto, ativo } = req.body;
  try {
    await pool.query(
      'INSERT INTO avisos (mensagem, ativo) VALUES (?, ?)',
      [texto, ativo ? 1 : 0]
    );
    res.redirect('/cpd/painel');
  } catch (err) {
    console.error('Erro ao criar aviso:', err.message);
    res.send('Erro ao criar aviso');
  }
});

// Atualizar aviso
router.post('/editar/:id', isCPD, async (req, res) => {
  const { id } = req.params;
  const { texto, ativo } = req.body;
  try {
    await pool.query(
      'UPDATE avisos SET mensagem = ?, ativo = ? WHERE id = ?',
      [texto, ativo ? 1 : 0, id]
    );
    res.redirect('/cpd/painel');
  } catch (err) {
    console.error('Erro ao atualizar aviso:', err.message);
    res.send('Erro ao atualizar aviso');
  }
});

// Ativar/desativar
router.post('/toggle/:id', isCPD, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE avisos SET ativo = NOT ativo WHERE id = ?', [id]);
    res.redirect('/cpd/painel');
  } catch (err) {
    console.error('Erro ao alternar status:', err.message);
    res.send('Erro ao alternar status do aviso');
  }
});

// Deletar
router.post('/deletar/:id', isCPD, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM avisos WHERE id = ?', [id]);
    res.redirect('/cpd/painel');
  } catch (err) {
    console.error('Erro ao deletar aviso:', err.message);
    res.send('Erro ao deletar aviso');
  }
});

module.exports = router;
