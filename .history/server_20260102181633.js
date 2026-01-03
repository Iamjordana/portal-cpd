const express = require('express');
const session = require('express-session');
const path = require('path');
const avisoCPD = require('./middlewares/avisoCPD');

const app = express();

// Configuração da view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // pasta de views

// Middleware para ler body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessão
app.use(
  session({
    secret: 'cpd284',
    resave: false,
    saveUninitialized: false,
  })
);

// Log simples de requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Variáveis globais (user e aviso)
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Middleware avisoCPD para exibir avisos em qualquer página
app.use(avisoCPD);

// Arquivos estáticos
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// Rotas
app.use('/', require('./routes/pages')); // rota principal /index
app.use('/auth', require('./routes/auth')); // login/logout
app.use('/cpd', require('./routes/cpd')); // painel CPD (cpdpainel.ejs)

// Rota 404
app.use((req, res) => res.status(404).send('404 - Página não encontrada'));

// Servidor
app.listen(3000, () => console.log('🔥 Servidor rodando em http://localhost:3000'));
