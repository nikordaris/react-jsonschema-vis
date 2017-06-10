import React from 'react';
import renderer from 'react-test-renderer';

import SchemaVis from './index.js';

const schema = {
  title: 'Test',
  type: 'object',
  required: ['foo', 'foobar'],
  properties: {
    foo: {
      title: 'Foo',
      type: 'number',
      meta: {
        vis: {
          editable: true,
          component: 'NumberInputField'
        }
      }
    },
    bar: {
      title: 'Bar',
      type: 'string',
      required: true,
      meta: {
        vis: {
          ordinal: 1,
          editable: true,
          component: 'InputField'
        }
      }
    },
    foobar: {
      title: 'Foobar',
      description: 'Foo is bar',
      type: 'string',
      meta: {
        vis: {
          editable: true,
          component: 'InputField'
        }
      }
    },
    foobar2: {
      title: 'Foobar2',
      description: 'Foo is bar',
      type: 'string',
      meta: {
        vis: {
          ordinal: 3,
          editable: true
        }
      }
    },
    blah: {
      title: 'Blah',
      type: 'string',
      meta: {
        vis: {
          editable: true,
          ordinal: 1
        }
      }
    },
    blah2: {
      title: 'Blah2',
      type: 'string'
    }
  }
};

const components = {
  NumberInputField: <input type="number" />,
  InputField: 'input'
};

describe('Render Schema', () => {
  it('should render', () => {
    const tree = renderer
      .create(<SchemaVis schema={schema} components={components} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without required fields', () => {
    const tree = renderer
      .create(
        <SchemaVis
          schema={{ ...schema, required: undefined }}
          components={components}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render single field schema', () => {
    const tree = renderer
      .create(
        <SchemaVis
          namespace="bar"
          schema={{
            title: 'Foo',
            type: 'number',
            meta: {
              vis: {
                ordinal: 0,
                editable: true,
                component: 'NumberInputField'
              }
            }
          }}
          components={components}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without properties', () => {
    const tree = renderer
      .create(
        <SchemaVis
          schema={{
            title: 'Test',
            type: 'object'
          }}
          components={components}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without name and with namespace', () => {
    const tree = renderer
      .create(
        <SchemaVis schema={schema} namespace="foo" components={components} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
