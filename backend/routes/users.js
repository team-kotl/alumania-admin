const express = require("express");
const router = express.Router();
const db = require("../db").db;

// Get alumni users
router.get("/", (req, res) => {
    const { search, status, location } = req.query;

    let query = `
        SELECT 
            u.userid, 
            a.email, 
            CONCAT(a.firstname, ' ', IFNULL(a.middlename, ''), ' ', a.lastname) AS fullname, 
            a.school, 
            a.batch, 
            a.course,
            a.empstatus, 
            a.location,
            a.company, 
            a.displaypic
        FROM user u
        JOIN alumni a ON u.userid = a.userid
        WHERE u.usertype = 'alumni'
    `;

    let conditions = [];
    let params = [];

    // Search across multiple fields
    if (search) {
        conditions.push(`
            (u.userid LIKE ? 
            OR a.email LIKE ? 
            OR CONCAT(a.firstname, ' ', IFNULL(a.middlename, ''), ' ', a.lastname) LIKE ?)
        `);
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (status) {
        conditions.push("a.empstatus = ?");
        params.push(status);
    }

    if (location) {
        conditions.push("a.location = ?");
        params.push(location);
    }

    if (conditions.length > 0) {
        query += ` AND ${conditions.join(" AND ")}`;
    }

    db.query(query, params, (err, results) => {
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
            username,
            password
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
            applicantid,
            username,
            password,
            email,
            CONCAT(firstname, ' ', IFNULL(middlename, ''), ' ', lastname) AS fullname, 
            course,
            company,
            empstatus,
            location,
            school,
            displaypic,
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

    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    let updateQuery;
    let queryParams;

    if (password) {
        updateQuery = `UPDATE user SET username = ?, password = ? WHERE userid = ?`;
        queryParams = [username, password, id];
    } else {
        updateQuery = `UPDATE user SET username = ? WHERE userid = ?`;
        queryParams = [username, id];
    }

    db.query(updateQuery, queryParams, (err, result) => {
        if (err) {
            console.error("Error updating manager:", err);
            return res.status(500).json({ error: "Error updating manager" });
        }
        res.json({ message: "Manager updated successfully" });
    });
});


const generateUserId = async () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT userid FROM user ORDER BY userid DESC LIMIT 1";
        db.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            let newId = "U001"; // Default if no users exist
            if (results.length > 0) {
                const lastId = results[0].userid;
                const num = parseInt(lastId.substring(1), 10) + 1;
                newId = `U${num.toString().padStart(3, "0")}`;
            }
            resolve(newId);
        });
    });
};

router.post("/accept/:applicantId", async (req, res) => {
    const { applicantId } = req.params;
    const jointimestamp = new Date();
    console.log("Received applicantId:", applicantId);

    try {
        const results = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM applicant WHERE applicantid = ?";
            db.query(query, [applicantId], (err, results) => {
                if (err) {
                    console.error("Database Error (Fetching Applicant):", err);
                    return reject(err);
                }
                resolve(results);
            });
        });

        if (!results.length) {
            console.warn(`Applicant with ID ${applicantId} not found.`);
            return res.status(404).json({ error: "Applicant not found" });
        }

        const applicant = results[0];

        const newUserId = await generateUserId();
        if (!newUserId) {
            console.error("Failed to generate user ID.");
            return res.status(500).json({ error: "Failed to generate user ID" });
        }

        // Insert into user table
        await new Promise((resolve, reject) => {
            const query = `INSERT INTO user (userid, username, password, usertype, jointimestamp) VALUES (?, ?, ?, 'alumni', ?)`;
            db.query(query, [newUserId, applicant.username, applicant.password, jointimestamp], (err) => {
                if (err) {
                    console.error("Database Error (Inserting User):", err);
                    return reject(err);
                }
                resolve();
            });
        });

        // Insert into alumni table
        await new Promise((resolve, reject) => {
            const query = `INSERT INTO alumni (userid, email, firstname, middlename, lastname, batch, school, course, empstatus, location, company, displaypic, private) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`;
            db.query(query, [
                newUserId,
                applicant.email,
                applicant.firstname,
                applicant.middlename,
                applicant.lastname,
                applicant.batch,
                applicant.school,
                applicant.course,
                applicant.empstatus,
                applicant.location,
                applicant.company,
                applicant.displaypic
            ], (err) => {
                if (err) {
                    console.error("Database Error (Inserting Alumni):", err);
                    return reject(err);
                }
                resolve();
            });
        });

        // Delete the applicant record after successful insertion
        await new Promise((resolve, reject) => {
            const query = "DELETE FROM applicant WHERE applicantid = ?";
            db.query(query, [applicantId], (err) => {
                if (err) {
                    console.error("Database Error (Deleting Applicant):", err);
                    return reject(err);
                }
                resolve();
            });
        });

        res.json({ message: "Applicant accepted successfully", userid: newUserId });
    } catch (error) {
        console.error("Error accepting applicant:", error);
        res.status(500).json({ error: "Failed to accept applicant", details: error.message });
    }
});

router.post("/addManager", async (req, res) => {
    const { username, password } = req.body;
    const jointimestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const newUserId = await generateUserId();
        const insertQuery = `INSERT INTO user (userid, username, password, usertype, jointimestamp) VALUES (?, ?, ?, 'Manager', ?)`;

        db.query(insertQuery, [newUserId, username, password, jointimestamp], (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({ error: "Error adding manager" });
            }
            res.json({ userid: newUserId, username, password, jointimestamp });
        });
    } catch (error) {
        console.error("Error generating user ID:", error);
        res.status(500).json({ error: "Error generating user ID" });
    }
});



router.delete("/decline/:applicantid", (req, res) => {
    const { applicantid } = req.params; 
    console.log("Received applicantId:", applicantid);

    if (!applicantid) {  
        return res.status(400).json({ error: "Applicant ID is required" });
    }

    const query = "DELETE FROM applicant WHERE applicantid = ?";
    
    db.query(query, [applicantid], (err, result) => { 
        if (err) {
            console.error("Database Error:", err.sqlMessage || err);
            return res.status(500).json({ error: "Database query failed", details: err.sqlMessage || err });
        }

        res.json({ message: "Applicant declined and removed" });
    });
});



module.exports = router;
