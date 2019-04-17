const merge = require('webpack-merge');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  // plugins: [
  //   new config.optimization.minimize({
  //     compress: {
  //         warnings: false
  //     }
  // })
  // ],
  optimization: {
    minimize: true,
  },
});