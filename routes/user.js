const express = require('express');
const router = express.Router();

// Endpoint untuk melihat daftar user
router.get('/', (req, res) => {
  // Ambil data user dari database
  res.render('tabel-crud', { users: [] });
});

// Endpoint untuk menambahkan user baru
router.get('/add', (req, res) => {
  res.render('add-user'); // Buat file EJS untuk menambah user
});

// Endpoint untuk menyimpan user baru
router.post('/add', (req, res) => {
  // Logika penyimpanan data user
  res.redirect('/users');
});

// Endpoint untuk edit user
router.get('/edit/:id', (req, res) => {
  const userId = req.params.id;
  // Ambil data user berdasarkan ID
  res.render('edit-user', { user: {} });
});

// Endpoint untuk update user
router.post('/edit/:id', (req, res) => {
  // Logika update data user
  res.redirect('/users');
});

// Endpoint untuk menghapus user
router.get('/delete/:id', (req, res) => {
  const userId = req.params.id;
  // Logika hapus data user
  res.redirect('/users');
});

module.exports = router;
