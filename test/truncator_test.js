import * as truncator from '../src/truncator';
import dom from '../src/utils/dom';

describe('truncate methods', () => {
  let d, input, expected;

  input = 'Grumpy wizards make toxic brew for the evil Queen and Jack';

  beforeEach(() => {
    d = dom(document.createElement('p'));
    document.body.appendChild(d.el);
  });

  afterEach(() => {
    document.body.removeChild(d.el);
  });

  describe('truncateByCount', () => {
    it('truncates text by character count', () => {
      expected = 'Grumpy wiz...';
      truncator.truncateByCount(d, input, 10);

      assert.strictEqual(d.el.innerHTML, expected);
    });

    it('should not truncate if given count equals given text length', () => {
      expected = input;
      truncator.truncateByCount(d, input, 59);

      assert.strictEqual(d.el.innerHTML, expected);
    });

    it('should not truncate if given count exceeds given text length', () => {
      expected = input;
      truncator.truncateByCount(d, input, 70);

      assert.strictEqual(d.el.innerHTML, expected);
    });
  });
});
