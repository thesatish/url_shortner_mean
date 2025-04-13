const express = require("express");
const app = express.Router();
const urlController = require('../controllers/urlController');
const users = require("./userRouter");
app.use("/user", users);


app.get('/url/:shortId', urlController.urlRedirect);

module.exports = app;