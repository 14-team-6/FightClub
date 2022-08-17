const path = require('path');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer({
  ssr: true,
});

module.exports = {
  target: 'node',
  devtool: 'inline-source-map',
  entry: './frontend/src/app/app.tsx',
  mode: process.env.NODE_ENV,
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'clientSSRBundle.js',
    libraryTarget: 'commonjs2',
    assetModuleFilename: 'public/[name][ext]',
  },
  watchOptions: {
    poll: 2000,
  },
  resolve: {
    modules: ['src', 'node-modules'],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [
      new tsconfigPathsPlugin(),
    ]
  },
  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({before: [
                  styledComponentsTransformer,
                ]})
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
  }
};
