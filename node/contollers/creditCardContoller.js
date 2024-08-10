const creditCardController = async (req, res) => {
    try {
        const { bankName, creditCardName, enabled } = req.body;

        if (!bankName || !creditCardName) {
            return res.status(400).json({ message: 'Bank Name and Credit Card Name are required' });
        }

        const newCard = await CreditCard.create({
            bankName,
            creditCardName,
            enabled: enabled !== undefined ? enabled : true,
        });

        res.status(201).json(newCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { creditCardController }