const express = require("express");
const router = express.Router();
const db = require("../db").db;
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const generateEventId = async () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT eventid FROM event ORDER BY eventid DESC LIMIT 1";
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      let newId = "E001"; // Default if no events exist
      if (results.length > 0) {
        const lastId = results[0].eventid;
        const num = parseInt(lastId.substring(1), 10) + 1;
        newId = `E${num.toString().padStart(3, "0")}`;
      }
      resolve(newId);
    });
  });
};

// Create an event
router.post("/", upload.single("eventphoto"), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      eventtime,
      eventdate,
      eventloc,
      batchfilter,
      school,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !eventtime ||
      !eventdate ||
      !eventloc ||
      !batchfilter ||
      !school ||
      !req.file
    ) {
      return res
        .status(400)
        .json({ error: "All fields including event photo are required" });
    }

    const eventphoto = req.file.buffer;
    const formatDateTimeForMySQL = (date) => {
      return date.toISOString().slice(0, 19).replace("T", " ");
    };

    const publishtimestamp = formatDateTimeForMySQL(new Date());

    const userid = "U001"; // Default user ID
    const eventid = await generateEventId(); // Generate unique event ID

    const insertQuery = `
            INSERT INTO event (eventid, title, description, category, eventtime, eventdate, eventloc, batchfilter, publishtimestamp, school, eventphoto, userid)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    db.query(
      insertQuery,
      [
        eventid,
        title,
        description,
        category,
        eventtime,
        eventdate,
        eventloc,
        batchfilter,
        publishtimestamp,
        school,
        eventphoto,
        userid,
      ],
      (err, result) => {
        if (err) {
          console.error("Database Insertion Error:", err.sqlMessage || err);
          return res
            .status(500)
            .json({ error: "Failed to insert event into database" });
        }
        res
          .status(201)
          .json({ message: "Event created successfully", eventId: eventid });
      }
    );
  } catch (error) {
    console.error("Error processing event creation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
