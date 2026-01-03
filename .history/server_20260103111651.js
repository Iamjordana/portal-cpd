const express = require('express');
const session = require('express-session');
const path = require('path');

const avisoCPD = require('./middlewares/avisoCPD');
const avisosGlobais = require('./middlewares/avisosGlobais');

const app = express(); // ✅ PRIMEIRO cria o app

// ================= VIEW ENGINE =================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ================= BODY =================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================= SESSÃO =================
app.use(
  session({
    secret: 'cpd284',
    resave: false,
    saveUninitialized: false,
  })
);

// ================= LOG =================
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ================= USER GLOBAL =================
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// ================= AVISOS GLOBAIS =================
app.use(avisosGlobais); // ✅ AGORA FUNCIONA
app.use(avisoCPD);

// ================= ARQUIVOS ESTÁTICOS =================
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// ================= ROTAS =================
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/cpd', require('./routes/cpd'));

// ================= 404 =================
app.use((req, res) => {
  res.status(404).send('404 - Página não encontrada');
});

// ================= SERVIDOR =================
app.listen(3000, () => {
  console.log('🔥 Servidor rodando em http://localhost:3000');
});
