const { Sequelize } = require("sequelize");

const databaseConfig = {
  username: "UMC",
  password: "ttyl504",
  database: "UMC",
  host: "localhost",
  dialect: "postgres",
};

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect,
    logging: false,
  }
);

module.exports = sequelize;
