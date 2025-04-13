const express = require("express");
const app = express.Router();
const taskController = require('../controllers/urlController');
const users = require("./userRouter");
app.use("/user", users);


app.get('/url/:shortId', taskController.urlRedirect);

module.exports = app;