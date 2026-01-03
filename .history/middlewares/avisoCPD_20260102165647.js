const db = require('../db');

function avisoCPD(req, res, next) {
  db.query(
    'SELECT mensagem FROM avisos WHERE ativo = 1 ORDER BY criado_em DESC LIMIT 1',
    (err, results) => {
      if (err) {
        console.error('Erro ao buscar aviso CPD:', err);
        res.locals.avisoCPD = null;
      } else if (results.length > 0) {
        res.locals.avisoCPD = results[0].mensagem;
      } else {
        res.locals.avisoCPD = null;
      }

      next();
    }
  );
}
// middlewares/avisoCPD.js

function avisoCPD(req, res, next) {
  // aviso fixo por enquanto
  res.locals.avisoCPD = '⚠️ O Email está OFF ⚠️';
  next();
}

module.exports = avisoCPD;
;

const express = require("express");
const router = express.Router();
const pool = require("../db");

// Página de edição
router.get("/painel", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM avisos LIMIT 1");
  res.render("cpd-painel", { aviso: rows[0] });
});

// Atualizar aviso
router.post("/painel", async (req, res) => {
  const { texto, ativo } = req.body;
  await pool.query("UPDATE avisos SET texto = ?, ativo = ? WHERE id = 1", [texto, ativo ? 1 : 0]);
  res.redirect("/cpd/painel");
});

module.exports = router;