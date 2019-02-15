import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { specs, describe, it } from 'storybook-addon-specifications';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Button from './index';
import ButtonDocs from './Button.md';
import buttonOptions from './Button.knobs.options';

storiesOf('atoms/buttons', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Button', (() => {
      const props = {
        usage: select('button.usage', buttonOptions.usage),
        theme: select('button.theme', buttonOptions.theme),
        type: select('button.type', buttonOptions.type),
        size: select('button.size', buttonOptions.size),
        info: text('button.info', 'this will be the tooltip text on hover'),
        disabled: boolean('button.disabled', false),
        text: text('button.text', 'Button'),
        href: text('button.href', ''),
        onClick: action('button clicked')
      };
      const story = <Button {...props} />;
      specs(() => describe('Button', () => {
        it(`Should display text "${props.text}".`, () => {
          const wrapper = mount(story);
          expect(wrapper.text()).to.contain(props.text);
        });
        it('Simulate button click to test onClick callback function.', () => {
          const callback = sinon.spy();
          const wrapper = mount(<Button {...props} disabled={false} onClick={callback} />);
          wrapper.find('button').simulate('click');
          expect(callback).to.have.property('callCount', 1);
        });
        it('Should not be clickable in disabled state.', () => {
          const callback = sinon.spy();
          const wrapper = mount(<Button {...props} disabled onClick={callback} />);
          wrapper.find('button').simulate('click');
          expect(callback).to.have.property('callCount', 0);
        });
        it('Should have disabled classsname in disabled state.', () => {
          const wrapper = mount(<Button {...props} disabled />);
          expect(wrapper.find('button').hasClass('ma__button--disabled')).to.equal(true);
        });
      }));
      return(
        story
      );
    }),
    { info: ButtonDocs }
  );
