const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const authRouter = require("./routes/auth");
const dashboardRouter = require("./routes/dashboard");
const fieldsRouter = require("./routes/fields")

app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);
app.use("/fields", fieldsRouter);


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
