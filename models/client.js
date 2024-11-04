const db = require('../config/db'); // Import koneksi database

// Model untuk Klien
class Client {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM clients');
        return rows;
    }

    static async create(data) {
        const { name, email, phone } = data;
        await db.query('INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]);
    }

    static async update(id, data) {
        const { name, email, phone } = data;
        await db.query('UPDATE clients SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, id]);
    }

    static async delete(id) {
        await db.query('DELETE FROM clients WHERE id = ?', [id]);
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM clients WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = Client;
