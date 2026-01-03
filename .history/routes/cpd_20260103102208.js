const express = require('express');
const router = express.Router();
const pool = require('../db');
const { isCPD } = require('../middlewares/auth');

// GET painel CPD
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

module.exports = router;
