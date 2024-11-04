const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Ganti jika Anda memiliki password
    database: 'event_management', // Pastikan database ini sudah ada
    port: 3307 // Ganti port jika Anda menggunakan port yang berbeda
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected...');
});

module.exports = db;
