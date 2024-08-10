const express = require('express');
const { creditCardController } = require('../contollers/creditCardContoller');
const router = express.Router();

router.post('/add', creditCardController);


module.exports = router;
