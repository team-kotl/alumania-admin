const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const authRouter = require("./routes/auth");
const eventRouter = require("./routes/event");
const jobRouter = require("./routes/job");
const locationRouter = require("./routes/location.js");

app.use("/auth", authRouter);
app.use("/event", eventRouter);
app.use("/job", jobRouter);
app.use("/location", locationRouter);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
