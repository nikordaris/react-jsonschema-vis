import { getComparator, isRequired, getDefaultComponent } from './utils';

describe('Utils Tests', () => {
  describe('#getComparator', () => {
    it('should sort by ordinal', () => {
      const data = {
        x: {
          title: '1',
          meta: {
            vis: {
              ordinal: 2
            }
          }
        },
        b: {
          title: '3',
          meta: {
            vis: {
              ordinal: 1
            }
          }
        },
        a: {
          title: '1',
          meta: {
            vis: {
              ordinal: 3
            }
          }
        }
      };

      const result = Object.keys(data).sort(getComparator(data, 'meta.vis'));
      expect(result).toEqual(['b', 'x', 'a']);
    });

    it('should sort by label', () => {
      const data = {
        x: {
          title: '2',
        },
        b: {
          title: '1',
        },
        a: {
          title: '3',
        }
      };

      const result = Object.keys(data).sort(getComparator(data, 'meta.vis'));
      expect(result).toEqual(['b', 'x', 'a']);
    });

    it('should sort by prop name', () => {
      const data = {
        x: {
          foo: 'bar',
        },
        b: {
          foo: 'bar2',
        },
        a: {
          foo: 'bar3'
        }
      };

      const result = Object.keys(data).sort(getComparator(data, 'meta.vis'));
      expect(result).toEqual(['a', 'b', 'x']);
    });
  });

  describe('#isRequired', () => {
    it('should have required field', () => {
      const schema = {
        required: ['foo']
      };

      const result = isRequired(schema, 'foo');
      expect(result).toBeTruthy();
    });

    it('should not have required field', () => {
      const schema = {
        required: ['foo']
      };

      const result = isRequired(schema, 'bar');
      expect(result).toBeFalsy();
    });
  });

  describe('#getDefaultComponent', () => {
    it('should call function from default component array', () => {
      const defaultComponents = [
        (schema) => schema.type === 'foo' && 'bar',
        (schema) => schema.type === 'foo1' && 'bar1'
      ];
      expect(getDefaultComponent(defaultComponents, { type: 'foo1' })).toEqual('bar1');
    });

    it('should get default component from object array', () => {
      const defaultComponents = [
        { type: 'foo', component: 'bar' },
        { type: 'foo1', component: 'bar1' }
      ];
      expect(getDefaultComponent(defaultComponents, { type: 'foo' })).toEqual('bar');
    });

    it('should not get default component from array', () => {
      const defaultComponents = [
        { type: 'foo', component: 'bar' },
        (schema) => schema.type === 'foo1' && 'bar1'
      ];
      expect(getDefaultComponent(defaultComponents, { type: 'foo2' })).toBeFalsy();
    });

    it('should handle missing schema', () => {
      const defaultComponents = [
        { type: 'foo', component: 'bar' },
        { type: 'foo1' }
      ];
      expect(getDefaultComponent(defaultComponents, undefined)).toBeFalsy();
    })

    it('should get default component from object', () => {
      const defaultComponents = {
        foo: 'bar',
        foo1: 'bar1'
      };
      expect(getDefaultComponent(defaultComponents, { type: 'foo1' })).toEqual('bar1');
    });

    it('should handle undefined default component object', () => {
      expect(getDefaultComponent(undefined, { type: 'foo' })).toBeFalsy();
    });
  })
});