import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import ContactGroup from './index';
import ContactGroupDocs from './ContactGroup.md';
import levelOptions from 'MayflowerReactHeadings/Headings.knobs.options';
import contactGroupOptions from './ContactGroup.knobs.options';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ContactGroup', (() => {
      const props = {
        icon: select('icon', contactGroupOptions.icon, 'SvgPhone'),
        name: select('name', contactGroupOptions.name, 'Phone'),
        level: select('level', levelOptions.levels, 2),
        items: [{
          type: select('Item 0: type', contactGroupOptions.itemsType, 'phone', 'Item 0'),
          label: text('Item 0: label', 'Main:', 'Item 0'),
          address: text('Item 0: address', '', 'Item 0'),
          link: {
            href: text('Item 0: link href', '+14134994262', 'Item 0'),
            text: text('Item 0: link text', '(413) 499-4262', 'Item 0'),
            info: text('Item 0: link info', '', 'Item 0')
          },
          details: text('Item 0: details', 'This line is open from 9:00 a.m. - 5:00 p.m., M-F', 'Item 0')
        }, {
          type: select('Item 1: type', contactGroupOptions.itemsType, 'phone', 'Item 1'),
          label: text('Item 1: label', 'Toll Free:', 'Item 1'),
          address: text('Item 1: address', '', 'Item 1'),
          link: {
            href: text('Item 1: link href', '+18004324321', 'Item 1'),
            text: text('Item 1: link text', '(800) 432-4321', 'Item 1'),
            info: text('Item 1: link info', '', 'Item 1')
          },
          details: text('Item 1: details', 'This line is open from 9:00 a.m. - 5:00 p.m., M-F', 'Item 1')
        }]
      };
      return(<ContactGroup {...props} />);
    }),
    { info: ContactGroupDocs }
  );

