"use strict";

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {

  mode: "production",
  // mode: "development",

  entry: './src/js/entry.js',
  output: {
    filename: 'bundle.js',
    // path: path.join(__dirname, 'dist/assets/js/'),
  },
  // devtool: 'source-map',  //source-map出力

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true, //console.logの出力を防ぐ
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|ssr-window)\/).*/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }]],
            },
          },
        ],
      },
      // {
      //   test: /\.css/,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         url: false, // sassで相対パスを書けるようにする
      //         sourceMap: true,
      //         esModule: false,
      //       },
      //     }
      //   ]
      // },
      {
        // node_module内のcss
        test: /node_modules\/(.+)\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: { url: false },
          },
        ],
        sideEffects: true,
      },

      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      // },
    ],
  },

  // devServer: {
  //   contentBase: path.resolve(__dirname, 'dist'),
  //   port: 8080,
  //   open: true,
  // },
  // }
}