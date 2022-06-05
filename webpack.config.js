const path = require('path');
const hwp = require('html-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
    mode: 'development',
    entry: './frontend/src/index.tsx',
    devtool: 'inline-source-map',
    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'frontend', 'public'),
        publicPath: '/public',
      }
    }
    ,
  output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new hwp({
            template: './frontend/public/index.html',
            publicPath: '/',
        }),
    ],
    resolve: {
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
                    getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
                }
            },
            {
              test: /\.(jpe?g|gif|png|svg)$/i,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 10000
                  }
                }
              ]
            },
            {
              test: /\.(woff|woff2|ttf|eot)$/,
              loader: 'file-loader'
            }
        ]
    }
}
