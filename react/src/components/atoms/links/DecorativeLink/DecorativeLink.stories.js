import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import DecorativeLink from './index';
import DecorativeLinkDocs from './DecorativeLink.md';
import Icon from 'MayflowerReactBase/Icon';

storiesOf('atoms/links', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'DecorativeLink', (() => {
      const props = {
        info: text('DecorativeLink: info', 'This is a clickable styled link', 'DecorativeLink'),
        text: text('DecorativeLink: text', 'HTML Page as a Link', 'DecorativeLink'),
        href: text('DecorativeLink: href', '#', 'DecorativeLink'),
        showFileIcon: boolean('DecorativeLink: showFileIcon', false, 'DecorativeLink')
      };
      const fileProps = {
        info: text('DecorativeLink as File: info', 'This is a clickable styled link', 'DecorativeLink as File'),
        text: text('DecorativeLink as File: text', 'File as a Link', 'DecorativeLink as File'),
        href: text('DecorativeLink as File: href', 'https://www.mass.gov/test.pdf', 'DecorativeLink as File'),
        showFileIcon: boolean('DecorativeLink as File: showFileIcon', true, 'DecorativeLink as File')
      };
      const fileDlProps = {
        info: text('DecorativeLink as File Dl: info', 'This is a clickable styled link', 'DecorativeLink as File Download'),
        text: text('DecorativeLink as File Dl: text', 'File Download as a Link', 'DecorativeLink as File Download'),
        href: text('DecorativeLink as File Dl: href', 'https://www.mass.gov/test.pdf', 'DecorativeLink as File Download'),
        details: text('DecorativeLink as File Dl: details', '(30 MB)', 'DecorativeLink as File Download'),
        showFileIcon: boolean('DecorativeLink as as File Dl: showFileIcon', true, 'DecorativeLink as File'),
        icon: <Icon name="download" svgWidth={15} svgHeight={15} />
      };
      return(
        <React.Fragment>
          <DecorativeLink {...props} />
          <hr />
          <DecorativeLink {...fileProps} />
          <hr />
          <DecorativeLink {...fileDlProps} />
        </React.Fragment>
      );
    }),
    { info: DecorativeLinkDocs }
  );
