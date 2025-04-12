require("dotenv").config();
const mongoose = require('mongoose');
const connection = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    console.log("Databse Connected Successfully");

}).catch((err) => {
    console.log("Databse Connection Failed : " + err);
})

module.exports = connection;