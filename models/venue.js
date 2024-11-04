const db = require('../config/db'); // Import koneksi database

// Model untuk Venue
class Venue {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM venues');
        return rows;
    }

    static async create(data) {
        const { name, location } = data;
        await db.query('INSERT INTO venues (name, location) VALUES (?, ?)', [name, location]);
    }

    static async update(id, data) {
        const { name, location } = data;
        await db.query('UPDATE venues SET name = ?, location = ? WHERE id = ?', [name, location, id]);
    }

    static async delete(id) {
        await db.query('DELETE FROM venues WHERE id = ?', [id]);
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM venues WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = Venue;
