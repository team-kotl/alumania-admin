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
            a.location,
            a.company, 
            a.displaypic
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

router.get("/applicant", (req, res) => {
    const query = `
        Select
            CONCAT(firstname, ' ', IFNULL(middlename, ''), ' ', lastname) AS fullname, 
            course,
            location,
            school,
            batch
        FROM applicant
    `;

    db.query(query, (err, results) => {
        if (err) { 
            console.error("Database Error:", err.sqlMessage || err);
            return res.status(500).json({ 
                error: "Database query failed", 
                details: err.sqlMessage || err
            });
        }
        res.json(results)
    });
});

router.put("/managers/:id", (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const updateQuery = `UPDATE user SET username = ?, password = ? WHERE userid = ?`;

    db.query(updateQuery, [username, password, id], (err, result) => {
        if (err) {
            console.error("Error updating manager:", err);
            return res.status(500).json({ error: "Error updating manager" });
        }
        res.json({ message: "Manager updated successfully" });
    });
});




module.exports = router;
