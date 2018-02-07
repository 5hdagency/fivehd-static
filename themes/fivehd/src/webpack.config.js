const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV != "production"
});

module.exports = {
  entry: {
    app: './js/main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
            // plugins: [require('babel-plugin-transform-object-rest-spread')]
          }
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
            use: [{
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }],
            // use style-loader in development
            fallback: "style-loader"
        })
      }
    ]
  },

  output: {
    path: path.join(__dirname, "./../static/dist"),
    filename: '[name].bundle.js',
  },

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
	},

  plugins: [
    extractSass,
    new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
  ],
  watchOptions: {
    watch: true
  }
};
