const express = require('express');
const router = express.Router();
const Event = require('../models/event'); // Pastikan path ini benar

// Menampilkan daftar event
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll(); // Mengambil semua event dari database
        res.render('event', { events }); // Mengirim data event ke view
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Menampilkan form untuk menambah event
router.get('/add', (req, res) => {
    res.render('add-event'); // Pastikan file add-event.ejs ada
});

// Menyimpan event baru
router.post('/add', async (req, res) => {
    const { name, description } = req.body;
    try {
        await Event.create({ name, description }); // Menambahkan event baru ke database
        res.redirect('/events');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Menampilkan form untuk mengedit event
router.get('/edit/:id', async (req, res) => {
    const eventId = req.params.id;
    try {
        const event = await Event.findByPk(eventId); // Mengambil event berdasarkan ID
        if (!event) {
            return res.status(404).send('Event tidak ditemukan');
        }
        res.render('edit-event', { event }); // Mengirim data event ke form edit
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Mengupdate event
router.post('/edit/:id', async (req, res) => {
    const eventId = req.params.id;
    const { name, description } = req.body;
    try {
        await Event.update({ name, description }, {
            where: { id: eventId }
        });
        res.redirect('/events');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Menghapus event
router.get('/delete/:id', async (req, res) => {
    const eventId = req.params.id;
    try {
        await Event.destroy({
            where: { id: eventId }
        });
        res.redirect('/events');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
