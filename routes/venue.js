const express = require('express');
const router = express.Router();

// Simulasi data venue (ganti dengan logika database yang sesuai)
let venues = [];

// Rute untuk menampilkan daftar venue
router.get('/', (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    res.render('venues', { venues });
});

// Rute untuk menambahkan venue (GET)
router.get('/add', (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    res.render('add-venue');
});

// Rute untuk menyimpan venue baru (POST)
router.post('/add', (req, res) => {
    const { name, location } = req.body;
    venues.push({ id: venues.length + 1, name, location }); // Simulasi penambahan
    res.redirect('/venues');
});

// Rute untuk mengedit venue (GET)
router.get('/edit/:id', (req, res) => {
    const venueId = parseInt(req.params.id);
    const venue = venues.find(v => v.id === venueId);
    if (!venue) return res.status(404).send('Venue tidak ditemukan');
    res.render('edit-venue', { venue });
});

// Rute untuk memperbarui venue (POST)
router.post('/edit/:id', (req, res) => {
    const venueId = parseInt(req.params.id);
    const { name, location } = req.body;
    const venueIndex = venues.findIndex(v => v.id === venueId);
    if (venueIndex !== -1) {
        venues[venueIndex] = { id: venueId, name, location };
    }
    res.redirect('/venues');
});

// Rute untuk menghapus venue (POST)
router.post('/delete/:id', (req, res) => {
    const venueId = parseInt(req.params.id);
    venues = venues.filter(v => v.id !== venueId);
    res.redirect('/venues');
});

module.exports = router;
