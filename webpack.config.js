var webpack = require("webpack");
var path = require("path");
 
var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");
 
var config = {
  entry: {
	  components: DEV + "/index.jsx",
	  smd: DEV + "/smd.jsx"
  },
  output: {
    path: OUTPUT,
    filename: "[name]-bundle.js"
  },
	devtool: 'source-map',
  module: {
    loaders: [{
        include: DEV,
		exclude: "/node_modules/",
        loader: "babel-loader",
    }]
  },
	watch: true
};
 
module.exports = config;
