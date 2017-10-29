import path from 'path'
import webpack from 'webpack'

export default {
	devtools: 'eval-source-map',
	entry: [
		'webpack-hot-middleware/client', 
		path.join(__dirname, '/client/index.js')
	],
	output: {
		path: '/',
		publicPath: '/'
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, 'client'),
				loaders: ['react-hot', 'babel']
			},
            { test: /\.json$/, loader: "json-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file' }
		]
	},
	resolve: {
		extentions: ['', '.js']
	}
}