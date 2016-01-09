import {truncateByHeight, truncateByLine, truncateByCount} from './truncator';
import dom from './utils/dom';

export function truncate(el, text, options) {
  if (typeof options === 'number') {
    return truncateByHeight(el, text, options);
  }

  if (options === null || typeof options !== 'object') {
    throw new Error('options must be number or object');
  }

  const domEl = dom(el);

  if (typeof options.height === 'number') {
    return truncateByHeight(domEl, text, options.height);
  }

  if (typeof options.line === 'number') {
    return truncateByLine(domEl, text, Math.floor(options.line));
  }

  if (typeof options.count === 'number') {
    return truncateByCount(domEl, text, Math.floor(options.count));
  }

  throw new Error('options must have height, line or count as number');
}
