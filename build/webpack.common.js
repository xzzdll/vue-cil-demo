const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack');
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      '@': resolve('src')
    }
  },
  optimization: {
    sideEffects: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        styles: {
          name: 'styles',
          test: /(\.scss|\.css)$/,
          chunks: 'all',
          enforce: true,
        }
      }
    }
    // minimize: true,
  },
  performance: {
    hints: false
  },
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    path: resolve('dist'),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        //解析vue后缀文件
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        // 使用babel-loader加载js
        test: /\.js$/,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        loader: "babel-loader"
      },
      {
        //html加载
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        //css加载
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        //图片加载
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: "img/[name].[ext]",
        }
      },
      {
        // 字体加载
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: "font/[name].[ext]",
        }
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `./public/index.html`
    }),
    new VueLoaderPlugin()
    // new config.optimization.splitChunks({
    //   name: 'common' // 指定公共 bundle 的名称。
    // })
  ]
};