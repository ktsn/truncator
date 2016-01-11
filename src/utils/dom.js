class Dom {
  constructor(el) {
    this.el = el;
    this.style = window.getComputedStyle(el, '');
  }

  set text(val) {
    if ('textContent' in this.el) {
      this.el.textContent = val;
    } else if ('innerText' in this.el) {
      this.el.innerText = val;
    } else {
      throw new Error('The browser does not support text insertion for DOM');
    }
  }

  get height() {
    return parseFloat(this.style.getPropertyValue('height')) || 0;
  }

  get lineHeight() {
    const origHTML = this.el.innerHTML;

    this.el.innerHTML = 'X';
    const height = this.height;
    this.el.innerHTML = origHTML;

    return height;
  }
}

export default function dom(el) {
  return new Dom(el);
}
