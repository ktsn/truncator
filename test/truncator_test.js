import assert from 'power-assert';

import {truncate} from '../src/truncator';

describe('truncate methods', () => {
  let el, expected;

  const input = 'Grumpy wizards make toxic brew for the evil Queen and Jack';

  beforeEach(() => {
    el = document.createElement('p');
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.removeChild(el);
  });

  describe('Truncate by count', () => {
    it('truncates text by character count', () => {
      expected = 'Grumpy wiz...';
      truncate(el, input, { count: 10 });

      assert.strictEqual(el.innerHTML, expected);
    });

    it('should not truncate if given count equals given text length', () => {
      expected = input;
      truncate(el, input, { count: 59 });

      assert.strictEqual(el.innerHTML, expected);
    });

    it('should not truncate if given count exceeds given text length', () => {
      expected = input;
      truncate(el, input, { count: 70 });

      assert.strictEqual(el.innerHTML, expected);
    });
  });

  describe('Truncate by height', () => {
    let style;

    beforeEach(() => {
      el.style.lineHeight = '15px';
      el.style.width = '50px';

      style = window.getComputedStyle(el);
    });

    it('truncates text until the element height is less than given height', () => {
      truncate(el, input, { height: 30 });

      assert(parseFloat(style.height) === 30); // 15px x 2lines
    });

    it('should truncate if given height can contain whole text', () => {
      expected = input;
      truncate(el, input, { height: 1000 });

      assert(el.innerHTML === expected);
    });

    it('should truncate even if the element height is fixed', () => {
      truncate(el, input, { height: 30 });
      expected = el.innerHTML;

      el.style.height = '1000px';
      truncate(el, input, { height: 30 });

      assert(el.innerHTML === expected);
      assert(el.style.height === '1000px');
    });

    it('should truncate even if max-height is set', () => {
      truncate(el, input, { height: 30 });
      expected = el.innerHTML;

      el.style.maxHeight = '10px';
      truncate(el, input, { height: 30 });

      assert(el.innerHTML === expected);
      assert(el.style.maxHeight === '10px');
    });

    it('should truncate even if min-height is set', () => {
      truncate(el, input, { height: 30 });
      expected = el.innerHTML;

      el.style.minHeight = '1000px';
      truncate(el, input, { height: 30 });

      assert(el.innerHTML === expected);
      assert(el.style.minHeight === '1000px');
    });
  });

  describe('Truncate options', () => {
    it('accept an ellipsis option for trailing characters', () => {
      expected = 'Grumpy wiz???';
      truncate(el, input, { count: 10, ellipsis: '???' });

      assert(el.innerHTML === expected);
    });

    it('add no ellipsis symbol if null is given', () => {
      expected = 'Grumpy wiz';
      truncate(el, input, { count: 10, ellipsis: null });

      assert(el.innerHTML === expected);
    });

    it('add default ellipsis symbol if undefined is given', () => {
      expected = 'Grumpy wiz...';
      truncate(el, input, { count: 10, ellipsis: undefined });

      assert(el.innerHTML === expected);
    });
  });
});
