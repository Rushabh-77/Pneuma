const express = require('express');
const { addCreditCardController, getCreditCardsController, updateCreditCardController, deleteCreditCardsController, deleteCreditCardController } = require('../contollers/creditCardContoller');
const router = express.Router();

router.get('/getAll', getCreditCardsController);
router.post('/add', addCreditCardController);
router.put('/update/:id', updateCreditCardController);
router.delete('/delete/:id', deleteCreditCardController);

module.exports = router;
