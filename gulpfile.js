var elixir = require('laravel-elixir');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

require('laravel-elixir-vue-2');

elixir.config.assetsPath = './src';
elixir.config.publicPath = './dst';

elixir(mix => {

	Elixir.webpack.mergeConfig({
		
		module: {
			loaders: [
				{ test: /\.css$/, loader: ExtractTextPlugin.extract({
					fallbackLoader: "style-loader",
					loader: "css-loader"
				}) }
			]
		},
		plugins: [
			new ExtractTextPlugin("../css/npm-styles.css")
		]
	});	

	mix.webpack('app.js').sass('app.scss');
});