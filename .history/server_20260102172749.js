const express = require('express');
const session = require('express-session');
const path = require('path');
const avisoCPD = require('./middlewares/avisoCPD');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessão
app.use(session({
  secret: 'cpd284',
  resave: false,
  saveUninitialized: false
}));

// Log
app.use((req, res, next) => {
  console.log('Requisição recebida:', req.method, req.url);
  next();
});

// Variáveis globais
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Middleware global seguro
app.use(avisoCPD);

// Estáticos
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// Rotas
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/cpd', require('./routes/cpd'));

// 404
app.use((req, res) => {
  res.status(404).send('404 - Página não encontrada');
});

// Servidor
app.listen(3000, () => console.log('🔥 Servidor rodando em http://localhost:3000'));
