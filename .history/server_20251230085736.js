const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// Body Parser (para interpretar dados de formulários)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração de Sessão (para armazenar a sessão do usuário)
app.use(session({
  secret: 'cpd284', // Alterar para algo único e seguro
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,  // Para desenvolvimento local (sem HTTPS)
    httpOnly: true,  // Impede acesso via JavaScript
    maxAge: 24 * 60 * 60 * 1000 // Duração da sessão (1 dia)
  }
}));

// Arquivos Públicos (configuração de arquivos estáticos como CSS, JS e imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Pasta das views (EJS)

// Rota Principal (home)
app.get('/', (req, res) => {
  const user = req.session.user || null;  // Obtém o usuário da sessão, se houver
  res.render('index', { user });  // Passa a variável 'user' para a view 'index.ejs'
});

// Rotas de Páginas e Autenticação
const pagesRoutes = require('./routes/pages');  // As rotas de páginas
const authRoutes = require('./routes/auth');    // As rotas de autenticação
app.use('/', pagesRoutes);  // As rotas principais
app.use('/auth', authRoutes);  // As rotas de login/logout

// Middleware para rotas não encontradas (404)
app.use((req, res, next) => {
  res.status(404).render('error', { message: 'Página não encontrada!' });
});

// Middleware de Erro Global (captura erros inesperad
