const express = require('express');
const session = require('express-session');
const path = require('path');

const avisoCPD = require("./middlewares/avisoCPD");

app.set("view engine", "ejs");

// Middleware global
app.use(avisoCPD);

// Rotas
const router = require("./routes/index");
app.use("/", router);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

const app = express();

// LOG
app.use((req, res, next) => {
  console.log('Requisição recebida:', req.method, req.url);
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'cpd284',
  resave: false,
  saveUninitialized: false
}));

// user disponível nas views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// 🔥 AVISO CPD
const avisoCPD = require('./middlewares/avisoCPD');
app.use(avisoCPD);

// arquivos estáticos
app.use('/static', express.static(path.join(__dirname, 'public')));

// views
app.set('view engine', 'ejs');

// rotas
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

// 404
app.use((req, res) => {
  res.status(404).send('404 - Página não encontrada');
});

// servidor
app.listen(3000, () => {
  console.log('🔥 Servidor rodando em http://localhost:3000');
});


module.exports = app;
