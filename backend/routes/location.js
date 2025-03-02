const express = require("express");
const router = express.Router();
const db = require("../db").db;

// Function to insert location into a specified table
const insertLocation = (req, res, table, column) => {
const { region, province, city, street } = req.body;

    if (!region || !province || !city || !street) {
        return res.status(400).json({ error: "All location fields are required." });
    }

const location = `${region}, ${province}, ${city}, ${street}`;

const insertQuery = `INSERT INTO ${table} (${column}) VALUES (?)`;
    db.query(insertQuery, [location], (err, result) => {
        if (err) {
        console.error(`Database Error (${table} Location):`, err);
        return res
            .status(500)
            .json({ error: `Failed to insert ${table} location into database.` });
        }
        res
        .status(201)
        .json({ message: `${table} location stored successfully`, location });
    });
};

// Function to fetch locations from a specified table
const fetchLocations = (req, res, table, column) => {
    const query = `SELECT ${column} FROM ${table}`;
    db.query(query, (err, results) => {
        if (err) {
        console.error(`Database Error (Fetching ${table} Locations):`, err);
        return res
            .status(500)
            .json({ error: `Database error while fetching ${table} locations.` });
        }
        res.json(results);
    });
};

router.post("/event-location", (req, res) =>
    insertLocation(req, res, "event", "eventloc")
);
router.get("/event-locations", (req, res) =>
    fetchLocations(req, res, "event", "eventloc")
);

router.post("/job-location", (req, res) =>
    insertLocation(req, res, "jobpost", "location")
);
router.get("/job-locations", (req, res) =>
    fetchLocations(req, res, "jobpost", "location")
);

module.exports = router;