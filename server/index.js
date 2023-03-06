require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { Test } = require("./db");
console.log(Test);

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/public", express.static("public"));

app.get("/api/test", async (req, res, next) => {
  try {
    const tests = await Test.findAll();
    res.send(tests);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/test/count", async (req, res, next) => {
  try {
    const length = await Test.count();
    res.send({ length: length });
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/test/:testId", async (req, res, next) => {
  try {
    const test = await Test.findByPk(req.params.testId);
    res.send(test);
  } catch (ex) {
    next(ex);
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const setUp = () => {
  app.listen(port, () => console.log(`Listening on port ${port}`));
};

setUp();
