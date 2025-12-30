const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração de Sessão
app.use(session({
  secret: 'cpd284',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,  // Certifique-se de que o site está rodando em HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // Duração da sessão (1 dia)
  }
}));

// Arquivos Públicos
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rota Principal
app.get('/', (req, res) => {
  const user = req.session.user || null;  // Verifica a sessão
  res.render('index', { user });
});

// Rotas de Páginas e Autenticação
const pagesRoutes = require('./routes/pages');
const authRoutes = require('./routes/auth');
app.use('/', pagesRoutes);  // Páginas principais
app.use('/auth', authRoutes);  // Rota de autenticação

// Middleware de Erro Global
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log do erro
  res.status(500).render('error', { message: 'Algo deu errado!' });
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('🔥 Servidor rodando em http://localhost:3000');
});

module.exports = app;
