import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SchemaVis from '../src';

function createInputField({ type, ...config }) {
  class CreatedInputField extends Component {
    render() {
      const { name, schema, styles, children, ...rest } = this.props;
      let Tag = 'input';
      if (type === 'textarea') {
        Tag = 'textarea';
      }
      return (
        <div>
          <label htmlFor={name}>{schema.title}</label>
          <Tag
            {...rest}
            type={type}
            style={styles.input}
            id={name}
            name={name}
            {...config}
          />
        </div>
      );
    }
  }
  return CreatedInputField;
}

const inputFields = {
  TextInputField: createInputField({ type: 'text' }),
  EmailInputField: createInputField({ type: 'email' }),
  PasswordInputField: createInputField({ type: 'password' }),
  DateInputField: createInputField({ type: 'date' }),
  NumberInputField: createInputField({
    type: 'number'
  }),
  ColorInputField: createInputField({
    type: 'color'
  }),
  TextAreaInputField: createInputField({ type: 'textarea' })
};
storiesOf('React Jsonschema Vis', module).add('simple form', () => {
  const schema = {
    type: 'object',
    required: ['fullName', 'email', 'password'],
    properties: {
      fullName: {
        id: 'FullName',
        title: 'Full Name',
        type: 'string',
        meta: {
          vis: {
            ordinal: 100,
            editable: true,
            component: 'TextInputField'
          }
        }
      },
      email: {
        id: 'Email',
        title: 'Email',
        type: 'string',
        format: 'email',
        meta: {
          vis: {
            ordinal: 110,
            editable: true,
            component: 'EmailInputField'
          }
        }
      },
      password: {
        id: 'Password',
        title: 'Password',
        type: 'string',
        meta: {
          vis: {
            ordinal: 120,
            editable: true,
            component: 'PasswordInputField'
          }
        }
      },
      dob: {
        id: 'DOB',
        title: 'DOB',
        type: 'string',
        format: 'date',
        meta: {
          vis: {
            ordinal: 130,
            editable: true,
            component: 'DateInputField'
          }
        }
      },
      numChildren: {
        id: 'Children',
        title: '# of Children',
        type: 'integer',
        min: 0,
        meta: {
          vis: {
            ordinal: 140,
            editable: true,
            component: 'NumberInputField'
          }
        }
      },
      favColor: {
        id: 'FavColor',
        title: 'Favorite Color',
        type: 'string',
        meta: {
          vis: {
            ordinal: 150,
            editable: true,
            component: 'ColorInputField'
          }
        }
      },
      comments: {
        id: 'Comments',
        title: 'Comments',
        type: 'string',
        meta: {
          vis: {
            ordinal: 180,
            editable: true,
            component: 'TextAreaInputField'
          }
        }
      }
    }
  };

  return (
    <form onSubmit={action('form submit')}>
      <SchemaVis schema={schema} components={inputFields} />
      <button color="primary" type="submit">Submit</button>
    </form>
  );
});
