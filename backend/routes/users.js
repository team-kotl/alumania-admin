const express = require("express");
const router = express.Router();
const db = require("../db").db;

// Get alumni users
router.get("/", (req, res) => {
    const query = `
        SELECT 
            u.userid, 
            a.email, 
            CONCAT(a.firstname, ' ', IFNULL(a.middlename, ''), ' ', a.lastname) AS fullname, 
            a.school, 
            a.batch,
            a.empstatus, 
            a.location 
        FROM user u
        JOIN alumni a ON u.userid = a.userid
        WHERE u.usertype = 'alumni'
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Database Error:", err.sqlMessage || err);
            return res.status(500).json({ error: "Database query failed", details: err.sqlMessage || err });
        }
        res.json(results);
    });
});

// Get manager users
router.get("/managers", (req, res) => {
    const query = `
        SELECT 
            userid, 
            username
        FROM user
        WHERE usertype = 'manager'
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Database Error:", err.sqlMessage || err);
            return res.status(500).json({ error: "Database query failed", details: err.sqlMessage || err });
        }
        res.json(results);
    });
});

module.exports = router;
