/* eslint-env node */
const path = require('path');
const glob = require('glob');

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
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' }
    ]
  }
};
