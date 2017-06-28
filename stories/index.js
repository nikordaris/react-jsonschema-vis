import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SchemaVis from '../src';

import schema from './schema.json';

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

const data = {
  fullName: 'Jon Doe',
  email: 'jon@doe.com',
  password: 'password',
  dob: new Date().toDateString(),
  numChildren: 1,
  favColor: '#111111',
  comments: 'hello world'
};

class VisField extends Component {
  render() {
    const { name, data, schema, styles, children, ...rest } = this.props;
    return (
      <div>
        <h4>{schema.title}</h4>
        {children}
      </div>
    );
  }
}

class StringField extends Component {
  render() {
    const { name, data } = this.props;
    return (
      <VisField {...this.props}>
        <span>{data[name]}</span>
      </VisField>
    );
  }
}

class ColorField extends Component {
  render() {
    const { name, data } = this.props;
    return (
      <VisField {...this.props}>
        <span
          style={{
            background: data[name],
            color: data[name] === '#FFFFFF' ? 'black' : 'white'
          }}
        >
          {data[name]}
        </span>
      </VisField>
    );
  }
}

class EmailField extends Component {
  render() {
    const { name, data } = this.props;
    return (
      <VisField {...this.props}>
        <a href={`mailto:${data[name]}`}
        >
          {data[name]}
        </a>
      </VisField>
    );
  }
}

const visComponents = {
  StringField,
  ColorField,
  EmailField
};

storiesOf('React Jsonschema Vis', module)
  .add('simple form', () => (
    <form onSubmit={action('form submit')}>
      <SchemaVis prefix="meta.form" schema={schema} components={inputFields} />
      <button color="primary" type="submit">Submit</button>
    </form>
  ))
  .add('simple data visualization', () => (
    <SchemaVis data={data} schema={schema} components={visComponents} />
  ));
