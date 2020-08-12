import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { storiesOf } from '@storybook/react';
import { object, withKnobs, text, number, array, boolean } from '@storybook/addon-knobs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import pretty from 'pretty';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import FormDocs from './Form.md';
import DateRange from 'MayflowerReactForms/DateRange';
import InputDate from 'MayflowerReactForms/InputDate';
import InputNumber from 'MayflowerReactForms/InputNumber';
import InputText from 'MayflowerReactForms/InputText';
import InputRadio from 'MayflowerReactForms/InputRadio';
import InputRadioGroup from 'MayflowerReactForms/InputRadioGroup';
import InputCheckBox from 'MayflowerReactForms/InputCheckBox';
import InputNumberOptions from 'MayflowerReactForms/InputNumber/InputNumber.knobs.options';
import InputSliderOptions from 'MayflowerReactForms/InputSlider/InputSlider.knobs.options';
import InputSlider from 'MayflowerReactForms/CompoundSlider';
import InputCurrency from 'MayflowerReactForms/InputCurrency';
import SelectBox from 'MayflowerReactForms/SelectBox';
import InputCurrencyOptions from 'MayflowerReactForms/InputCurrency/InputCurrency.knobs.options';

storiesOf('forms|context', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Form', (() => {
      const currencyRef = React.useRef();
      const formRef = React.useRef();
      const [syncValue, setSyncValue] = React.useState(0);
      let ticks = object('Ticks', [[0, '0%'], [0.6, 'Minimum requirement'], [1, '100%']], 'InputSlider');
      const hideTicks = boolean('Hide ticks', false, 'InputSlider');
      const [selectValue, setSelectValue] = React.useState('green');
      const [checked, setChecked] = React.useState(false);
      const [textValue, setTextValue] = React.useState('');
      const inline = boolean('inline', false);
      const hiddenLabel = boolean('hiddenLabel', false);
      if (hideTicks) {
        ticks = new Map();
      } else {
        ticks = new Map(ticks);
      }
      const onUpdate = ({ value }) => {
        setSyncValue(value);
      };
      const sliderProps = {
        id: 'test-slider',
        labelText: 'Test Slider',
        domain: [0, 1],
        step: 0.01,
        values: [syncValue],
        ticks,
        displayValueFormat: 'percentage',
        onUpdate,
        hiddenLabel
      };
      const currencyProps = {
        id: 'test-currency',
        labelText: 'Test Currency',
        step: 0.01,
        inline,
        hiddenLabel
      };
      const inputOneProps = {
        id: 'test-number-one',
        labelText: 'Test Input One',
        step: 0.01,
        defaultValue: 0,
        inline,
        hiddenLabel
      };
      const dateRangeProps = {
        labelText: 'Test Date Range',
        inline,
        startDate: {},
        endDate: {},
        hiddenLabel
      };
      const dateProps = {
        labelText: 'Test Date',
        inline,
        hiddenLabel
      };
      const selectProps = {
        id: 'color-select',
        inline,
        required: true,
        labelText: 'Test SelectBox',
        className: '',
        options: [
          { text: 'Green', value: 'green' },
          { text: 'Blue', value: 'blue' }
        ],
        onChangeCallback: ({ selectedValue }) => {
          setSelectValue(selectedValue);
        },
        value: selectValue,
        hiddenLabel
      };
      const checkboxOneProps = {
        inputProps: {
          id: 'checkbox-one',
          name: 'checkbox-one',
          onChange: () => {
            setChecked((prevChecked) => !prevChecked);
          },
          value: 'choice1',
          defaultChecked: true
        },
        inline,
        labelText: 'Test Checkbox',
        label: 'Choice 1',
        hiddenLabel
      };
      const checkboxTwoProps = {
        inputProps: {
          id: 'checkbox-two',
          name: 'checkbox-two',
          value: 'choice2'
        },
        inline,
        labelText: 'Test Checkbox 2',
        label: 'Choice 2',
        hiddenLabel
      };
      const inputRadioGroupProps = {
        labelText: 'Pick your favorite plant',
        name: 'favorite-plant',
        outline: false,
        defaultSelected: '',
        errorMsg: 'You must selected your favorite plant.',
        inline,
        radioButtons: [{
          value: 'fern',
          label: 'Fern'
        }, {
          value: 'moss',
          label: 'Moss'
        }, {
          value: 'palm',
          label: 'Palm'
        }, {
          value: 'mayflower',
          label: 'Mayflower'
        }],
        hiddenLabel
      };
      const inputTextProps = {
        labelText: 'Text Input',
        id: 'text-input',
        name: 'text-input',
        type: 'text',
        placeholder: 'type something',
        errorMsg: 'you did not type something',
        inline,
        defaultValue: '',
        // onChange: (e) => {
        //   setTextValue(e.currentTarget.value);
        // },
        hiddenLabel
      };
      return(
        <>
        <form ref={formRef}>
          <InputText {...inputTextProps} />
          <InputRadioGroup {...inputRadioGroupProps} />
          <SelectBox {...selectProps} />
          <InputDate {...dateProps} />
          <DateRange {...dateRangeProps} />
          <InputCheckBox {...checkboxOneProps} />
          <InputCheckBox {...checkboxTwoProps} />
          <InputRadio hiddenLabel={hiddenLabel} inline={inline} outline labelText="Test Radio" value="Foo" label="Bar" />
          <InputCurrency {...currencyProps} />
          <InputNumber {...inputOneProps} />
          <InputNumber inline={inline} hiddenLabel={hiddenLabel} defaultValue={0} id="test-number-two" labelText="Test Input Two" />
          <InputSlider {...sliderProps} />
        </form>
        <SyntaxHighlighter language="markup" style={okaidia}>
          {prettier.format(ReactDOMServer.renderToStaticMarkup(
            <form ref={formRef}>
            <InputText {...inputTextProps} />
            <InputRadioGroup {...inputRadioGroupProps} />
            <SelectBox {...selectProps} />
            <InputDate {...dateProps} />
            <DateRange {...dateRangeProps} />
            <InputCheckBox {...checkboxOneProps} />
            <InputCheckBox {...checkboxTwoProps} />
            <InputRadio hiddenLabel={hiddenLabel} inline={inline} outline labelText="Test Radio" value="Foo" label="Bar" />
            <InputCurrency {...currencyProps} />
            <InputNumber {...inputOneProps} />
            <InputNumber inline={inline} hiddenLabel={hiddenLabel} defaultValue={0} id="test-number-two" labelText="Test Input Two" />
            <InputSlider {...sliderProps} />
          </form>
          ), { htmlWhitespaceSensitivity: 'ignore', endOfLine: 'auto', parser: 'html', plugins: [parserHtml] })}
        </SyntaxHighlighter>
        </>
      );
      // delete InputNumberOptions.defaultValue;

      // const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputNumberOptions).map(([k, v]) => (
      //   { [k]: v() })));

      // const SliderOptions = Object.fromEntries(Object.entries(InputSliderOptions));

      // delete SliderOptions.ticks;
      // delete SliderOptions.labelText;
      // delete SliderOptions.step;
      // delete SliderOptions.max;
      // delete SliderOptions.domain;
      // const inputSliderOptionsWithKnobs = Object.assign(...Object.entries(SliderOptions).map(([k, v]) => (
      //   { [k]: v() })));
      // inputSliderOptionsWithKnobs.domain = array('InputSlider.domain', [0, 1]).map((num) => Number(num));
      // inputSliderOptionsWithKnobs.max = number('InputSlider.max', 1);
      // inputSliderOptionsWithKnobs.step = number('InputSlider.step', 0.01, { min: 0, max: 1, step: 0.01 });
      // inputSliderOptionsWithKnobs.labelText = text('InputSlider.labelText', 'Slider (Linked to Input 0 and Input 1)');
      // const formTicks = object('InputSlider.ticks', { 0: '0%', 0.6: 'Minimum requirement', 1: '100%' });
      // const ticks = [];
      // Object.keys(formTicks).forEach((tick) => ticks.push([tick, formTicks[tick]]));
      // inputSliderOptionsWithKnobs.ticks = ticks;
      // // Make sure the domain is within the same range as the min and max of the input to make this work.
      // delete InputCurrencyOptions.labelText;
      // const inputCurrencyOptionsWithKnobs = Object.assign(...Object.entries(InputCurrencyOptions).map(([k, v]) => (
      //   { [k]: v() })));
      // inputCurrencyOptionsWithKnobs.labelText = text('InputCurrency.labelText', 'Currency Input (Set to 999 when Slider is greater than 60)');
      // const languages = new Map();
      // languages.set('Chinese', 'zh-CN');
      // languages.set('English', 'en-US');
      // languages.set('French', 'fr-FR');
      // languages.set('Russian', 'ru-RU');
      // inputCurrencyOptionsWithKnobs.language = languages.get(inputCurrencyOptionsWithKnobs.language);
      // return(
      //   <FormProvider>
      //     <Form>
      //       {
      //       (formContext) => {
      //         inputTextOptionsWithKnobs.onChange = (e, newVal, id) => {
      //             // Keep test0 and test1 in sync.
      //             if (formContext.hasId('test0') && formContext.hasId('test1') && (formContext.hasId('slider'))) {
      //               if (id === 'test0') {
      //                 const test0 = formContext.getValue('test0');
      //                 formContext.setValue({ id: 'test1', value: 100 - test0 });
      //                 formContext.setValue({ id: 'slider', value: test0 / 100 });
      //                 if (test0 > 60) {
      //                   formContext.setValue({ id: 'currency-input', value: '$999.00' });
      //                 } else {
      //                   formContext.setValue({ id: 'currency-input', value: '$0.00' });
      //                 }
      //               }
      //               if (id === 'test1') {
      //                 const test1 = formContext.getValue('test1');
      //                 formContext.setValue({ id: 'test0', value: 100 - test1 });
      //                 formContext.setValue({ id: 'slider', value: (100 - test1) / 100 });
      //                 if ((100 - test1) > 60) {
      //                   formContext.setValue({ id: 'currency-input', value: '$999.00' });
      //                 } else {
      //                   formContext.setValue({ id: 'currency-input', value: '$0.00' });
      //                 }
      //               }
      //             }
      //         };
      //         const ids = [
      //           [
      //             'test0',
      //             {
      //               ...inputTextOptionsWithKnobs,
      //               key: 'Form.InputNumber.test0',
      //               defaultValue: 0,
      //               labelText: 'Input 0 (Linked to Input 1 and Slider)',
      //               id: 'test0',
      //               unit: '%'
      //             }
      //           ],
      //           [
      //             'test1',
      //             {
      //               ...inputTextOptionsWithKnobs,
      //               key: 'Form.InputNumber.test1',
      //               defaultValue: 100,
      //               labelText: 'Input 1 (Linked to Input 0 and Slider)',
      //               id: 'test1',
      //               unit: '%'
      //             }
      //           ]
      //         ];
      //         const inputs = [];
      //         ids.forEach((numberProps) => {
      //           inputs.push(<InputNumber {...numberProps[1]} />);
      //         });
      //         inputSliderOptionsWithKnobs.onUpdate = (newVal, id) => {
      //           if (formContext.hasId(id)) {
      //             formContext.setValue({ id: 'test0', value: Number(formContext.getValue(id) * 100).toFixed() });
      //             formContext.setValue({ id: 'test1', value: Number((1 - formContext.getValue(id)) * 100).toFixed() });
      //             if (formContext.hasId('currency-input')) {
      //               if (newVal > 0.6) {
      //                 // Sets currency to 999 when slider is 60%.
      //                 formContext.setValue({ id: 'currency-input', value: '$999.00' });
      //               } else {
      //                 formContext.setValue({ id: 'currency-input', value: '$0.00' });
      //               }
      //             }
      //           }
      //         };
      //         return(
      //           <React.Fragment>
      //             <InputCurrency {...inputCurrencyOptionsWithKnobs} />
      //             {inputs}
      //             <InputSlider {...inputSliderOptionsWithKnobs} id="slider" />
      //           </React.Fragment>
      //         );
      //       }
      //     }
      //     </Form>
      //   </FormProvider>
      // );
    }),
    { info: FormDocs }
  );
