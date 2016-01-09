/* eslint-env node */
'use strict';

module.exports = {
  context: __dirname + '/src',
  entry: './index.js',
  output: {
    path: __dirname + '/.tmp',
    filename: 'truncator.js',
    libraryTarget: 'umd'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  }
};
