const path = require('path');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const styledComponentsTransformer = createStyledComponentsTransformer({
  ssr: true,
});

module.exports = {
  target: 'node',
  devtool: 'source-map',
  entry: './frontend/src/server/server.ts',
  node: {__dirname: false},
  output: {
    path: path.join(__dirname, '..', '..', 'dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: '/frontend/public/',
  },
  resolve: {
    modules: ['src', 'node-modules'],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [new tsconfigPathsPlugin()]
  },
  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],
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
