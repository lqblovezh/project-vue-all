const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {
	VueLoaderPlugin
} = require('vue-loader')

const isProd = process.env.NODE_ENV == 'production'

module.exports = {
	plugins: [
		new VueLoaderPlugin(),
	],
	// devtool: 'inline-cheap-module-source-map',
	devtool: 'source-map',
	output: {
		path: path.resolve('./dist'),
		filename: 'static/js/[name].js',
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'projects': path.join(__dirname, 'projects'),
			'services': path.join(__dirname, 'services'),
		},
	},
	module: {
		rules: [
		{
			test: /\.vue/,
			loader: 'vue-loader',
		},
		{
			test: /\.js$/,
			loader: 'babel-loader',
			include: [
        __dirname,
        /node_modules(\/|\\)_?dom7/,
        /node_modules(\/|\\)_?swiper/,
        /node_modules(\/|\\)_?vue-cropper/,
      ],
		},
		{
			test: /\.css$/,
			use: [
				isProd ? {
					loader: MiniCssExtractPlugin.loader,
					options: {
						publicPath: '../../',
					}
				} : 'vue-style-loader',
				'css-loader',
				'postcss-loader',
			]
		},
		{
			test: /\.(styl|stylus)$/,
			use: [
				isProd ? {
					loader: MiniCssExtractPlugin.loader,
					options: {
						publicPath: '../../',
					}
				} : 'vue-style-loader',
				'css-loader',
				{
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          }
        },
				'stylus-loader',
			]
		},
		{
			test: /\.pug$/,
			// loader: 'pug-loader',
			loader: 'pug-plain-loader',
		},
		{
			test: /\.jade$/,
			loader: 'pug-loader',
		},
		{
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'url-loader',
			options: {
				limit: 100000,
				name: 'static/img/[name].[ext]?[hash]', // 配置提取的文件路径
				// name: path.join('./static/img', '[name].[ext]?[hash]'),
			},
		},
		{
			test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 100000,
				name: 'static/media/[name].[ext]?[hash]', // 配置提取的文件路径
			},
		},
		{
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 100000,
				name: 'static/font/[name].[ext]?[hash]', // 配置提取的文件路径
			},
		}, ],
	},
	node: {
		setImmediate: false,
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	},
}
