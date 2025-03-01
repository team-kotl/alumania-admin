const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const authRouter = require("./routes/auth");
const experienceRouter = require("./routes/experiences");
const jobRouter = require("./routes/jobs");
const eventsRouter = require("./routes/events");

app.use("/auth", authRouter);
app.use("/experiences", experienceRouter)
app.use("/jobs", jobRouter);
app.use("/events", eventsRouter);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
