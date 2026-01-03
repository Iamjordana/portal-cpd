// db.js
const mysql = require('mysql2/promise');

// Cria o pool de conexões (promise)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123@root',
  database: 'portal_cpd',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Teste de conexão inicial
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ MySQL conectado com sucesso');
    conn.release();
  } catch (err) {
    console.error('❌ Erro ao conectar no MySQL:', err);
  }
})();

module.exports = pool;
// db.js
const mysql = require('mysql2/promise');

// Cria o pool de conexões (promise)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123@root',
  database: 'portal_cpd',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Teste de conexão inicial
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ MySQL conectado com sucesso');
    conn.release();
  } catch (err) {
    console.error('❌ Erro ao conectar no MySQL:', err);
  }
})();

module.exports = pool;
