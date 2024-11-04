const express = require('express');
const router = express.Router();

// Contoh: Mendapatkan data dari database (ini bisa diubah sesuai kebutuhan Anda)
router.get('/tabel-crud', (req, res) => {
    const events = [
        { id: 1, name: 'Konser Musik', description: 'Konser musik tahunan' },
        // Tambahkan data event lainnya di sini
    ];  
    const tickets = [
        { id: 1, name: 'Tiket VIP', price: 100000 },
        // Tambahkan data tiket lainnya di sini
    ];  
    const venues = [
        { id: 1, name: 'Arena Konser', address: 'Jl. Raya No.1' },
        // Tambahkan data venue lainnya di sini
    ];

    res.render('tabel-crud', { events, tickets, venues });
});

module.exports = router;
