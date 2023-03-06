// require("dotenv").config();
const Sequelize = require("sequelize");

const conn = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
});

module.exports = conn;
