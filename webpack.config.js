const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/app/index.html',
	fielanem: 'index.html',
	inject: 'body',
});

module.exports = {
	devtool: 'source-map',
	entry: [
		'./app/index.js',
	],
	output: {
		path: __dirname + '/dist',
		filename: 'index_bundle.js',
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{ test: /\.less%/, loader: 'style-loader!css-loader!less-loader' },
		]
	},
	plugins: [HTMLWebpackPluginConfig],
}
