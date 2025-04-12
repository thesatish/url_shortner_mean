const express = require("express");
const app = express.Router();
const userController = require('../controllers/userController');
const rateLimitter = require('../middlewares/rateLimitter')

app.post('/register', rateLimitter.registerLimitter, userController.userRegister);
app.post('/login', rateLimitter.loginRateLimitter, userController.userLogin);

module.exports = app;