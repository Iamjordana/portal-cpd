const express = require('express');
const session = require('express-session');
const path = require('path');

// Middleware do aviso
const avisoCPD = require('./middlewares/avisoCPD');

const app = express(); // ⚠️ precisa vir antes de usar app

// Configurações
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessão
app.use(session({
  secret: 'cpd284',
  resave: false,
  saveUninitialized: false
}));

// Middleware de log
app.use((req, res, next) => {
  console.log('Requisição recebida:', req.method, req.url);
  next();
});

// Middleware global: usuário e aviso
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use(avisoCPD); // ⚡ aviso do CPD em todas as páginas

// Arquivos estáticos
app.use('/static', express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/cpd', require('./routes/cpd'));


// 404
app.use((req, res) => {
  res.status(404).send('404 - Página não encontrada');
});

// Servidor
app.listen(3000, () => {
  console.log('🔥 Servidor rodando em http://localhost:3000');
});

module.exports = app;
