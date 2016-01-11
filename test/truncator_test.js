import assert from 'power-assert';

import {truncate} from '../src/truncator';

describe('truncate methods', () => {
  let el, input, expected;

  input = 'Grumpy wizards make toxic brew for the evil Queen and Jack';

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

  describe('Truncate options', () => {
    it('accept an ellipsis option for trailing characters', () => {
      expected = 'Grumpy wiz???';
      truncate(el, input, { count: 10, ellipsis: '???' });

      assert(el.innerHTML === expected);
    });
  });
});
