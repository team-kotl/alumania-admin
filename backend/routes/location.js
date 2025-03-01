const express = require("express");
const router = express.Router();
const db = require("../db").db;

// Store event location in `eventloc` column of `event` table
router.post("/event-location", (req, res) => {
  const { region, province, city, street } = req.body;

  if (!region || !province || !city || !street) {
    return res.status(400).json({ error: "All location fields are required." });
  }

  // Format eventloc as "Region, Province, City, Street"
  const eventloc = `${region}, ${province}, ${city}, ${street}`;

  const insertQuery = `
        INSERT INTO event (eventloc)
        VALUES (?)
    `;

  db.query(insertQuery, [eventloc], (err, result) => {
    if (err) {
      console.error("Database Error (Event Location):", err);
      return res
        .status(500)
        .json({ error: "Failed to insert event location into database." });
    }
    res
      .status(201)
      .json({ message: "Event location stored successfully", eventloc });
  });
});

// Fetch all event locations
router.get("/event-locations", (req, res) => {
  const query = "SELECT eventloc FROM event";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database Error (Fetching Event Locations):", err);
      return res
        .status(500)
        .json({ error: "Database error while fetching event locations." });
    }
    res.json(results);
  });
});

module.exports = router;
