const debug = process.env.NODE_ENV !== 'production';
const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-source-map' : false,
  entry: {
    mian: './scripts/main.js',
    vendor: ['react', 'react-dom'],
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }],
      }),
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        },
      }, {
        loader: 'eslint-loader',
      }],
    }],
  },
  output: {
    filename: 'js/[name].[chunkhash].min.js',
    path: path.join(__dirname, 'dist'),
    publicPath: debug ? '/' : '/LudumDare-39/',
  },
  plugins: [
    // globals
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new ExtractTextPlugin({
      filename: 'css/main.[contenthash].css',
    }),
  ].concat(debug ? [
    // development only
  ] : [
    // production only
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]),
};
