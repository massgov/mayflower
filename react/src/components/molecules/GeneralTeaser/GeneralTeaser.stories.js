import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean, date, number, array, object } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import GeneralTeaser from './index';
import Paragraph from '../../atoms/text/Paragraph';
import GeneralTeaserDocs from './GeneralTeaser.md';


storiesOf('molecules', module).addDecorator(withKnobs)
  .add('GeneralTeaser', withInfo(`<div>${GeneralTeaserDocs}</div>`)(() => {
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
        }, 'Phone'),
        text: text('GeneralTeaser.primaryInfo.text', ''),
        level: number('GeneralTeaser.primaryInfo.level', 0),
        items: []
      },
      subLinks: [],
      secondaryInfo: []
    };
    for (let i = 1; i < 4; i++) {
      const primaryItem = {
        type: select(`GeneralTeaser.primaryInfo.items.${i}.type`, {
          phone: 'phone',
          online: 'online',
          email: 'email',
          address: 'address'
        }, 'phone'),
        label: text(`GeneralTeaser.primaryInfo.items.${i}.label`, ''),
        address: text(`GeneralTeaser.primaryInfo.items.${i}.address`, ''),
        link: object(`GeneralTeaser.primaryInfo.items.${i}.link`, { ...props.title, text: `PrimaryInfo Item Link ${i}` }),
        details: text(`GeneralTeaser.primaryInfo.items.${i}.details`, '')
      };
      const subLink = { ...props.title, text: `Sublink ${i}` };
      const secondary = {
        icon: select(`GeneralTeaser.secondaryInfo.${i}.icon`, {
          SvgMarker: 'SvgMarker (Address Icon)',
          SvgPhone: 'SvgPhone (Phone Icon)',
          SvgLaptop: 'SvgLaptop (Laptop Icon)',
          SvgFax: 'SvgFax (FaxIcon)'
        }, 'SvgMarker')
      };
      const secondaryLink = { ...props.title, text: `SecondaryInfo Link ${i}` };
      secondary.linkedTitle = object(`GeneralTeaser.secondaryInfo.${i}.linkedTitle`, secondaryLink);
      props.primaryInfo.items.push(primaryItem);
      props.secondaryInfo.push(secondary);
      props.subLinks.push(object(`GeneralTeaser.subLinks.${i}`, subLink));
    }
    return(
      <GeneralTeaser {...props} />
    );
  }));
