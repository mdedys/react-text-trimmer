var path = require('path' );
var webpack = require('webpack');
var HtmlWwbpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./demo/index'
	],
	output: {
		path: path.join( __dirname, 'dist' ),
		filename: 'bundle.js',
	},
	plugins: [

		new webpack.HotModuleReplacementPlugin(),

		new HtmlWwbpackPlugin({
				template: 'demo/index.html'
		})
	],
	module: {
		rules: [{
				use: 'babel-loader',
				test: /\.js$/,
				include: [
						path.join(__dirname, 'src'),
						path.join(__dirname, 'demo')
				]
		}]
	},
	devServer: {
			publicPath: 'http://localhost:8080',
			historyApiFallback: true,
			hot: true
	}
};
