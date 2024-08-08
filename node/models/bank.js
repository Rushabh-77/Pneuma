const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Bank = sequelize.define('Bank', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'banks', 
});

module.exports = Bank;
