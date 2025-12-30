const express = require('express');
const session = require('express-session');
const path = require('path'); // 👈 UMA ÚNICA VEZ

const app = express();

// 🔹 Middlewares básicos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔹 Sessão
app.use(session({
  secret: 'cpd284',
  resave: false,
  saveUninitialized: false
}));

// 🔹 Arquivos públicos (CSS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// 🔹 View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 🔹 Rotas
const authRoutes = require('./routes/auth');
const pagesRoutes = require('./routes/pages');

app.use('/', pagesRoutes);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// 🔹 Servidor
app.listen(3000, () => {
  console.log('🔥 Servidor rodando em http://localhost:3000');
});