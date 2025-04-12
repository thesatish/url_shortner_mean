const express = require('express');
const app = express();
const morgan = require('morgan');
const mainRouter = require('./routes/mainRouter');
const publicRouter = require('./routes/publicRouter');
const authenticateToken = require('./middlewares/auth');

require("./configuration/database");
var cors = require('cors');
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('combined'));


app.get('/test-public', (req, res) => {
    res.send({ status: true, message: "Hello Satish From Public Backend API" });
})


app.use(publicRouter);
app.use(authenticateToken);
app.use(mainRouter);

app.get('/test-private', (req, res) => {
    res.send({ status: true, message: "Hello Satish From Protected Backend API" });
})

app.listen(port, () => console.log(`listening on port ${port}!`))