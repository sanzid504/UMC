const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    level: DataTypes.STRING,
    status: DataTypes.STRING,
  // Add any additional fields as required
});

module.exports = User;
