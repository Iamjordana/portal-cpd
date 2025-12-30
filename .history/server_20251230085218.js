const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// BODY PARSER
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SESSION
app.use(session({
  secret: 'cpd284',
  resave: false,
  saveUninitialized: false
}));

// ARQUIVOS PÚBLICOS
app.use(express.static(path.join(__dirname, 'public')));  // Serve arquivos estáticos da pasta "public"

// VIEW ENGINE
app.set('view engine', 'ejs');  // Configura o EJS como motor de template
app.set('views', path.join(__dirname, 'views'));  // Define o diretório das views

// ROTA PRINCIPAL
app.get('/', (req, res) => {
  // Pegue o usuário da sessão (se houver) e passe para a view
  const user = req.session.user || null;
  res.render('index', { user });  // Passa 'user' como uma variável para o template
});

// ROTAS
const pagesRoutes = require('./routes/pages');
const authRoutes = require('./routes/auth');

app.use('/', pagesRoutes);  // As rotas para a página inicial
app.use('/auth', authRoutes);  // As rotas para autenticação

// SERVER
app.listen(3000, () => {
  console.log('🔥 Servidor rodando em http://localhost:3000');
});
module.exports = app;