require('xtconf')()
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./config')

const devConfig = {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: '"development"',
          API: `"https://kev-pi.herokuapp.com"`,
        },
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Web App',
      template: './src/ui/index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(process.cwd(), '/src/ui/workers'),
          to: path.join(process.cwd(), '/src/public/workers'),
        },
      ],
    }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './src/public',
    hot: true,
  },
}

module.exports = merge(baseConfig, devConfig)
