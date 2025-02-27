const express = require("express");
const router = express.Router();
const db = require("../db").db;
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create an event
router.post("/", upload.single("eventphoto"), (req, res) => {
  const {
    title,
    description,
    category,
    eventtime,
    eventloc,
    batchfilter,
    school,
  } = req.body;
  const eventphoto = req.file ? req.file.buffer : null;
  const publishtimestamp = new Date().toISOString();

  if (
    !title ||
    !description ||
    !category ||
    !eventtime ||
    !eventloc ||
    !batchfilter ||
    !school
  ) {
    return res
      .status(400)
  }

  const insertQuery = `
        INSERT INTO events (title, description, category, eventtime, eventloc, batchfilter, school, eventphoto, publishtimestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    insertQuery,
    [
      title,
      description,
      category,
      eventtime,
      eventloc,
      batchfilter,
      school,
      eventphoto,
      publishtimestamp,
    ],
    (err, result) => {
      if (err) {
        console.error("Database Insertion Error:", err);
        return res
          .status(500)
          .json({ error: "Failed to insert event into database" });
      }
      res
        .status(201)
        .json({
          message: "Event created successfully",
          eventId: result.insertId,
        });
    }
  );
});

module.exports = router;
