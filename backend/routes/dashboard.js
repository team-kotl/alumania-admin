const router = require("express").Router();
const db = require("../db").db;

// Fetch Stats
router.get("/row-1", (req, res) => {
    const query = `
        SELECT 
            (SELECT COUNT(*) FROM user WHERE usertype = 'Alumni' ) AS alumni,
            (SELECT COUNT(*) FROM user WHERE usertype = 'Manager' ) AS managers,
            (SELECT COUNT(*) FROM event) AS events,
            (SELECT COUNT(*) FROM jobpost) AS jobs;
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
router.get("/row-2", (req, res) => {
    const employmentQuery = `
     SELECT 
            SUM(CASE WHEN empstatus = 'Employed' THEN 1 ELSE 0 END) AS employed,
            SUM(CASE WHEN empstatus = 'Unemployed' THEN 1 ELSE 0 END) AS unemployed,
            SUM(CASE WHEN empstatus = 'Underemployed' THEN 1 ELSE 0 END) AS underemployed
        FROM alumni;
    `;

    const locationQuery = `
        SELECT 
            SUM(CASE WHEN location = 'Domestic' THEN 1 ELSE 0 END) AS domestic,
            SUM(CASE WHEN location = 'Foreign' THEN 1 ELSE 0 END) AS 'foreign'
        FROM alumni;
    `;

    const interestQuery = `
        SELECT 
            e.title, 
            NULL AS companyname, 
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
            j.location, 
            COUNT(ij.userid) AS interested_count,
            'Job' AS type
        FROM jobpost j
        JOIN interestedinjobpost ij ON j.jobpid = ij.jobpid
        GROUP BY j.jobpid

        ORDER BY interested_count DESC
        LIMIT 4;
    `;

    db.query(employmentQuery, (err, employmentData) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        }

        db.query(locationQuery, (err, locationData) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Database error" });
            }

            db.query(interestQuery, (err, interestData) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Database error" });
                }

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
router.get("/row-3", (req, res) => {
    const managersQuery = `SELECT username, jointimestamp FROM user ORDER BY jointimestamp DESC LIMIT 2;`;
    const alumniQuery = `SELECT u.username, a.location, u.jointimestamp 
                        FROM user u
                        JOIN alumni a ON u.userid = a.userid
                        ORDER BY u.jointimestamp DESC 
                        LIMIT 2;
    `;

    db.query(managersQuery, (err, managersData) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        }

        db.query(alumniQuery, (err, alumniData) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Database error" });
            }

            res.json({ managers: managersData, alumni: alumniData });
        });
    });
});


module.exports = router;