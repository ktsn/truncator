import dom from '../../src/utils/dom';

describe('DOM helper', () => {
  let d;

  beforeEach(() => {
    d = dom(document.createElement('p'));
    document.body.appendChild(d.el);
  });

  afterEach(() => {
    if (document.body.lastChild === d.el) {
      document.body.removeChild(d.el);
    }
  });

  describe('Get height', () => {
    beforeEach(() => {
      d.el.style.height = '100px';
    });

    it('returns content height except padding, margin and border', () => {
      const el = d.el;
      el.style.padding = '1px 2px 4px 8px';
      el.style.margin = '16px 32px 64px 128px';
      el.style.border = '1px solid #000';

      assert.strictEqual(d.height, 100);
    });
  });

  describe('Get line height', () => {
    beforeEach(() => {
      d.el.style.lineHeight = '24px';
    });

    it('returns actual line height except padding, margin and border', () => {
      const el = d.el;
      el.style.padding = '1px 2px 4px 8px';
      el.style.margin = '16px 32px 64px 128px';
      el.style.border = '1px solid #000';

      assert.strictEqual(d.lineHeight, 24);
    });
  });
});
