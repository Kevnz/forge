const path = require('path')
const features = require('creature-features')()
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const featureFlags = new webpack.DefinePlugin({
  FEATURES: features,
})
const cssLoader = 'css-loader'
module.exports = {
  entry: './src/ui/index.js',
  plugins: [featureFlags],
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.md$/,
        use: ['frontmatter-markdown-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', cssLoader],
      },
      {
        test: /\.module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: cssLoader,
            options: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: cssLoader,
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // options...
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.mjs', '.js', '.jsx', '.scss'],
    modules: ['node_modules', 'src'],
    alias: {},
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
}
