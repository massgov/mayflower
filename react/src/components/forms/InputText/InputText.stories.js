import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import InputText from './index';
import InputTextDocs from './InputText.md';
import InputTextOptions from './InputText.knobs.options';
import InputGroup from '../InputGroup';

storiesOf('forms|atoms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputText', (() => {
      const [value, setValue] = React.useState('');
      const onChange = (e) => {
        setValue(e.currentTarget.value);
      };
      const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputTextOptions).map(([k, v]) => (
        { [k]: v() })));
      inputTextOptionsWithKnobs.onChange = onChange;
      inputTextOptionsWithKnobs.value = value;
      const storyProps = {
        ...inputTextOptionsWithKnobs
      };
      const {
        id, name, maxlength, min, max, step, onBlur, required, disabled, defaultValue, placeholder,
        hidden, labelText, inline, errorMsg, showError, width, showButtons, format, helperText
      } = storyProps;
      const props = {
        inputProps: {
          id,
          name,
          maxlength,
          min,
          max,
          step,
          onBlur,
          onChange,
          required,
          disabled,
          defaultValue,
          placeholder
        },
        groupProps: {
          labelProps: {
            hidden,
            labelText
          },
          helperText,
          inline,
          errorMsg,
          showError
        },
        width,
        showButtons,
        format
      };
      return(
        <SyntaxHighlighter language="markup" style={okaidia}>
          {prettier.format(ReactDOMServer.renderToStaticMarkup(
            <InputGroup>
              <InputGroup.Label inputId={id}>{labelText}</InputGroup.Label>
              {helperText && (
                <InputGroup.HelperText>
                  {helperText}
                </InputGroup.HelperText>
              )}
              <InputText {...props} />
              {showError && (
                <InputGroup.ErrorMessage inputId={id}>
                  {errorMsg}
                </InputGroup.ErrorMessage>
              )}
            </InputGroup>), { htmlWhitespaceSensitivity: 'ignore', endOfLine: 'auto', parser: 'html', plugins: [parserHtml] })}
        </SyntaxHighlighter>
      );
    }),
    { info: InputTextDocs }
  );
