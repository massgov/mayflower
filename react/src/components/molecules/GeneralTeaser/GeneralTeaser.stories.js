import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean, date, number, array, object } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import GeneralTeaser from './index';
import Paragraph from '../../atoms/text/Paragraph';
import ContactGroup from '../ContactGroup';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('GeneralTeaser', withInfo()(() => {
    const props = {
      image: {
        src: text('GeneralTeaser.image.src', ''),
        alt: text('GeneralTeaser.image.alt', '')
      },
      eyebrow: text('GeneralTeaser.eyebrow', 'press-release'),
      title: {
        info: text('GeneralTeaser.title.info', ''),
        text: text('GeneralTeaser.title.text', 'Lorem ipsum dolor sit amet'),
        href: text('GeneralTeaser.title.href', '#'),
        showFileIcon: boolean('GeneralTeaser.title.showFileIcon', false)
      },
      level: number('GeneralTeaser.level', 0),
      date: text('GeneralTeaser.date', new Date().toDateString()),
      org: text('GeneralTeaser.org', 'Massachusetts Department Of Environmental Protection'),
      description: {
        text: text('GeneralTeaser.description.text', Paragraph.defaultProps.text)
      },
      primaryInfo: {
        icon: select('GeneralTeaser.primaryInfo.icon', {
          SvgMarker: 'SvgMarker (Address Icon)',
          SvgPhone: 'SvgPhone (Phone Icon)',
          SvgLaptop: 'SvgLaptop (Laptop Icon)',
          SvgFax: 'SvgFax (FaxIcon)'
        }, 'SvgMarker'),
        name: select('GeneralTeaser.primaryInfo.name', {
          Phone: 'Phone',
          Online: 'Online',
          Fax: 'Fax',
          Address: 'Address'
        }, 'Phone')
      }
    };
    props.subLinks = [];
    for (let i = 1; i < 4; i++) {
      let subLink = {...props.title, text: `Sublink ${i}` };
      props.subLinks.push(object(`GeneralTeaser.subLinks.${i}`, subLink));
    }
    return(
      <GeneralTeaser {...props} />
    );
  }));
