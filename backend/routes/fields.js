const router = require("express").Router();
const db = require("../db").db;

// Get Schools
router.get("/schools", (req, res) => {
    db.query("SELECT * FROM school", (err, result) => {
        const schools = result.map((school) => school.schoolname);
        if (err) {
            console.error("Error fetching from database:", err);
            return res.status(500).send({ error: "Database error" });
        }
        res.status(200).send({
            schools: schools,
        });
    });
});

// Get Courses
router.get("/courses", (req, res) => {
    db.query("SELECT * FROM course", (err, result) => {
        const courses = result.map((course) => course.coursename);
        if (err) {
            console.error("Error fetching from database:", err);
            return res.status(500).send({ error: "Database error" });
        }
        res.status(200).send({
            courses: courses,
        });
    });
});

router.post("/addschool", (req, res) => {
    const { schoolInput } = req.body;

    db.query(
        "INSERT INTO school(schoolname) VALUES(?)",
        [schoolInput],
        (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Database error" });
            }
            res.status(201).json({ message: "success" });
        }
    );
});

router.post("/addcourse", (req, res) => {
    const { courseInput } = req.body;

    db.query(
        "INSERT INTO course(coursename) VALUES(?)",
        [courseInput],
        (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Database error" });
            }
            res.status(201).json({ message: "success" });
        }
    );
});

router.post("/removeschool", (req, res) => {
    const { schoolToDel } = req.body;

    db.query(
        "DELETE FROM school WHERE schoolname = ?",
        [schoolToDel],
        (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Database error" });
            }
            res.status(201).json({ message: "success" });
        }
    );
});

router.post("/removecourse", (req, res) => {
    const { courseToDel } = req.body;

    db.query(
        "DELETE FROM course WHERE coursename = ?",
        [courseToDel],
        (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Database error" });
            }
            res.status(201).json({ message: "success" });
        }
    );
});


module.exports = router;
