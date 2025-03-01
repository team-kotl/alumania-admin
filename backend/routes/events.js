const express = require("express");
const router = express.Router();
const db = require("../db").db;


router.put("/edit-event/:eventid", (req, res) => {
    const { eventid } = req.params;
    const { title, category, eventtime, eventdate, eventloc, } = req.body;

    const query = `
        UPDATE event 
        SET title = ?, category = ?, eventtime = ?, eventdate = ?, eventloc = ?
        WHERE eventid = ?
    `;

    db.query(query, [title, category, eventtime, eventdate, eventloc, eventid], (err, results) => {
        if (err) {
            console.log("Error updating event:", err);
            return res.status(500).json({ error: err.message });
        }
        console.log("Event updated successfully:", results);
        res.status(200).json({ message: "Event updated successfully", results });
    });
});


router.delete("/delete-event/:eventid", (req, res) => {
    const { eventid } = req.params;
    
    const query = `DELETE FROM event WHERE eventid = ?`;

    db.query(query, [eventid], (err, results) => {
        if (err) {
            console.log("Error deleting event:", err);
            return res.status(500).json({ error: err.message });
        }
        console.log("Event deleted successfully:", results);
        res.status(200).json({ message: "Event deleted successfully" });
    });
});

module.exports = router;