import React from 'react';
import Label from 'MayflowerReactForms/Label';
import Input from './new-index';

export default {
  title: 'Index'
};

export const withNumber = () => (
  <Input
    id="with-number"
    type="number"
    WrapperElement={({ children }) => (
      <div className="ma__input-group">
        <Label inputId="with-number">With Number</Label>
        { children }
      </div>
    )}
  />
);

export const withCheckbox = () => (
  <Input
    id="with-checkbox"
    type="checkbox"
    label="With Checkbox:"
    WrapperElement="span"
  />
);

export const withRadio = () => (
  <Input id="with-radio" type="radio" label="With Radio" />
);
