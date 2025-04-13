const express = require("express");
const app = express.Router();
const urls = require("./urlRouter");
app.use("/url", urls);
module.exports = app;