/* eslint-env node */
const path = require('path')
const glob = require('glob')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: glob.sync(path.resolve(__dirname, '../test/**/*.js')),
  output: {
    path: path.resolve(__dirname, '../.tmp'),
    filename: 'test.js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          presets: [
            ['env', { modules: false }]
          ],
          plugins: [
            'babel-plugin-espower'
          ]
        }
      }
    ]
  }
}
