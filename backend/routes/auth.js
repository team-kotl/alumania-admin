const router = require("express").Router();
const db = require("../db").db;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_TOKEN = process.env.JWT_TOKEN;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(`[LOGIN REQUEST] Username: ${username}, IP: ${req.ip}`);

    db.query(
        `SELECT username, usertype FROM user WHERE username = ? AND password = ?`,
        [username, password],
        (err, results) => {
            if (err) {
                console.log(
                    `[ERROR] Login request from ${req.ip} to ${username} failed.`
                );
                return res.status(500).json({ error: "Internal Server Error" });
            }
            if (results.length < 1) {
                res.status(403).json({ error: "Invalid Credentials" });
            } else {
                const token = jwt.sign(
                    { user: results[0].username },
                    JWT_TOKEN,
                    { expiresIn: JWT_EXPIRATION }
                );
                res.status(200).json({ 
                    username: results[0].username,
                    usertype: results[0].usertype,
                    token: token
                });
            }
        }
    );
});

// Token refresh endpoint
router.post("/refresh-token", (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, JWT_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }

        const newToken = jwt.sign({ user: decoded.user }, JWT_TOKEN, {
            expiresIn: JWT_EXPIRATION,
        });
        res.status(200).json({ token: newToken });
    });
});

// Validate JSON web token of user
router.get("/protected", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    jwt.verify(token, JWT_TOKEN, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Invalid token" });
        res.json({ message: `goods` });
    });
});

module.exports = router;
