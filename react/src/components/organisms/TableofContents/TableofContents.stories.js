import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';

import TableofContents from '.';
import TableofContentsDocs from './TableofContents.md';
import ColoredHeading from '../../atoms/headings/ColoredHeading';
import SidebarHeading from '../../atoms/headings/SidebarHeading';
import DecorativeLink from '../../atoms/links/DecorativeLink';
import AccordionItem from '../../molecules/AccordionItem';
import Link from '../../molecules/Link';

const getDecorativeLink = (index) => {
  const props = {
    info: text(`TableofContents Child${index}: DecorativeLink info`, 'Title info here', `DecorativeLink${index}`),
    text: text(`TableofContents Child${index}: DecorativeLink text`, 'Lorem ipsum dolor sit amet', `DecorativeLink${index}`),
    href: text(`TableofContents Child${index}: DecorativeLink href`, 'index.pdf', `DecorativeLink${index}`),
    showFileIcon: boolean(`TableofContents Child${index}: DecorativeLink showFileIcon`, true, `DecorativeLink${index}`)
  };
  return<DecorativeLink {...props} />;
};

const getAccordionItem = (index) => {
  const props = {
    title: 'Collapsible Header Two',
    info: 'Collapsible Header Two',
    icon: null,
    border: boolean(`TableofContents Child${index}: AccordionItem border`, false, `AccordionItem${index}`),
    secondary: boolean(`TableofContents Child${index}: AccordionItem secondary`, false, `AccordionItem${index}`),
    emphasize: boolean(`TableofContents Child${index}: AccordionItem emphasize`, true, `AccordionItem${index}`),
    // eslint-disable-next-line radix
    headerLevel: parseInt(select(`TableofContents Child${index}: AccordionItem headerLevel`, {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6'
    }, '2', `AccordionItem${index}`))
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
    text: text('TableofContents ColoredHeading: text', 'Table of Contents', 'ColoredHeading'),
    // eslint-disable-next-line radix
    level: parseInt(select('TableofContents ColoredHeading: level', {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6'
    }, '2', 'ColoredHeading')),
    color: select('TableofContents ColoredHeading: color', {
      '': 'Grey (default)',
      green: 'Green',
      blue: 'Blue'
    }, 'green', 'ColoredHeading')
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
    title: text('TableofContents SidebarHeading: title', 'Key Agencies', 'SidebarHeading'),
    // eslint-disable-next-line radix
    level: parseInt(select('TableofContents SidebarHeading: level', levelOptions, '2', 'SidebarHeading'))
  };
  return<SidebarHeading {...props} />;
};

storiesOf('organisms/TableofContents', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'TableofContents with ColoredHeading', () => {
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
    },
    { info: TableofContentsDocs }
  )
  .add(
    'TableofContents with SidebarHeading', () => {
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
    },
    { info: TableofContentsDocs }
  );
