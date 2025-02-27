const express = require("express");
const router = express.Router();
const db = require("../db").db;


router.get("/", (req, res) => {
    db.query(
        `SELECT jobpid, title, type, location, description, companyname, publishtimestamp, userid 
        FROM jobpost
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

// Get interested users for a job post
router.get("/interested/:jobpid", (req, res) => {
    const { jobpid } = req.params;
    db.query(
        `SELECT alumni.firstname, alumni.lastname, alumni.course, TO_BASE64(alumni.displaypic) AS displaypic
        FROM interestedinjobpost
        INNER JOIN alumni ON interestedinjobpost.userid = alumni.userid
        WHERE interestedinjobpost.jobpid = ?`,
        [jobpid],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        }
    );
});

module.exports = router;
