const config = require("./config/config.js");
const express = require("express");
const sequelize = require("./config/db");

const app = express();

// Sync the database
sequelize.sync({ alter: false })
    .then(() => {
        console.log(`MySQL Database Connected Successfully in ${config.NODE_ENV} mode`);
    })
    .catch(error => {
        console.error("Error connecting to MySQL database:", error);
    });

// import the models here
require('./models/bank');
require('./models/creditCard');


const PORT = config.PORT || 5000;

app.listen(PORT, () => {
    console.log(`APP LISTENING ON PORT ${PORT} in ${config.NODE_ENV} mode`);
});
