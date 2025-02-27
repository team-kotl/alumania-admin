const express = require("express");
const router = express.Router();
const db = require("../db").db;


router.get("/", (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;

    db.query(
        `SELECT e.xpid, e.body, e.publishtimestamp, 
                a.firstname, a.lastname, 
                TO_BASE64(a.displaypic) AS displaypic 
        FROM experience e
        INNER JOIN alumni a ON e.userid = a.userid
        WHERE a.private != 1
        ORDER BY e.publishtimestamp DESC
        LIMIT ? OFFSET ?`,
        [parseInt(limit), parseInt(offset)],
        (err, experiences) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: err.message });
            }

            
            const promises = experiences.map((exp) =>
                new Promise((resolve, reject) => {
                    db.query(
                        `SELECT TO_BASE64(xpimage) AS xpimage 
                        FROM experienceimage WHERE xpid = ?`,
                        [exp.xpid],
                        (err, images) => {
                            if (err) {
                                reject(err);
                            } else {
                                exp.images = images.map(img => img.xpimage);
                                resolve();
                            }
                        }
                    );
                })
            );

            
            Promise.all(promises)
                .then(() => res.status(200).json(experiences))
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ error: "Error fetching images" });
                });
        }
    );
});


router.get("/images/:id", (req, res) => {
    const { id } = req.params;
    db.query(
        `SELECT TO_BASE64(xpimage) AS xpimage FROM experienceimage WHERE xpid = ?`,
        [id],
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        }
    );
});


router.delete("/removexperience/:id", (req, res) => {
    const { id } = req.params;
    db.query(
        "DELETE FROM experiencelike WHERE xpid = ?",
        [id],
        (err) => {
            if (err) {
                console.error("Error executing query: " + err.stack);
                return res.status(400).send("error");
            }
            db.query(
                "DELETE FROM experienceimage WHERE xpid = ?",
                [id],
                (err) => {
                    if (err) {
                        console.error("Error executing query: " + err.stack);
                        return res.status(400).send("error");
                    }
                    db.query(
                        "DELETE FROM experience WHERE xpid = ?",
                        [id],
                        (err, result) => {
                            if (err) {
                                console.error(
                                    "Error executing query: " + err.stack
                                );
                                return res.status(400).send("error");
                            }
                            if (result.affectedRows === 0) {
                                return res.status(404).send("not found");
                            }
                            res.status(200).send("success");
                        }
                    );
                }
            );
        }
    );
});

module.exports = router;
