const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');

// Rute untuk mendapatkan semua tiket
router.get('/', async (req, res) => {
    const tickets = await Ticket.getAll();
    res.render('tickets', { tickets });
});

// Rute untuk menambah tiket
router.post('/add', async (req, res) => {
    await Ticket.create(req.body);
    res.redirect('/tickets');
});

// Rute untuk mengedit tiket
router.post('/edit/:id', async (req, res) => {
    await Ticket.update(req.params.id, req.body);
    res.redirect('/tickets');
});

// Rute untuk menghapus tiket
router.post('/delete/:id', async (req, res) => {
    await Ticket.delete(req.params.id);
    res.redirect('/tickets');
});

// Rute untuk menemukan tiket berdasarkan ID
router.get('/:id', async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    res.render('edit-ticket', { ticket });
});

module.exports = router;
