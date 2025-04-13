const express = require("express");
const app = express.Router();
const taskController = require('../controllers/urlController');

app.post('/', taskController.createUrl);
app.patch('/delete',  taskController.deleteTask);




module.exports = app;