// models/payment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
    user_id: DataTypes.STRING,
    course_id: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    trans_id: DataTypes.STRING,
});

module.exports = Payment;
