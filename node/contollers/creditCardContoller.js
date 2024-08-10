const CreditCard = require("../models/creditCard");
const { Op } = require('sequelize'); 

const getCreditCardsController = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;

        const offset = (page - 1) * limit;

        const getAllResp = await CreditCard.findAndCountAll({
            where: {
                [Op.or]: [
                    { bankName: { [Op.like]: `%${search}%` } },
                    { creditCardName: { [Op.like]: `%${search}%` } }
                ]
            },
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            status: 200,
            data: getAllResp.rows,
            totalRecords: getAllResp.count,
            totalPages: Math.ceil(getAllResp.count / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.error('Error fetching credit cards:', error.message || error);
        return res.status(500).json({ message: 'Server error, unable to retrieve credit cards' });
    }
};


const addCreditCardController = async (req, res) => {
    try {
        console.log("reqqqqq", req.body)
        const { bankName, creditCardName, enabled } = req.body;

        if (!bankName || !creditCardName) {
            return res.status(400).json({ message: 'Bank Name and Credit Card Name are required' });
        }

        const newCard = await CreditCard.create({
            bankName,
            creditCardName,
            enabled: enabled !== undefined ? enabled : true,
        });

        res.status(200).json({ message: 'Added successful', data: newCard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const updateCreditCardController = async (req, res) => {
    try {
        const { id } = req.params;
        const { bankName, creditCardName, enabled } = req.body;

        if (!id || !bankName || !creditCardName === undefined || enabled === undefined) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        const [affectedRows] = await CreditCard.update(
            { bankName, creditCardName, enabled },
            { where: { id } }
        );

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Credit card not found' });
        }

        const updatedCard = await CreditCard.findByPk(id);
        res.status(200).json(updatedCard);
    } catch (error) {
        console.error('Error updating credit card:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteCreditCardController = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteResp = await CreditCard.destroy({
            where: { id }
        });

        if (!deleteResp) {
            return res.status(404).json({ status: 404, message: 'Credit card not found' });
        }

        return res.status(200).json({ status: 200, message: 'Credit card deleted successfully', data: deleteResp });
    } catch (error) {
        console.error('Error deleting credit card:', error.message || error);
        return res.status(500).json({ message: 'Server error, unable to delete credit card' });
    }
};



module.exports = { addCreditCardController, getCreditCardsController, updateCreditCardController, deleteCreditCardController }