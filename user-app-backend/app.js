const express = require('express');
require('dotenv').config()
const routes = require('./routes');
const app = express();
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Db Connection
const sequelize = require("./config/db")

sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Tables synced");
  })
  .catch((err) => {
    console.log(err);
  });
// End Of DB Connection

const errorMiddleware = require(
  "./middleware/errorMiddleware"
);

// apis
app.use('/api', routes);
app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to User Managment"
  });
});

// server creation
const PORT = process.env.PORT || 5000;

let server = app.listen(PORT, () => {
    let host = server.address().address
    let port = server.address().port
    console.log(`Server running at http://${host}:${port}/`);
})