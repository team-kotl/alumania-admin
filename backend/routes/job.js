const express = require("express");
const router = express.Router();
const db = require("../db").db;

// Function to format datetime correctly for MySQL
const formatDateTimeForMySQL = (date) => {
    return date.toISOString().slice(0, 19).replace("T", " ");
};

// Function to generate a unique job posting ID (jobpid)
const generateJobId = async () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT jobpid FROM jobpost ORDER BY jobpid DESC LIMIT 1";
            db.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            let newId = "JP001"; // Default if no jobs exist
            if (results.length > 0) {
                const lastId = results[0].jobpid;
                const num = parseInt(lastId.substring(2), 10) + 1;
                newId = `JP${num.toString().padStart(3, "0")}`;
            }
            resolve(newId);
        });
    });
};

// Create a job posting
router.post("/", async (req, res) => {
try {
    const {
    title,
    type,
    location,
    description,
    companyname,
    contactname,
    contactemail,
    contactnumber,
    } = req.body;

    if (
    !title ||
    !type ||
    !location ||
    !description ||
    !companyname ||
    !contactname ||
    !contactemail ||
    !contactnumber
    ) {
    return res.status(400).json({ error: "All fields are required" });
    }

    const publishtimestamp = formatDateTimeForMySQL(new Date());
    const userid = "U001"; // Default user ID
    const jobpid = await generateJobId(); // Generate unique job ID

    const insertQuery = `
            INSERT INTO jobpost (jobpid, title, type, location, description, companyname, publishtimestamp, contactname, contactemail, contactnumber, userid)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    db.query(
    insertQuery,
    [
        jobpid,
        title,
        type,
        location,
        description,
        companyname,
        publishtimestamp,
        contactname,
        contactemail,
        contactnumber,
        userid,
    ],
    (err, result) => {
        if (err) {
        console.error("Database Insertion Error:", err.sqlMessage || err);
        return res
            .status(500)
            .json({ error: "Failed to insert job into database" });
        }
        res
        .status(201)
        .json({ message: "Job posted successfully", jobId: jobpid });
    }
    );
} catch (error) {
    console.error("Error processing job creation:", error);
    res.status(500).json({ error: "Internal Server Error" });
}
});

module.exports = router;
