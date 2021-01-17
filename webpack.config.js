const { resolve } = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appRoot = resolve(__dirname, './src/app');
const outputPath = resolve(__dirname, './dist');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	entry: resolve(appRoot, 'app.ts'),
	output: {
		path: outputPath
	},
	resolve: {
		extensions: [ '.ts', '.js', '.json' ],
		modules: [ resolve(__dirname, 'node_modules') ]
	},
	module: {
		rules: [
			{
				test: /\.vue$/i,
				use: 'vue-loader'
			},
			{
				test: /\.ts$/i,
				loader: 'ts-loader',
				options: {
					transpileOnly: true
				}
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			title: 'ABN AMRO challenge',
			template: resolve(appRoot, 'index.html')
		})
	],
	devServer: {
		inline: true,
		hot: true,
		stats: 'minimal',
		contentBase: resolve(__dirname, 'dist')
	}
};
