const router = require("express").Router();
const db = require("../db").db;

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(`[LOGIN REQUEST] Username: ${username}, IP: ${req.ip}`);

    db.query(
        `SELECT username FROM user WHERE username = ? AND password = ? AND usertype = ?`,
        [username, password, 'admin'],
        (err, results) => {
            if (err) {
                console.log(
                    `[ERROR] Login request from ${req.ip} to ${username} failed.`
                );
                return res.status(500).json({ error: "Internal Server Error" });
            }
            if (results.length < 1) {
                res.status(401).json({ error: "Invalid Credentials" });
            } else {
                res.status(200).json({ message: "Successful login" });
            }
        }
    );
});

module.exports = router;
