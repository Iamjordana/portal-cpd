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


module.exports = pool;
