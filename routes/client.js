const express = require('express');
const router = express.Router();

// Simulasi data klien (ganti dengan logika database yang sesuai)
let clients = [];

// Rute untuk menampilkan daftar klien
router.get('/', (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    res.render('clients', { clients });
});

// Rute untuk menambahkan klien (GET)
router.get('/add', (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    res.render('add-client');
});

// Rute untuk menyimpan klien baru (POST)
router.post('/add', (req, res) => {
    const { name, email } = req.body;
    clients.push({ id: clients.length + 1, name, email }); // Simulasi penambahan
    res.redirect('/clients');
});

// Rute untuk mengedit klien (GET)
router.get('/edit/:id', (req, res) => {
    const clientId = parseInt(req.params.id);
    const client = clients.find(c => c.id === clientId);
    if (!client) return res.status(404).send('Klien tidak ditemukan');
    res.render('edit-client', { client });
});

// Rute untuk memperbarui klien (POST)
router.post('/edit/:id', (req, res) => {
    const clientId = parseInt(req.params.id);
    const { name, email } = req.body;
    const clientIndex = clients.findIndex(c => c.id === clientId);
    if (clientIndex !== -1) {
        clients[clientIndex] = { id: clientId, name, email };
    }
    res.redirect('/clients');
});

// Rute untuk menghapus klien (POST)
router.post('/delete/:id', (req, res) => {
    const clientId = parseInt(req.params.id);
    clients = clients.filter(c => c.id !== clientId);
    res.redirect('/clients');
});

module.exports = router;
