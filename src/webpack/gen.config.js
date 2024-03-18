require('xtconf')()
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const baseConfig = require('./config')
const prodConfig = {
  entry: './src/ui/gen.js',
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
          NODE_ENV: '"production"',
          API: `"${process.env.API || 'https://forge.kevnz.xyz'}"`,
        },
      },
    }),
  ],
  output: {
    path: path.join(process.cwd(), '/static'),
    publicPath: '/',
    filename: 'index.js',
  },
}

module.exports = merge(baseConfig, prodConfig)
