/* eslint-env node */
'use strict';

const conf = require('./webpack.config');

conf.watch = true;
conf.debug = true;
conf.devtool = 'source-map';

module.exports = conf;
