import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, object, boolean } from '@storybook/addon-knobs/react';

import UtilityNav from './index';
import UtilityNavDocs from './UtilityNav.md';
import UtilityNavData from './UtilityNav.knob.options';

storiesOf('organisms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'UtilityNav', (() => {
      const newProps = {
        items: [],
        googleLanguages: boolean('utilityNav.googleLanguages', false)
      };
      newProps.items = UtilityNavData.items.map((item, itemIndex) => {
        const icons = {
          building: 'building',
          login: 'login'
        };
        const storyProps = {
          text: text(`utilityNav.items.text.${itemIndex}`, item.text),
          ariaLabelText: text(`utilityNav.items.ariaLabelText.${itemIndex}`, item.ariaLabelText),
          closeText: text(`utilityNav.items.closeText.${itemIndex}`, item.closeText),
          href: text(`utilityNav.items.href.${itemIndex}`, item.href),
          panel: object(`utilityNav.items.panel.${itemIndex}`, item.panel)
        };
        storyProps.icon = select(`utilityNav.items.icons.${itemIndex}`, icons, item.icon);
        return(storyProps);
      });
      return(<UtilityNav {...newProps} />);
    }),
    { info: UtilityNavDocs }
  );
