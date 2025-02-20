const express = require("express");
const router = express.Router();
const db = require("../db").db;

// Get all users (alumni)
router.get("/", (req, res) => {
    db.query("SELECT * FROM user", (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });
});

module.exports = router;
