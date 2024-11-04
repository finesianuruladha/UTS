// src/services/auth.js

// Simulasi data pengguna
const users = [
  { username: "admin", password: "admin", role: "admin" },
  { username: "user", password: "user", role: "user" }
];

// Simulasi login
export const login = (username, password) => {
  const user = users.find(u => u.username === username && u.password === password);
  return user ? { username: user.username, role: user.role } : null;
};

// Middleware untuk memeriksa izin akses
export const authorize = (roleRequired) => {
  return (req, res, next) => {
    const user = req.session.user; // Asumsikan Anda menyimpan user dalam session setelah login
    if (!user || user.role !== roleRequired) {
      return res.status(403).json({ message: "Access denied." });
    }
    next();
  };
};

// Contoh penggunaan authorize untuk masing-masing CRUD
// Anda bisa menggunakannya di route Anda seperti berikut:

// Untuk route Event
app.post('/events', authorize('admin'), (req, res) => {
  // Logika untuk menambahkan event
});

app.get('/events', authorize('user'), (req, res) => {
  // Logika untuk mendapatkan daftar event
});

// Untuk route User
app.post('/users', authorize('admin'), (req, res) => {
  // Logika untuk menambahkan user
});

// Untuk route Ticket
app.post('/tickets', authorize('user'), (req, res) => {
  // Logika untuk menambahkan ticket
});

// Untuk route Venue
app.post('/venues', authorize('admin'), (req, res) => {
  // Logika untuk menambahkan venue
});
