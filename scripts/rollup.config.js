const babel = require('rollup-plugin-babel')
const meta = require('../package.json')

const banner = `/*!
 * ${meta.name} v${meta.version}
 * ${meta.homepage}
 *
 * @license
 * Copyright (c) 2015-2018 ${meta.author}
 * Released under the MIT license
 * ${meta.homepage}/blob/master/LICENSE
 */`

const name = 'Truncator'

const plugins = [
  babel({
    exclude: 'node_modules/**'
  })
]

module.exports = {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name,
    banner
  },
  plugins
}
