const express = require('express');
const router = express.Router();
const pool = require('../db');

// Middleware opcional: restringe acesso ao CPD
function isCPD(req, res, next) {
  if (req.session.user && req.session.user.role === 'cpd') {
    return next();
  }
  res.status(403).send('Acesso negado');
}

// Página principal: lista todos os avisos
router.get('/painel', isCPD, async (req, res) => {
  try {
    // Avisos do banco
    const [avisos] = await pool.query('SELECT * FROM avisos ORDER BY id DESC');
    res.render('cpdpainel', { avisos }); // ⚡ aqui foi ajustado para cpdpainel.ejs
  } catch (err) {
    console.error('Erro ao carregar painel:', err);
    res.send('Erro ao carregar painel');
  }
});

// Criar novo aviso
router.post('/novo', isCPD, async (req, res) => {
  const { mensagem, ativo } = req.body;
  try {
    await pool.query(
      'INSERT INTO avisos (mensagem, ativo) VALUES (?, ?)',
      [mensagem, ativo ? 1 : 0]
    );
    res.redirect('/cpd/painel');
  } catch (err) {
    console.error('Erro ao criar aviso:', err);
    res.send('Erro ao criar aviso');
  }
});

// Atualizar aviso existente
router.post('/editar/:id', isCPD, async (req, res) => {
  const { id } = req.params;
  const { mensagem, ativo } = req.body;
  try {
    await pool.query(
      'UPDATE avisos SET mensagem = ?, ativo = ? WHERE id = ?',
      [mensagem, ativo ? 1 : 0, id]
    );
    res.redirect('/cpd/painel');
  } catch (err) {
    console.error('Erro a
