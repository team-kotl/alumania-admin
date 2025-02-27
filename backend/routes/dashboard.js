const router = require("express").Router();
const db = require("../db").db;

// Fetch Stats
app.get("/dashboard-counts", (req, res) => {
    const query = `
        SELECT 
            (SELECT COUNT(*) FROM user WHERE usertype = 'Alumni' ) AS Alumni,
            (SELECT COUNT(*) FROM user WHERE usertype = 'Manager' ) AS Managers,
            (SELECT COUNT(*) FROM event) AS Events,
            (SELECT COUNT(*) FROM jobpost) AS "Job Posting";
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        } else {
            res.json(result[0]);
        }
    });
});

// Fetch Employment Status, Location, Interested Alumni
app.get("/dashboard-status-loc-interest", (req, res) => {
    const employmentQuery = `
     SELECT 
            SUM(CASE WHEN empstatus = 'Employed' THEN 1 ELSE 0 END) AS Employed,
            SUM(CASE WHEN empstatus = 'Unemployed' THEN 1 ELSE 0 END) AS Unemployed,
            SUM(CASE WHEN empstatus = 'Underemployed' THEN 1 ELSE 0 END) AS Underemployed
        FROM alumni;
    `;

    const locationQuery = `
        SELECT 
            SUM(CASE WHEN location = 'Domestic' THEN 1 ELSE 0 END) AS Domestic,
            SUM(CASE WHEN location = 'Foreign' THEN 1 ELSE 0 END) AS Foreign
        FROM alumni;
    `;

    const interestQuery = `
        SELECT 
            e.title, 
            NULL AS companyname, 
            e.eventdate AS date, 
            e.eventloc AS location,
            COUNT(ie.userid) AS interested_count,
            'Event' AS type
        FROM event e
        JOIN interestedinevent ie ON e.eventid = ie.eventid
        GROUP BY e.eventid

        UNION ALL

        SELECT 
            j.title, 
            j.companyname, 
            NULL AS date, 
            j.location, 
            COUNT(ij.userid) AS interested_count,
            'Job' AS type
        FROM jobpost j
        JOIN interestedinjobpost ij ON j.jobpid = ij.jobpid
        GROUP BY j.jobpid

        ORDER BY interested_count DESC;
    `;

    db.query(employmentQuery, (err, employmentData) => {
        if (err) return res.status(500).json({ error: "Database error" });

        db.query(locationQuery, (err, locationData) => {
            if (err) return res.status(500).json({ error: "Database error" });

            db.query(interestQuery, (err, interestData) => {
                if (err) return res.status(500).json({ error: "Database error" });

                res.json({
                    employment: employmentData[0],
                    location: locationData[0],
                    interests: interestData
                });
            });
        });
    });
});


// Fetch Recent Managers and Recent Alumni
app.get("dashboard-recent-alumni-manager", (req, res) => {
    const managersQuery = `SELECT username, jointimestamp FROM user ORDER BY jointimestamp DESC LIMIT 3;`;
    const alumniQuery = `SELECT u.username, a.location, u.jointimestamp 
                        FROM user u
                        JOIN alumni a ON u.userid = a.userid
                        ORDER BY u.jointimestamp DESC 
                        LIMIT 3;
    `;

    db.query(managersQuery, (err, managersData) => {
        if (err) return res.status(500).json({ error: "Database error" });

        db.query(alumniQuery, (err, alumniData) => {
            if (err) return res.status(500).json({ error: "Database error" });

            res.json({ managers: managersData, alumni: alumniData });
        });
    });
});


module.exports = router;