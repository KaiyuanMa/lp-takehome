const conn = require("./conn");
const { Sequelize } = conn;
const { BLOB, DATE, INTEGER } = Sequelize;

const Test = conn.define(
  "test",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "trace_id",
    },
    trace_data: {
      type: BLOB,
    },
    trace_time: {
      type: DATE,
    },
  },
  {
    timestamps: false, // Disable timestamps
  }
);

module.exports = Test;
