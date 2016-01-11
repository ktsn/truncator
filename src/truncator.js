export function truncateByLine(el, text, line) {
  truncateByHeight(el, text, el.lineHeight * line);
}

export function truncateByHeight(el, text, height) {
  el.text = text;

  if (el.height <= height) {
    return;
  }

  truncateImpl(el, text, height, 0, text.length);
}

export function truncateByCount(el, text, count) {
  if (text.length <= count) {
    el.text = text;
    return;
  }

  el.text = text.substring(0, count) + '...';
}

function truncateImpl(el, text, maxHeight, left, right) {
  const center = Math.floor((left + right) / 2);
  const truncated = text.substring(0, center) + '...';
  el.text = truncated;

  if (left + 1 >= right) {
    return;
  }

  const height = el.height;

  if (height > maxHeight) {
    truncateImpl(el, text, maxHeight, left, center);
  } else {
    // left index should always be included in search space
    // because it might be boundary point of truncation
    truncateImpl(el, text, maxHeight, center, right);
  }
}
