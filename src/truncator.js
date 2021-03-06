import { extend } from './utils/object'
import dom from './utils/dom'

const DEFAULT_OPTIONS = {
  ellipsis: '...'
}

export class Truncator {
  constructor (el, text, boundary, options, truncate) {
    this.el = el
    this.text = text
    this.boundary = boundary
    this.options = options
    this.truncate = truncate

    this.recalc()
  }

  recalc () {
    execWithUnfixHeight(this.el.el, () => {
      this.truncate(this.el, this.text, this.boundary, this.options)
    })
  }

  restoreText () {
    this.el.text = this.text
  }
}

export function truncate(el, text, options) {
  if (options === null || typeof options !== 'object') {
    throw new Error('options must be an object')
  }

  const domEl = dom(el)
  const opts = normalizeOptions(options)

  if (typeof opts.height === 'number') {
    return new Truncator(domEl, text, opts.height, opts, truncateByHeight)
  }

  if (typeof opts.line === 'number') {
    return new Truncator(domEl, text, Math.floor(opts.line), opts, truncateByLine)
  }

  if (typeof opts.count === 'number') {
    return new Truncator(domEl, text, Math.floor(opts.count), opts, truncateByCount)
  }

  throw new Error('options must have height, line or count as number')
}

function normalizeOptions(options) {
  const opts = extend({}, DEFAULT_OPTIONS, options)

  if (opts.ellipsis === null) opts.ellipsis = ''

  return opts
}

// set the element height to auto
// and unlock constraints of min-, max-height during given function is executed
function execWithUnfixHeight(el, fn) {
  const { height, maxHeight, minHeight } = el.style

  try {
    el.style.height = 'auto'
    el.style.maxHeight = 'none'
    el.style.minHeight = '0'

    fn()

  } finally {
    // ensure the styles are restored
    el.style.height = height
    el.style.maxHeight = maxHeight
    el.style.minHeight = minHeight
  }
}

function truncateByLine(el, text, line, options) {
  truncateByHeight(el, text, el.lineHeight * line, options)
}

function truncateByHeight(el, text, height, options) {
  el.text = text

  if (el.height <= height) {
    return
  }

  truncateImpl(el, text, height, options, 0, text.length)
}

function truncateByCount(el, text, count, options) {
  if (text.length <= count) {
    el.text = text
    return
  }

  el.text = text.substring(0, count) + options.ellipsis
}

function truncateImpl(el, text, maxHeight, options, left, right) {
  const center = Math.floor((left + right) / 2)
  const truncated = text.substring(0, center) + options.ellipsis
  el.text = truncated

  if (left >= right - 1) {
    return
  }

  const height = el.height

  if (height > maxHeight) {
    truncateImpl(el, text, maxHeight, options, left, center)
  } else {
    // left index should always be included in search space
    // because it might be boundary point of truncation
    truncateImpl(el, text, maxHeight, options, center, right)
  }
}
