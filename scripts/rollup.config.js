const babel = require('rollup-plugin-babel');
const meta = require('../package.json');

const banner = `/*!
 * ${meta.name} v${meta.version}
 * ${meta.homepage}
 *
 * @license
 * Copyright (c) 2015-2016 ${meta.author}
 * Released under the MIT license
 * ${meta.homepage}/blob/master/LICENSE
 */`;

const moduleName = 'Truncator';

const plugins = [
  babel({
    exclude: 'node_modules/**'
  })
];

module.exports = {
  entry: 'src/index.js',
  format: 'umd',
  plugins,
  moduleName,
  banner
};
