require('dotenv/config');
const { resolve } = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

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
		extensions: [ '.ts', '.js', '.json', '.vue' ],
		modules: [ resolve(__dirname, 'node_modules') ],
		plugins: [ new TsconfigPathsPlugin({ configFile: resolve(__dirname, './tsconfig.json') }) ]
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
			},
			{
				test: /\.css$/i,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			title: 'Coding challenge',
			template: resolve(appRoot, 'index.html'),
			templateParameters: {
				apiUrl: process.env.API_URL
			}
		})
	],
	devServer: {
		inline: true,
		hot: true,
		stats: 'minimal',
		contentBase: resolve(__dirname, 'dist')
	}
};
