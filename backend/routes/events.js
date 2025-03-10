const express = require("express");
const router = express.Router();
const db = require("../db").db;

// Get all events
router.get("/", (req, res) => {
    const { search } = req.query; // Get search query from request

    let query = `
        SELECT event.eventid, event.title, event.description, event.category, 
                TIME_FORMAT(event.eventtime, '%h:%i %p') AS eventtime, 
                DATE_FORMAT(event.eventdate, '%M %d, %Y') AS eventdate,
                event.eventloc, event.batchfilter, event.publishtimestamp, event.school, 
                TO_BASE64(event.eventphoto) AS eventphoto, event.userid,
                COUNT(interestedinevent.userid) AS interested_count
        FROM event
        LEFT JOIN interestedinevent ON event.eventid = interestedinevent.eventid
    `;

    // Add search filter if search query is provided
    if (search) {
        query += ` WHERE event.title LIKE ? OR event.eventloc LIKE ?`;
    }

    // Group by event details to get the correct count
    query += ` GROUP BY event.eventid`;

    // Order by publish timestamp
    query += ` ORDER BY event.publishtimestamp DESC`;

    // Prepare parameters for the query
    const params = search ? [`%${search}%`, `%${search}%`] : [];

    db.query(query, params, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
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