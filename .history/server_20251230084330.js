const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// BODY
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SESSION
app.use(session({
  secret: 'cpd284',
  resave: false,
  saveUninitialized: false
}));

const express = require('express');
const app = express();

app.use(express.static('public'));  // Isso permite que o Express sirva os arquivos da pasta "public"

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');  // Exemplo de como enviar o HTML
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ROTAS
const pagesRoutes = require('./routes/pages');
const authRoutes = require('./routes/auth');

app.use('/', pagesRoutes);
app.use('/auth', authRoutes);

// SERVER
app.listen(3000, () => {
  console.log('🔥 Servidor rodando em http://localhost:3000');
});
