import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, object, boolean } from '@storybook/addon-knobs/react';

import SvgBuilding from '../../atoms/icons/SvgBuilding';
import SvgLogin from '../../atoms/icons/SvgLogin';

import UtilityNav from './index';
import UtilityNavDocs from './UtilityNav.md';
import UtilityNavData from './UtilityNav.knob.options';

storiesOf('organisms', module).addDecorator(withKnobs)
  .add('UtilityNav', withInfo(`<div>${UtilityNavDocs}</div>`)(() => {
    const newProps = {
      items: [],
      googleLanguages: boolean('utilityNav.googleLanguages', false)
    };
    newProps.items = UtilityNavData.items.map((item, itemIndex) => {
      const icons = {};
      const iconComponents = {
        SvgBuilding: <SvgBuilding />,
        SvgLogin: <SvgLogin />
      };
      Object.keys(iconComponents).forEach((key) => {
        icons[key] = key;
      });
      const storyProps = {
        text: text(`utilityNav.items.text.${itemIndex}`, item.text),
        ariaLabelText: text(`utilityNav.items.ariaLabelText.${itemIndex}`, item.ariaLabelText),
        closeText: text(`utilityNav.items.closeText.${itemIndex}`, item.closeText),
        panel: object(`utilityNav.items.panel.${itemIndex}`, item.panel)
      };
      const comp = select(`utilityNav.items.icons.${itemIndex}`, icons, item.icon.type.name);
      storyProps.icon = iconComponents[comp];
      return(storyProps);
    });
    return(<UtilityNav {...newProps} />);
  }));
