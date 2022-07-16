const path = require('path');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const webpack = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

const preprocessorOptions = {
  DEBUG: isDevelopment,
};

const styledComponentsTransformer = createStyledComponentsTransformer({
  ssr: true,
});

module.exports = {
  mode: process.env.NODE_ENV,
  entry: [
    isDevelopment && '@gatsbyjs/webpack-hot-middleware/client?path=/__webpack_hmr',
    './frontend/src/index.tsx'
  ].filter(Boolean),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '..', '..', 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'public/[name][ext]',
  },
  resolve: {
    plugins: [new tsconfigPathsPlugin()],
    modules: ['src', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshPlugin({
      overlay: {
        sockIntegration: 'whm',
      },
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            // react refresh not works with ts-loader, so I have to pass ts-loader's result into babel
            loader: 'babel-loader',
            options: {
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({before: [styledComponentsTransformer]})
            },
          },
          {
            loader: "ifdef-loader",
            options: preprocessorOptions,
          },
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        type: 'asset/resource',
        generator: {
          publicPath: '/'
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
          publicPath: '/'
        }
      }
    ],
  }
};
