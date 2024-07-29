const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	target: "web",
	devtool: "inline-source-map",
	devServer: {
		static: "./dist",
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Space Shooter",
		}),
	],
	output: {
		filename: "[name].bundle.js",
		chunkFilename: "chunk-[chunkhash].js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
		publicPath: "/spaceshooter/",
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
	optimization: {
		runtimeChunk: "single",
	},
}
