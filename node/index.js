const config = require("./config/config.js");
const express = require("express");
const sequelize = require("./config/db");
const bankRoutes = require('./routes/bankRoutes.js');
const creditCardRoutes = require('./routes/creditCardRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const cors = require("cors")

const app = express();

// Sync the database
sequelize.sync({ alter: false })
    .then(() => {
        console.log(`MySQL Database Connected Successfully in ${config.NODE_ENV} mode`);
    })
    .catch(error => {
        console.error("Error connecting to MySQL database:", error);
    });


app.use(cors())
app.use(express.json());

// models
require('./models/bank');
require('./models/creditCard');
require('./models/user.js');

//routes
app.use('/api/user', userRoutes);
app.use('/api/bank', bankRoutes);
app.use('/api/creditCard', creditCardRoutes);

const PORT = config.PORT || 5000;

app.listen(PORT, () => {
    console.log(`APP LISTENING ON PORT ${PORT} in ${config.NODE_ENV} mode`);
});
