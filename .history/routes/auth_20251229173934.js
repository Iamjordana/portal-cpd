// LOGIN
router.post('/login', (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.render('login', {
      error: 'Preencha usuário e senha',
      login
    });
  }

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(sql, [login, senha], (err, results) => {
    if (err) {
      console.error('Erro no login:', err);
      return res.render('login', {
        error: 'Erro interno',
        login
      });
    }

    if (results.length === 0) {
      return res.render('login', {
        error: 'Usuário ou senha inválidos',
        login
      });
    }

    // cria sessão (SEU CÓDIGO)
    req.session.user = {
      id: results[0].id,
      username: results[0].username,
      role: results[0].role
    };

    // redireciona por perfil (SEU CÓDIGO)
    if (results[0].role === 'gerencia') {
      return res.redirect('/gerencia');
    }

    res.redirect('/index');
  });
});

// LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Erro ao fazer logout:', err);
      return res.redirect('/');
    }

    res.clearCookie('connect.sid'); // 👈 remove cookie da sessão
    res.redirect('/');
  });
});

module.exports = router;
