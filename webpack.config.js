"use strict";
/* eslint no-undef: 0 */

import TerserPlugin from 'terser-webpack-plugin';

export default (env) => {
  return {
    mode: env.production ? "production" : "development",

    entry: './src/js/entry.js',
    output: {
      filename: 'bundle.js',
      // path: path.join(__dirname, 'dist/assets/js/'),
    },
    // devtool: env.production ? false : 'source-map',

    optimization: {
      minimize: env.production,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: {
              drop_console: !env.production, //productionではないときにconsole.logを出力
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
        }
      ]
    }
  }
}