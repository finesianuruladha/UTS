const db = require('../config/db'); // Import koneksi database

// Model untuk Tiket
class Ticket {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM tickets');
        return rows;
    }

    static async create(data) {
        const { name, price, eventId } = data;
        await db.query('INSERT INTO tickets (name, price, eventId) VALUES (?, ?, ?)', [name, price, eventId]);
    }

    static async update(id, data) {
        const { name, price, eventId } = data;
        await db.query('UPDATE tickets SET name = ?, price = ?, eventId = ? WHERE id = ?', [name, price, eventId, id]);
    }

    static async delete(id) {
        await db.query('DELETE FROM tickets WHERE id = ?', [id]);
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM tickets WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = Ticket;
