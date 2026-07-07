// File Name: backend/server/index.js

// ================================
// Import Required Packages
// ================================
const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

// Create Express App
const app = express();
const PORT = 5000;

// ================================
// Middleware
// ================================
app.use(cors());
app.use(express.json());

// ================================
// Connect to SQLite Database
// ================================
const db = new Database("data.db");

// ================================
// Create rooms table if not exists
// ================================
db.exec(`
CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guest_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    room_number TEXT NOT NULL,
    room_type TEXT NOT NULL,
    check_in TEXT NOT NULL,
    check_out TEXT NOT NULL,
    status TEXT DEFAULT 'Booked',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

console.log("Database Connected");

// ==========================================================
// POST /rooms
// Create Booking
// ==========================================================
app.post("/rooms", (req, res) => {

    const {
        guest_name,
        email,
        phone,
        room_number,
        room_type,
        check_in,
        check_out
    } = req.body;

    // Validation
    if (
        !guest_name ||
        !email ||
        !room_number ||
        !room_type ||
        !check_in ||
        !check_out
    ) {
        return res.status(400).json({
            message: "Please fill all required fields."
        });
    }

    // Check duplicate email
    const emailExists = db
        .prepare("SELECT * FROM rooms WHERE email=?")
        .get(email);

    if (emailExists) {
        return res.status(409).json({
            message: "Email already exists."
        });
    }

    // Insert Booking
    const insert = db.prepare(`
        INSERT INTO rooms
        (
            guest_name,
            email,
            phone,
            room_number,
            room_type,
            check_in,
            check_out
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
        guest_name,
        email,
        phone || "",
        room_number,
        room_type,
        check_in,
        check_out
    );

    res.json({
        message: "Room booked successfully.",
        id: result.lastInsertRowid
    });

});

// ==========================================================
// GET /rooms
// Read All Bookings
// Supports:
// page
// limit
// search
// ==========================================================
app.get("/rooms", (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";

    const offset = (page - 1) * limit;

    let where = "";
    let params = [];

    if (search.trim() !== "") {

        where = `
        WHERE
        LOWER(guest_name) LIKE ?
        OR LOWER(room_number) LIKE ?
        OR LOWER(room_type) LIKE ?
        `;

        const keyword = `%${search.toLowerCase()}%`;

        params = [keyword, keyword, keyword];
    }

    // Total Count
    const total = db
        .prepare(`SELECT COUNT(*) AS total FROM rooms ${where}`)
        .get(...params).total;

    // Fetch Data
    const bookings = db.prepare(`
        SELECT *
        FROM rooms
        ${where}
        ORDER BY id DESC
        LIMIT ?
        OFFSET ?
    `).all(...params, limit, offset);

    res.json({
        data: bookings,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
    });

});

// ==========================================================
// GET /rooms/:id
// Get Single Booking
// ==========================================================
app.get("/rooms/:id", (req, res) => {

    const booking = db
        .prepare("SELECT * FROM rooms WHERE id=?")
        .get(req.params.id);

    if (!booking) {
        return res.status(404).json({
            message: "Booking not found."
        });
    }

    res.json(booking);

});

// ==========================================================
// PUT /rooms/:id
// Update Booking
// ==========================================================
app.put("/rooms/:id", (req, res) => {

    const id = req.params.id;

    const booking = db
        .prepare("SELECT * FROM rooms WHERE id=?")
        .get(id);

    if (!booking) {
        return res.status(404).json({
            message: "Booking not found."
        });
    }

    const {
        guest_name,
        email,
        phone,
        room_number,
        room_type,
        check_in,
        check_out,
        status
    } = req.body;

    // Check duplicate email
    if (email) {

        const duplicate = db.prepare(`
            SELECT *
            FROM rooms
            WHERE email=?
            AND id<>?
        `).get(email, id);

        if (duplicate) {
            return res.status(409).json({
                message: "Email already exists."
            });
        }
    }

    db.prepare(`
        UPDATE rooms
        SET
        guest_name=?,
        email=?,
        phone=?,
        room_number=?,
        room_type=?,
        check_in=?,
        check_out=?,
        status=?
        WHERE id=?
    `).run(
        guest_name || booking.guest_name,
        email || booking.email,
        phone || booking.phone,
        room_number || booking.room_number,
        room_type || booking.room_type,
        check_in || booking.check_in,
        check_out || booking.check_out,
        status || booking.status,
        id
    );

    res.json({
        message: "Booking updated successfully."
    });

});

// ==========================================================
// DELETE /rooms/:id
// Delete Booking
// ==========================================================
app.delete("/rooms/:id", (req, res) => {

    const booking = db
        .prepare("SELECT * FROM rooms WHERE id=?")
        .get(req.params.id);

    if (!booking) {
        return res.status(404).json({
            message: "Booking not found."
        });
    }

    db.prepare("DELETE FROM rooms WHERE id=?")
        .run(req.params.id);

    res.json({
        message: "Booking deleted successfully."
    });

});

// ==========================================================
// Default Route
// ==========================================================
app.get("/", (req, res) => {

    res.send("Hotel Management REST API Running");

});

// ==========================================================
// Start Server
// ==========================================================
app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});