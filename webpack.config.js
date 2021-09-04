const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? 'none' : 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/dist/style/',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(svg|jpeg|jpg|png|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]?[hash]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'src/index.html', //Name of template in ./src
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    /*
    new CopyWebpackPlugin([{
      from: './favicon.ico',
      to: './favicon.ico'
    }]),*/
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: { minimize: true },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.tsx', '.ts', '.css', '.scss'],
  },
};