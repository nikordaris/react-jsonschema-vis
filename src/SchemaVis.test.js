import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { omit } from 'lodash';

import SchemaVis from './index.js';

const schema = {
  title: 'Test',
  type: 'object',
  required: ['foo', 'foobar'],
  definitions: {
    foo1: {
      title: 'Foo1',
      type: 'string',
      meta: {
        vis: {
          ordinal: 0,
          disabled: true,
          component: 'InputField'
        }
      }
    }
  },
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
    foo1: {
      $ref: '#/definitions/foo1'
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
          component: 'EmailInputField'
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

function createInput(options) {
  return <InputField {...options} />;
}

class InputField extends Component {
  render() {
    const { styles, schemaVis, ...rest } = this.props;
    return <input type="text" {...rest} />;
  }
}

const components = {
  EmailInputField: createInput({ type: 'email' }),
  NumberInputField: createInput({ type: 'number' }),
  InputField
};

describe('Render Schema', () => {
  it('should render', () => {
    const tree = renderer
      .create(<SchemaVis schema={schema} components={components} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render props update', () => {
    const wrapper = mount(
      <SchemaVis schema={schema} components={components} />
    );
    wrapper.setProps({
      schema: {
        ...schema,
        properties: {
          ...schema.properties,
          foo2: {
            $ref: '#/definitions/foo1',
            meta: { vis2: { component: 'InputField' } }
          }
        }
      },
      prefix: '',
      components
    });
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({
      schema: {
        ...schema,
        definitions: undefined,
        properties: omit(schema.properties, ['foo1'])
      },
      components
    });
    expect(toJson(wrapper)).toMatchSnapshot();
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
