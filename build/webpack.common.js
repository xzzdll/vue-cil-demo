const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyPlugin = require('copy-webpack-plugin');
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
    runtimeChunk: {
      name: 'manifest'
    },
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
  },
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: resolve('dist'),
    publicPath: "/"
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        loader: "babel-loader"
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: "img/[name].[ext]",
        }
      },
      {
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
    new HtmlWebpackPlugin({
      template: `./index.html`
    }),
    new VueLoaderPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new CopyPlugin([
      { from: 'public', to: './' },
    ]),
  ]
};