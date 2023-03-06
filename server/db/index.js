const conn = require("./conn");
const Test = require("./Test");

conn.sync();

module.exports = {
  conn,
  Test,
};
