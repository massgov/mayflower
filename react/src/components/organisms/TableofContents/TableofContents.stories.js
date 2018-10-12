import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/react';

import TableofContents from '.';
import { ColoredHeading, SidebarHeading, DecorativeLink, AccordionItem, Link, Icon } from '../../../index';

const getDecorativeLink = (index) => {
  const props = {
    info: text(`TableofContents.Children.${index}.DecorativeLink.info`, 'Title info here'),
    text: text(`TableofContents.Children.${index}.DecorativeLink.text`, 'Lorem ipsum dolor sit amet'),
    href: text(`TableofContents.Children.${index}.DecorativeLink.href`, 'index.pdf'),
    showFileIcon: boolean(`TableofContents.Children.${index}.DecorativeLink.showFileIcon`, true)
  };
  return<DecorativeLink {...props} />;
};

const getIcon = (iconProps) => <Icon {...iconProps} />;

const getAccordionItem = (name = 'laptop', index) => {
  const props = {
    title: 'Collapsible Header Two',
    info: 'Collapsible Header Two',
    icon: getIcon({ name }),
    border: boolean(`TableofContents.Children.${index}.AccordionItem.border`, false),
    secondary: boolean(`TableofContents.Children.${index}.AccordionItem.secondary`, false),
    emphasize: boolean(`TableofContents.Children.${index}.AccordionItem.emphasize`, true),
    headerLevel: parseInt(select(`TableofContents.Children.${index}.AccordionItem.headerLevel`, {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6'
    }, '2'))
  };
  return<AccordionItem {...props}>{getLink()}</AccordionItem>;
};

const getLink = (sampleText = 'Sample Link') => {
  const linkProps = {
    sampleText,
    href: 'http://www.mass.gov/'
  };
  return<Link {...linkProps} />;
};

const getColoredHeading = () => {
  const props = {
    text: text('TableofContents.ColoredHeading.text', 'Table of Contents'),
    level: parseInt(select('TableofContents.ColoredHeading.level', {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6'
    }, '2')),
    color: select('TableofContents.ColoredHeading.color', {
      '': 'Grey (default)',
      green: 'Green',
      blue: 'Blue'
    }, 'green')
  };
  return<ColoredHeading {...props} />;
};

const getSidebarHeading = () => {
  const levelOptions = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6'
  };
  const props = {
    title: text('TableofContents.SidebarHeading.title', 'Key Agencies'),
    level: parseInt(select('TableofContents.SidebarHeading.level', levelOptions, '2'))
  };
  return<SidebarHeading {...props} />;
};

storiesOf('organisms', module).addDecorator(withKnobs)
  .add(
    'TableofContents: ColoredHeading',
    withInfo()(() => {
      const props = {
        heading: getColoredHeading()
      };
      return(
        <TableofContents {...props}>
          {getDecorativeLink(0)}
          {getAccordionItem('phone', 1)}
          {getAccordionItem('phone', 2)}
          {getDecorativeLink(3)}
        </TableofContents>
      );
    })
  )
  .add(
    'TableofContents: SidebarHeading',
    withInfo()(() => {
      const props = {
        heading: getSidebarHeading()
      };
      return(
        <TableofContents {...props}>
          {getDecorativeLink(0)}
          {getAccordionItem('phone', 1)}
          {getAccordionItem('phone', 2)}
          {getDecorativeLink(3)}
        </TableofContents>
      );
    })
  );
