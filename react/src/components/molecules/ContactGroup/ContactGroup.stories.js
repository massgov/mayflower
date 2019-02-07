import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import ContactGroup from './index';
import ContactGroupDocs from './ContactGroup.md';
import levelOptions from '../../atoms/headings/Headings.knobs.options';
import contactGroupOptions from './ContactGroup.knobs.options';

storiesOf('molecules', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'ContactGroup', (() => {
      const props = {
        icon: select('contactGroup.icon', contactGroupOptions.icon, 'SvgPhone'),
        name: select('contactGroup.name', contactGroupOptions.name, 'Phone'),
        level: select('contactGroup.level', levelOptions.levels, 2),
        items: [{
          type: select('contactGroup.items[0].type', contactGroupOptions.itemsType, 'phone'),
          label: text('contactGroup.items[0].label', 'Main:'),
          address: text('contactGroup.items[0].address', ''),
          link: {
            href: text('contactGroup.items[0].link.href', '+14134994262'),
            text: text('contactGroup.items[0].link.text', '(413) 499-4262'),
            info: text('contactGroup.items[0].link.info', '')
          },
          details: text('contactGroup.items[0].details', 'This line is open from 9:00 a.m. - 5:00 p.m., M-F')
        }, {
          type: select('contactGroup.items[1].type', contactGroupOptions.itemsType, 'phone'),
          label: text('contactGroup.items[1].label', 'Toll Free:'),
          address: text('contactGroup.items[1].address', ''),
          link: {
            href: text('contactGroup.items[1].link.href', '+18004324321'),
            text: text('contactGroup.items[1].link.text', '(800) 432-4321'),
            info: text('contactGroup.items[1].link.info', '')
          },
          details: text('contactGroup.items[1].details', 'This line is open from 9:00 a.m. - 5:00 p.m., M-F')
        }]
      };
      return(<ContactGroup {...props} />);
    }),
    { info: ContactGroupDocs }
  );

