const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config");

const prodConfig = {
  mode: "production",
};

module.exports = merge(commonConfig, prodConfig);
