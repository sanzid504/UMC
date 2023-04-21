// models/course.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  seats: DataTypes.INTEGER,
  price: DataTypes.INTEGER,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
  form: DataTypes.JSON,    
  // Add any additional fields as required
});

module.exports = Course;
