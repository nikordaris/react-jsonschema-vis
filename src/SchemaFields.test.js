import React from 'react';
import renderer from 'react-test-renderer';

import SchemaFields from './index.js';

const schema = {
  title: 'Test',
  type: 'object',
  required: ['foo', 'foobar'],
  properties: {
    foo: {
      title: 'Foo',
      type: 'number',
      meta: {
        form: {
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
        form: {
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
        form: {
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
        form: {
          ordinal: 3,
          editable: true
        }
      }
    },
    blah: {
      title: 'Blah',
      type: 'string',
      meta: {
        form: {
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
      .create(<SchemaFields schema={schema} widgets={widgets} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without required fields', () => {
    const tree = renderer
      .create(<SchemaFields schema={{...schema, required: undefined}} widgets={widgets} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render single field schema', () => {
    const tree = renderer
      .create(
        <SchemaFields
          namespace="bar"
          schema={{
            title: 'Foo',
            type: 'number',
            meta: {
              form: {
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
        <SchemaFields
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
