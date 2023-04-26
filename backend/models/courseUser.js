const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CourseUser = sequelize.define('CourseUser', {
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
    course_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    TRX_ID: DataTypes.STRING,
    form:DataTypes.JSON,
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    }
  // Add any additional fields as required
});

module.exports = CourseUser;
