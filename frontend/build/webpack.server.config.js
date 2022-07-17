const path = require('path');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

const preprocessorOptions = {
  DEBUG: isDevelopment,
};

module.exports = {
  target: 'node',
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  entry: './frontend/src/server/server.ts',
  output: {
    path: path.join(__dirname, '..', '..', 'dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: '/frontend/public/',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './frontend/public/sw.js',
          to: path.join(__dirname, '..', '..', 'dist')
        }
      ],
    }),
  ],
  resolve: {
    modules: ['src', 'node-modules'],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [
      new tsconfigPathsPlugin(),
    ]
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
          {
            loader: "ifdef-loader",
            options: preprocessorOptions,
          },
        ],
      },
      {
        test: /\.png|\.ttf|\.svg|\.wav$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'null-loader',
          },
        ],
      },
    ],
  }
};
