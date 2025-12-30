const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

// --- Middlewares de Processamento de Requisição ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- Middlewares de Sessão e Variáveis Locais (Ordem Crítica) ---
app.use(session({
  secret: 'cpd284',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// --- Configuração de Views e Arquivos Estáticos ---
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');  // Configuração do motor de template

// --- Rotas Principais ---
const pagesRoutes = require('./routes/pages');
const authRoutes = require('./routes/auth');
app.use('/', pagesRoutes);
app.use('/auth', authRoutes);

// --- Middlewares de Tratamento de Erros (No final) ---

// Middleware para rotas não encontradas (404)
app.use((req, res, next) => {
  res.status(404).render('error', { message: 'Página não encontrada!' });
});

// Middleware de Erro Global (captura erros inesperados)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Algo deu errado!' });
});

// --- Inicia o servidor ---
app.listen(3000, () => {
  console.log('🔥 Servidor rodando em http://localhost:3000');
});

module.exports = app;
