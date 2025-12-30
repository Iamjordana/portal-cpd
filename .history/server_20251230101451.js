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
app.use('/static', express.static(path.join(__dirname, 'public'))); 
app.set('view engine', 'ejs'); // Configuração do motor de template

// --- Rotas Principais ---
const pagesRoutes = require('./routes/pages');
const authRoutes = require('./routes/auth');
app.use('/', pagesRoutes);
app.use('/auth', authRoutes);

// Middleware para rotas não encontradas (404)
app.use((req, res, next) => {
  res.status(404).type('text/html').send('<h1>404: Página não encontrada!</h1><p><a href="/">Voltar</a></p>');
});

// Middleware de Erro Global (captura erros inesperados)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).type('text/html').send('<h1>500: Algo deu errado!</h1><p><a href="/">Voltar</a></p>');
});
// --- Inicia o servidor ---
app.listen(3000, () => {
  console.log('🔥 Servidor rodando em http://localhost:3000');
});

module.exports = app;
