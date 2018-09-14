import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean, number, object, array } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import GeneralTeaser from './index';
import { Paragraph, DecorativeLink, ContactGroup, IconLink, Link, Icon } from '../../../index';
import { svgOptions } from '../../atoms/icons/Icon/Icon.knob.options';

import GeneralTeaserDocs from './GeneralTeaser.md';

storiesOf('organisms', module).addDecorator(withKnobs)
  .add('GeneralTeaser', withInfo({ text: `<div>${GeneralTeaserDocs}</div>`})(() => {
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
      props.primaryInfo.items.push(primaryItem);

      // DecorativeLink props for subLinks.
      const subLink = object(`GeneralTeaser.subLinks.${i}`, { ...props.title, text: `Sublink ${i}`, key: `GeneralTeaser.subLinks.${i}` });
      props.subLinks.push(<DecorativeLink {...subLink} />);
      const secondary = {
        wrapperClasses: array('GeneralTeaser.secondaryInfo.iconClasses', ['ma__decorative-link'])
      };
      // Link props for secondaryInfo.
      const secondaryLink = { info: props.title.info, href: props.title.href, text: `SecondaryInfo Link ${i}` };
      const secondDecore = object(`GeneralTeaser.secondaryInfo.${i}.link`, secondaryLink);
      secondary.icon = <Icon name={secondary.icon} svgWidth={18} svgHeight={18} />;
      secondary.link = <Link {...secondDecore} />;
      const secondaryIcon = {
        name: select('GeneralTeaser.secondaryInfo.Icon.name', svgOptions, 'marker'),
        svgWidth: text('GeneralTeaser.secondaryInfo.Icon.svgWidth', 16),
        svgHeight: text('GeneralTeaser.secondaryInfo.Icon.svgHeight', 16),
        title: text('GeneralTeaser.secondaryInfo.Icon.title', 'Icon Title Here'),
        classes: array('GeneralTeaser.secondaryInfo.IconLink.iconClasses', ['ma__general-teaser__secondaryicon'])
      };
      secondary.icon = <Icon {...secondaryIcon} />;
      props.secondaryInfo.push(<IconLink {...secondary} />);
    }
    props.title = <DecorativeLink {...props.title} />;
    props.description = <Paragraph {...props.description} />;
    props.primaryInfo = <ContactGroup {...props.primaryInfo} />;
    // If you want to make scenarios for each function, use the value of the backstop query param.
    if (window.location.search.indexOf('backstop') > -1) {
      const teasers = [];
      // Add teaser using defaults from story.
      teasers.push(props);
      // Tests file icon next to url title.
      const addUrlFileIconTests = () => {
        const typeProps = {
          info: 'Title info here',
          text: 'Lorem ipsum dolor sit amet',
          href: '#',
          showFileIcon: true
        };
        const knownTypes = ['pdf', 'docx', 'xlxs', 'generic'];
        // Make a teaser for each icon to ensure it displays.
        knownTypes.forEach((value) => {
          typeProps.href = `index.${value}`;
          typeProps.showFileIcon = true;
          teasers.push({ title: <DecorativeLink {...typeProps} /> });
        });
      };
      // Tests file icon next to sublink url title.
      const addSubLinkUrlFileIconTests = () => {
        const typeProps = {
          info: 'Title info here',
          text: 'Lorem ipsum dolor sit amet',
          href: '#',
          showFileIcon: true
        };
        const knownTypes = ['pdf', 'docx', 'xlxs', 'generic'];
        // Make a teaser for each icon to ensure it displays.
        knownTypes.forEach((type, index) => {
          typeProps.href = `index.${type}`;
          typeProps.key = `${props.subLinks[0].key}.${index}`;
          teasers.push({ title: props.title, subLinks: [<DecorativeLink {...typeProps} />] });
        });
      };
      // Tests all primaryinfo combinations.
      const addPrimaryInfoTests = () => {
        const titleProps = {
          info: 'Title info here',
          text: 'Lorem ipsum dolor sit amet',
          href: '#',
          showFileIcon: false
        };
        const primaryProps = {
          icon: 'SvgMarker',
          name: 'Online',
          text: 'Text for the primaryInfo prop',
          level: 1,
          items: []
        };
        const knownTypes = ['phone', 'online', 'email', 'address'];
        knownTypes.forEach((value, index) => {
          const primaryItem = {
            type: value,
            label: `Primary Info Label ${index}`,
            address: '123 Imaginary Lane',
            link: { ...props.title, text: `PrimaryInfo Item Link ${index}` },
            details: Paragraph.defaultProps.text
          };
          switch (value) {
            case 'phone':
              primaryItem.label = 'Phone Label';
              primaryItem.link.href = '1234567890';
              primaryItem.link.text = '1234567890';
              break;
            case 'email':
              primaryItem.label = 'Email Label';
              primaryItem.link.href = 'test@test.com';
              primaryItem.link.text = 'test@test.com';
              break;
            default:
              primaryItem.link.href = '#';
          }
          primaryProps.items.push(primaryItem);
        });
        teasers.push({ title: <DecorativeLink {...titleProps} />, primaryInfo: <ContactGroup {...primaryProps} /> });
        // Add primary info teasers without items but with each icon type.
        primaryProps.items = [];
        const iconTypes = ['SvgMarker', 'SvgPhone', 'SvgLaptop', 'SvgFax'];
        // Since there is also four names to check, cheat and use the index.
        const nameTypes = ['Phone', 'Online', 'Fax', 'Address'];
        iconTypes.forEach((value, index) => {
          primaryProps.icon = value;
          primaryProps.name = nameTypes[index];
          teasers.push({ title: <DecorativeLink {...titleProps} />, primaryInfo: <ContactGroup {...primaryProps} /> });
        });
      };
      // Tests all secondaryInfo combinations.
      const addSecondaryInfoTests = () => {
        const titleProps = {
          info: 'Title info here',
          text: 'Lorem ipsum dolor sit amet',
          href: '#',
          showFileIcon: false
        };
        const secondaryInfo = [];
        const iconTypes = ['marker', 'phone', 'laptop', 'fax'];
        const secondary = {
          iconClasses: array('GeneralTeaser.secondaryInfo.iconClasses', ['ma__general-teaser__secondaryicon']),
          wrapperClasses: array('GeneralTeaser.secondaryInfo.iconClasses', ['ma__decorative-link'])
        };
        // Link props for secondaryInfo.
        const secondaryLink = { ...titleProps };
        secondaryLink.text = 'Secondary Link';
        secondary.link = <Link {...secondaryLink} />;
        iconTypes.forEach((value) => {
          secondary.icon = <Icon name={value} svgWidth={18} svgHeight={18} />;
          secondaryInfo.push(<IconLink {...secondary} />);
        });
        teasers.push({ title: <DecorativeLink {...titleProps} />, secondaryInfo });
      };
      // Generate each GeneralTeaser for backstop.
      const makeTeasers = () => teasers.map((value, index) => {
        const key = `GeneralTeaser.${index}`;
        const backstopProps = { key, ...value };
        return<GeneralTeaser {...backstopProps} />;
      });

      addUrlFileIconTests();
      addSubLinkUrlFileIconTests();
      addPrimaryInfoTests();
      addSecondaryInfoTests();
      return makeTeasers();
    }
    return(
      <GeneralTeaser {...props} />
    );
  }));
