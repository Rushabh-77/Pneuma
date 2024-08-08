const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CreditCard = sequelize.define('CreditCard', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    bankName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    creditCardName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    timestamps: true,
    tableName: 'credit_cards',
});

module.exports = CreditCard;
