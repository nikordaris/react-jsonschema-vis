import React from 'react';
import renderer from 'react-test-renderer';

import SchemaWidgets from './index.js';

const schema = {
  title: 'Test',
  type: 'object',
  required: ['foo', 'foobar'],
  properties: {
    foo: {
      title: 'Foo',
      type: 'number',
      meta: {
        widgets: {
          editable: true,
          widget: 'NumberInputField'
        }
      }
    },
    bar: {
      title: 'Bar',
      type: 'string',
      required: true,
      meta: {
        widgets: {
          ordinal: 1,
          editable: true,
          widget: 'InputField'
        }
      }
    },
    foobar: {
      title: 'Foobar',
      description: 'Foo is bar',
      type: 'string',
      meta: {
        widgets: {
          editable: true,
          widget: 'InputField'
        }
      }
    },
    foobar2: {
      title: 'Foobar2',
      description: 'Foo is bar',
      type: 'string',
      meta: {
        widgets: {
          ordinal: 3,
          editable: true
        }
      }
    },
    blah: {
      title: 'Blah',
      type: 'string',
      meta: {
        widgets: {
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

const widgets = {
  NumberInputField: <input type="number" />,
  InputField: 'input'
};

describe('Render Schema', () => {
  it('should render', () => {
    const tree = renderer
      .create(<SchemaWidgets schema={schema} widgets={widgets} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without required fields', () => {
    const tree = renderer
      .create(<SchemaWidgets schema={{...schema, required: undefined}} widgets={widgets} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render single field schema', () => {
    const tree = renderer
      .create(
        <SchemaWidgets
          namespace="bar"
          schema={{
            title: 'Foo',
            type: 'number',
            meta: {
              widgets: {
                ordinal: 0,
                editable: true,
                widget: 'NumberInputField'
              }
            }
          }}
          widgets={widgets}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without properties', () => {
    const tree = renderer
      .create(
        <SchemaWidgets
          schema={{
            title: 'Test',
            type: 'object'
          }}
          widgets={widgets}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
