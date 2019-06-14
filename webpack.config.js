const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(png|jpe?g|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
        {
        test: /\.html$/,
        use: [
            {
            loader: "html-loader",
            options: { minimize: true }
            }
        ]
        },
        {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
        }, 
      ]
    },

    plugins: [
    new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ]
  };