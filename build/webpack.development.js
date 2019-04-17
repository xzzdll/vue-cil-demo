const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "src"),
    hot: true,
    // publicPath: "/",
    historyApiFallback: true,
    proxy: {
      '/api': {
        // target: 'http://localhost:8086/api',//本地后端
        target: 'http://10.9.21.106:8086/api',//一期开发后端
        // target: "http://10.9.21.129:8086/api", //二期开发后端

        // target: 'http://10.10.164.139:8086/api', //ip

        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/V1': {
        target: 'http://10.9.21.114:8890',
        changeOrigin: true
      },
      '/bpi': {
        target: 'http://10.9.21.107:8083',
        changeOrigin: true
      },
      '/cpi': {
        target: 'http://10.9.21.131:8098',
        changeOrigin: true
      },
      '/file': {
        target: 'http://10.10.129.194:8082/file',
        changeOrigin: true,
        pathRewrite: {
          '^/file': ''
        }
      }
    }
  }
});