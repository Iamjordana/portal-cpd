const express = require('express');
const router = express.Router();
const pool = require('../db'); // Conexão com MySQL via pool

// Middleware restrito a CPD
function isCPD(req, res, next) {
  if (req.session.user && req.session.user.role === 'cpd') {
    return next();
  }
  res.status(403).send('Acesso negado');
}

// ============================
// ROTA: Painel CPD
// ============================
router.get('/painel', isCPD, async (req, res) => {
  try {
    const [avisos] = await pool.query('SELECT * FROM avisos ORDER BY id DESC');
    res.render('cpdpainel', { avisos });
  } catch (err) {
    console.error('Erro ao carregar painel:', err.message);
    res.send('Erro ao carregar painel');
  }
});

// ============================
// ROTA: Criar aviso
// ============================
router.post('/novo', isCPD, async (req, res) => {
  const { texto } = req.body;
  const ativo = req.body.ativo === 'on' ? 1 : 0; // checkbox retorna 'on' quando marcado
  try {
    await pool.query('INSERT INTO avisos (mensagem, ativo) VALUES (?, ?)', [texto, ativo]);
    res.redirect('/cpd/painel');
  } catch (err) {
    console.error('Erro ao criar aviso:', err.message);
    res.send('Erro ao criar aviso');
  }
});

// ============================
// ROTA: Editar aviso
// ============================
router.post('/editar/:id', isCPD, async (req, res) => {
  const { id } = req.params;
  const { texto } = req.body;
  const ativo = req.body.ativo === 'on' ? 1 : 0; // checkbox
  try {
    await pool.query('UPDATE avisos SET mensagem = ?, ativo = ? WHERE id = ?', [texto, ativo, id]);
    res.redirect('/cpdpainel');
  } catch (err) {
    console.error('Erro ao atualizar aviso:', err.message);
    res.send('Erro ao atualizar aviso');
  }
});

// ============================
// ROTA: Ativar / Desativar aviso
// ============================
router.post('/toggle/:id', isCPD, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE avisos SET ativo = NOT ativo WHERE id = ?', [id]);
    res.redirect('/cpdpainel');
  } catch (err) {
    console.error('Erro ao alternar status do aviso:', err.message);
    res.send('Erro ao alternar status do aviso');
  }
});

// ============================
// ROTA: Deletar aviso
// ============================
router.post('/deletar/:id', isCPD, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM avisos WHERE id = ?', [id]);
    res.redirect('/cpdpainel');
  } catch (err) {
    console.error('Erro ao deletar aviso:', err.message);
    res.send('Erro ao deletar aviso');
  }
});

module.exports = router;
