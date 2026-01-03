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