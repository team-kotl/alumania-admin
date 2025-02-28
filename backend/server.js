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

app.use("/auth", authRouter);
app.use("/event", eventRouter);
app.use("/job", jobRouter);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
