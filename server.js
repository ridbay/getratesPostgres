
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const sequelize = require('./src/models/user').sequelize

//Create an instance of express
const app = express();
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json("Welcome to Getrates User");
});

//Require Users routes
let userRoutes = require("./src/routes/user");
userRoutes(app);


//To re-initialize the databse on every server start up
const eraseDatabaseOnSync = true;
sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
  });
});
