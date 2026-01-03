const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// LOGIN
router.post('/login', (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.render('login', { error: 'Preencha usuário e senha' });
  }

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [login],
    async (err, results) => {

      console.log('LOGIN DIGITADO:', login);
      console.log('RESULTS DO BANCO:', results);

      if (err) {
