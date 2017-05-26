import React, { Component } from 'react';
import renderer from 'react-test-renderer';

import SchemaFields from './index.js';

const schema = {
  title: 'Test',
  type: 'object',
  properties: {
    foo: {
      title: 'Foo',
      type: 'number',
      meta: {
        form: {
          ordinal: 0,
          editable: true,
          widget: 'NumberInputField'
        }
      }
    },
    bar: {
      title: 'Bar',
      type: 'string',
      meta: {
        form: {
          ordinal: 1,
          editable: true,
          widget: 'InputField'
        }
      }
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
});
