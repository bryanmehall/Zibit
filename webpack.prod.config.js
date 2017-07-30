var baseConfig = require("./webpack.base.config.js");

baseConfig.devtool = "cheap-module-source-map";
baseConfig.watch = false

module.exports = baseConfig;
