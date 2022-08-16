const path = require('path');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const terserPlugin = require('terser-webpack-plugin');

module.exports = {
  target: 'node',
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  entry: './backend/src/utils/index.ts',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'utils.js',
  },
  optimization: {
    minimizer: [
      new terserPlugin({
        terserOptions: {
          keep_classnames: true,
        },
      }),
    ],
  },
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
        ],
      },
    ],
  }
};
