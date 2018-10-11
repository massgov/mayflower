import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs/react';

import MainNav from './index';
import MainNavDocs from './MainNav.md';
import MainNavData from './MainNav.knob.options';
import MainNavDataBudget from './MainNav.knob.budget';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('MainNav', withInfo(`<div>${MainNavDocs}</div>`)(() => {
    const newProps = {
      mainNav: []
    };
    newProps.mainNav = MainNavDataBudget.mainNav.map((nav, navIndex) => {
      let active = false;
      if (typeof nav.active === 'string') {
        active = (nav.active.toLowerCase() === 'true');
      } else if (typeof nav.active === 'boolean') {
        active = nav.active;
      } else {
        active = false;
      }
      const storyProps = {
        href: text(`mainNav.href${navIndex}`, nav.href),
        text: text(`mainNav.text${navIndex}`, nav.text),
        active: boolean(`mainNav.active${navIndex}`, active),
        subNav: object(`mainNav.subNav${navIndex}`, nav.subNav)
      };
      return(storyProps);
    });
    return(<MainNav {...newProps} />);
  }));
