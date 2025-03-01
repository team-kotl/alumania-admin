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

      if (results.length > 0 && results[0].eventid) {
        const lastId = results[0].eventid;
        const num = parseInt(lastId.substring(1), 10) + 1; // Extract number part
        newId = `E${num.toString().padStart(3, "0")}`; // Generate new ID
      } else {
        console.log("No existing event IDs found. Starting from E001.");
      }

      resolve(newId);
    });
  });
};

router.post("/", upload.single("eventphoto"), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      eventtime,
      eventdate,
      batchfilter,
      school,
      eventloc,
      userid,
    } = req.body;

    console.log("Received Data from Frontend:");
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Category:", category);
    console.log("Event Date:", eventdate);
    console.log("Event Time:", eventtime);
    console.log("Event Location:", eventloc);
    console.log("Batch Filter:", batchfilter);
    console.log("School:", school);
    console.log("User ID:", userid);
    console.log(
      "Event Photo:",
      req.file ? req.file.originalname : "No file received"
    );

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
      console.error("❌ Missing required fields!");
      return res
        .status(400)
        .json({ error: "All fields including event photo are required" });
    }

    const eventphoto = req.file.buffer;
    const publishtimestamp = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const eventid = await generateEventId();

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
          console.error("❌ Database Error:", err.sqlMessage || err);
          return res
            .status(500)
            .json({ error: err.sqlMessage || "Failed to insert event" });
        }
        console.log("✅ Event Created Successfully! Event ID:", eventid);
        res
          .status(201)
          .json({ message: "Event created successfully", eventId: eventid });
      }
    );
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
