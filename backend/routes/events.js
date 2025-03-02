const express = require("express");
const router = express.Router();
const db = require("../db").db;

// Get all events
router.get("/", (req, res) => {
    db.query(
        `SELECT eventid, title, description, category, 
                TIME_FORMAT(eventtime, '%h:%i %p') AS eventtime, 
                DATE_FORMAT(eventdate, '%M %d, %Y') AS eventdate,
                 eventloc, batchfilter, publishtimestamp, school, 
                TO_BASE64(eventphoto) AS eventphoto, userid 
        FROM event
        ORDER BY publishtimestamp DESC`,
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        }
    );
});

// Get interested users for an event
router.get("/interested/:eventid", (req, res) => {
    const { eventid } = req.params;
    db.query(
        `SELECT alumni.firstname, alumni.lastname, alumni.course, TO_BASE64(alumni.displaypic) AS displaypic
        FROM interestedinevent
        INNER JOIN alumni ON interestedinevent.userid = alumni.userid
        WHERE interestedinevent.eventid = ?`,
        [eventid],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        }
    );
});

// Edit an event
router.put("/:eventid", (req, res) => {
    const { eventid } = req.params;
    const { title, date, time, location, category } = req.body;

    if (!title || !date || !time || !location || !category) {
        return res.status(400).json({ error: "All fields are required" });
    }

    db.query(
        `UPDATE event 
        SET title = ?, eventdate = ?, eventtime = ?, eventloc = ?, category = ?
        WHERE eventid = ?`,
        [title, date, time, location, category, eventid],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Event not found" });
            }
            res.status(200).json({ message: "Event updated successfully" });
        }
    );
});

module.exports = router;