import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean, number, object } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import GeneralTeaser from './index';
import Paragraph from '../../atoms/text/Paragraph';
import GeneralTeaserDocs from './GeneralTeaser.md';


storiesOf('molecules', module).addDecorator(withKnobs)
  .add('GeneralTeaser', withInfo(`<div>${GeneralTeaserDocs}</div>`)(() => {
    const props = {
      image: {
        src: text('GeneralTeaser.image.src', 'https://mayflower.digital.mass.gov/assets/images/placeholder/800x400.png'),
        alt: text('GeneralTeaser.image.alt', 'alt text')
      },
      eyebrow: text('GeneralTeaser.eyebrow', 'press-release'),
      title: {
        info: text('GeneralTeaser.title.info', 'Title info here'),
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
      // ContactGroup items array.
      const primaryItem = {
        type: select(`GeneralTeaser.primaryInfo.items.${i}.type`, {
          phone: 'phone',
          online: 'online',
          email: 'email',
          address: 'address'
        }, 'phone'),
        label: text(`GeneralTeaser.primaryInfo.items.${i}.label`, `Primary Info Label ${i}:`),
        address: text(`GeneralTeaser.primaryInfo.items.${i}.address`, '123 Imaginary Lane'),
        link: object(`GeneralTeaser.primaryInfo.items.${i}.link`, { ...props.title, text: `PrimaryInfo Item Link ${i}` }),
        details: text(`GeneralTeaser.primaryInfo.items.${i}.details`, `Primary Info details ${i}`)
      };
      // DecorativeLink props for subLinks.
      const subLink = { ...props.title, text: `Sublink ${i}`, key: `GeneralTeaser.subLinks.${i}` };
      const secondary = {
        icon: select(`GeneralTeaser.secondaryInfo.${i}.icon`, {
          SvgMarker: 'SvgMarker (Address Icon)',
          SvgPhone: 'SvgPhone (Phone Icon)',
          SvgLaptop: 'SvgLaptop (Laptop Icon)',
          SvgFax: 'SvgFax (FaxIcon)'
        }, 'SvgMarker')
      };
      // DecorativeLink props for secondaryInfo's linkedTitle.
      const secondaryLink = { ...props.title, text: `SecondaryInfo Link ${i}` };
      secondary.linkedTitle = object(`GeneralTeaser.secondaryInfo.${i}.linkedTitle`, secondaryLink);
      props.primaryInfo.items.push(primaryItem);
      props.secondaryInfo.push(secondary);
      props.subLinks.push(object(`GeneralTeaser.subLinks.${i}`, subLink));
    }
    // If you want to make scenarios for each function, use the value of the backstop query param.
    if (window.location.search.indexOf('backstop') > -1) {
      const teasers = [];
      // Add default view from story.
      teasers.push(props);
      // Tests file icon next to url title.
      const addUrlFileIconTests = () => {
        const typeProps = { ...props.title };
        typeProps.showFileIcon = true;
        const knownTypes = ['pdf', 'docx', 'xlxs', 'generic'];
        // Make a teaser for each icon to ensure it displays.
        knownTypes.forEach((type) => {
          typeProps.href = `index.${type}`;
          teasers.push({ title: { ...typeProps } });
        });
      };
      // Tests file icon next to sublink url title.
      const addSubLinkUrlFileIconTests = () => {
        const typeProps = { ...props.title };
        typeProps.showFileIcon = true;
        const knownTypes = ['pdf', 'docx', 'xlxs', 'generic'];
        // Make a teaser for each icon to ensure it displays.
        knownTypes.forEach((type, index) => {
          typeProps.href = `index.${type}`;
          const key = `${props.subLinks[0].key}.${index}`;
          teasers.push({ title: props.title, subLinks: [{ key, ...typeProps }] });
        });
      };
      // Generate teasers for backstop.
      const makeTeasers = () => teasers.map((value, index) => {
        const key = `GeneralTeaser.${index}`;
        const backstopProps = { key, ...value };
        return<GeneralTeaser {...backstopProps} />;
      });
      addUrlFileIconTests();
      addSubLinkUrlFileIconTests();
      return makeTeasers();
    }
    return(
      <GeneralTeaser {...props} />
    );
  }));
