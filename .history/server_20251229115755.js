const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/auth');
const pageRoutes = require('./routes/pages');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'cpd284-secreto',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoutes);
app.use(pageRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
