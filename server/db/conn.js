// require("dotenv").config();
const Sequelize = require("sequelize");

const conn = new Sequelize(
  "mysql://root:147qwe147@localhost:3306/lp_take_home",
  {
    dialect: "mysql",
  }
);

module.exports = conn;
