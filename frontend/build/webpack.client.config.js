const path = require('path');
const hwp = require('html-webpack-plugin');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const styledComponentsTransformer = createStyledComponentsTransformer({
  ssr: true,
});

module.exports = {
  entry: './frontend/src/index.tsx',
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '..', '..', 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    plugins: [new tsconfigPathsPlugin()],
    modules: ['src', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          getCustomTransformers: () => ({before: [styledComponentsTransformer]})
        }
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[hash][ext]',
          publicPath: '/'
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: '[hash][ext]',
          publicPath: '/'
        }
      }
    ],
  }
};
