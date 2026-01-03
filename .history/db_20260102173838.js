// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123@root',
  database: 'portal_cpd',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

connection.connect(err => {
  if (err) {
    console.error('Erro MySQL:', err);
  } else {
    console.log('✅ MySQL conectado');
  }
});

module.exports = pool;
