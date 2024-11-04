const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./config/db'); // Konfigurasi database
const eventRoutes = require('./routes/event'); // Rute untuk event
const ticketRoutes = require('./routes/ticket'); // Rute untuk tiket
const userRoutes = require('./routes/user'); // Rute untuk pengguna
const venueRoutes = require('./routes/venue'); // Rute untuk venue

const app = express();
const PORT = 3000;

// Set EJS sebagai view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk mengakses file statis
app.use(express.static('public'));

// Middleware untuk parsing data form dan JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware session
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Rute halaman beranda
app.get('/', (req, res) => {
  const isLoggedIn = req.session.isLoggedIn || false;
  res.render('index', { isLoggedIn });
});

// Halaman login dan registrasi
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

// Proses registrasi dan login
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  console.log(`Registrasi berhasil untuk user: ${username}`);
  res.redirect('/login');
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  req.session.isLoggedIn = true;
  console.log(`Login attempt dengan email: ${email}`);
  res.redirect('/');
});

// Halaman tabel CRUD gabungan
app.get('/tabel-crud', async (req, res) => {
  try {
    const events = await getEventsFromDatabase();
    const tickets = await getTicketsFromDatabase();
    const venues = await getVenuesFromDatabase();
    res.render('tabel-crud', { events, tickets, venues });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Rute CRUD untuk pengguna
app.get('/add', (req, res) => res.render('add'));
app.post('/add', (req, res) => res.redirect('/tabel-crud'));
app.get('/edit/:id', (req, res) => {
  const user = { id: req.params.id, name: 'User A', email: 'usera@example.com' };
  res.render('edit', { user });
});
app.post('/edit/:id', (req, res) => res.redirect('/tabel-crud'));
app.get('/delete/:id', (req, res) => res.redirect('/tabel-crud'));

// Menggunakan rute dari folder routes untuk event, ticket, user, dan venue
app.use('/events', eventRoutes); // Rute utama untuk event
app.use('/tickets', ticketRoutes); // Rute utama untuk ticket
app.use('/users', userRoutes); // Rute utama untuk pengguna
app.use('/venues', venueRoutes); // Rute utama untuk venue

// Fungsi untuk mengambil data acara dari database (simulasi)
async function getEventsFromDatabase() {
  return [
    { id: 1, name: 'Pameran Seni Rupa', description: 'Pameran seni rupa oleh mahasiswa sistem informasi kelautan' },
    { id: 2, name: 'Konser Gelora 2024', description: 'Konser untuk memperingati ulang tahun Jakarta' },
  ];
}

// Fungsi untuk mengambil data tiket (simulasi)
async function getTicketsFromDatabase() {
  return [
    { id: 1, name: 'Tiket VIP', price: 100000 },
    { id: 2, name: 'Tiket Reguler', price: 50000 },
  ];
}

// Fungsi untuk mengambil data venue (simulasi)
async function getVenuesFromDatabase() {
  return [
    { id: 1, name: 'Arena Konser', address: 'Jl. Raya No.1' },
    { id: 2, name: 'Gedung Serba Guna', address: 'Jl. Kebangsaan No.2' },
  ];
}

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
