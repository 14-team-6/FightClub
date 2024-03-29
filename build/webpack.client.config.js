const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const webpack = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

const styledComponentsTransformer = createStyledComponentsTransformer({
  ssr: true,
});

module.exports = {
  mode: process.env.NODE_ENV,
  entry: [
    isDevelopment && '@gatsbyjs/webpack-hot-middleware/client?path=/__webpack_hmr',
    './frontend/src/index.tsx',
  ].filter(Boolean),
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'public/[name][ext]',
  },
  watchOptions: {
    poll: 2000,
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
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
    new CopyPlugin({
      patterns: [
        {
          from: './frontend/public/img/*',
          to: 'public/img/[name][ext]',
        },
      ],
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
              getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        type: 'asset/resource',
        generator: {
          publicPath: '/',
          filename: 'public/img/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/i,
        type: 'asset/resource',
        generator: {
          publicPath: '/',
          filename: 'public/font/[name][ext]',
        },
      },
    ],
  },
};
