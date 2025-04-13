const express = require("express");
const app = express.Router();
const urlController = require('../controllers/urlController');

app.post('/', urlController.createUrl);
app.patch('/delete',  urlController.deleteTask);




module.exports = app;