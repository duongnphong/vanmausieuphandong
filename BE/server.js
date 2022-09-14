//dotenv
require("dotenv").config();

// Connect DB
const { connectDB } = require("./configs/db");
connectDB();

const route = require("./routers");

const express = require("express");
const cors = require("cors");

const app = express();

// Cors
app.use(cors());

// Body Parser
app.use(express.json());

//Route
route(app);

const port = process.env.APP_PORT;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
