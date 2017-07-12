var webpack = require("webpack");
var path = require("path");
 
var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './client/index.html',
	filename: 'index.html',
	inject: 'body'
})

var config = {
	entry: ['babel-polyfill', DEV + "/smd.jsx"],
	output: {
		filename: "bundle.js",
		path: __dirname,
		publicPath: '/'
	},
	devServer: {
		historyApiFallback: true
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
			include: DEV,
			exclude: "/node_modules/",
			loader: "babel-loader",
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	watch: true,
	plugins: [HtmlWebpackPluginConfig]
};
 
module.exports = config;
