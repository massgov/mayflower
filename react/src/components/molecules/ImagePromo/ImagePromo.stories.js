import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs';
import rectPlaceholder from '@massds/mayflower-assets/static/images/placeholder/190x107.png';
import sqrPlaceholder from '@massds/mayflower-assets/static/images/placeholder/100x100.png';
import ImagePromo from '.';
import ImagePromoDocs from './ImagePromo.md';
import Icon from 'MayflowerReactBase/Icon';

storiesOf('molecules/ImagePromo', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ImagePromo', (() => {
      const props = {
        title: {
          href: text('ImagePromo: title href', '#', 'Title'),
          text: text('ImagePromo: title text', 'Activity Title', 'Title')
        },
        tags: null,
        stacked: boolean('ImagePromo: stacked', false),
        small: boolean('ImagePromo: small', false),
        image: {
          src: text('ImagePromo: image src', rectPlaceholder, 'Image'),
          alt: text('ImagePromo: image alt', 'placeholder image', 'Image'),
          width: number('ImagePromo: image width', 190, 'Image'),
          height: number('ImagePromo: image height', 107, 'Image')
        },
        subTitle: text('ImagePromo: subTitle', 'subtitle'),
        description: text('ImagePromo: description', 'Explicabo itaque possimus dignissimos? Repudiandae tempore, fugit illum? Iure error omnis eveniet eius iste molestias. Veritatis provident hic voluptate voluptatibus ullam accusantium, obcaecati tempora soluta praesentium accusamus sed dicta sapiente.'),
        link: {
          text: text('ImagePromo: link text', 'Read More', 'Link'),
          href: text('ImagePromo: link href', '#', 'Link'),
          info: text('ImagePromo: link info', 'Read More about Activity Title', 'Link')
        },
        location: null,
        phone: null
      };
      return(<ImagePromo {...props} />);
    }),
    { info: ImagePromoDocs }
  )
  .add(
    'ImagePromo as orgInfo', (() => {
      const props = {
        title: {
          href: text('ImagePromo: title href', '#', 'Title'),
          text: text('ImagePromo: title text', 'Maura Healey', 'Title')
        },
        tags: null,
        stacked: boolean('ImagePromo: stacked', true),
        small: boolean('ImagePromo: small', true),
        image: {
          src: text('ImagePromo: image src', sqrPlaceholder, 'Image'),
          alt: text('ImagePromo: image alt', 'placeholder image', 'Image'),
          width: number('ImagePromo: image width', 100, 'Image'),
          height: number('ImagePromo: image height', 100, 'Image')
        },
        subTitle: text('ImagePromo: subTitle', 'Attorney General'),
        description: text('ImagePromo: description', 'The Attorney General is the chief lawyer and law enforcement officer of the Commonwealth of Massachusetts. In addition, her office is an advocate and resource for the Commonwealth and its residents.'),
        link: {
          text: text('ImagePromo: link text', 'more information', 'Link'),
          href: text('ImagePromo: link href', '#', 'Link'),
          info: text('ImagePromo: link info', 'learn more about Attorney General Maura Healey', 'Link')
        },
        location: null,
        phone: null
      };
      return(<ImagePromo {...props} />);
    }),
    { info: ImagePromoDocs }
  )
  .add(
    'ImagePromo with map link', (() => {
      const props = {
        title: {
          href: text('ImagePromo: title href', '#', 'Title'),
          text: text('ImagePromo: title text', 'Activity Title', 'Title')
        },
        tags: [{
          id: 123,
          label: 'handicapped accessible',
          icon: <Icon name="wheelchair" />
        }, {
          id: 456,
          label: 'open now',
          icon: <Icon name="opennow" />
        }],
        stacked: boolean('ImagePromo: stacked', false),
        small: boolean('ImagePromo: small', false),
        image: {
          src: text('ImagePromo: image src', rectPlaceholder, 'Image'),
          alt: text('ImagePromo: image alt', 'placeholder image', 'Image'),
          width: undefined,
          height: number('ImagePromo: image height', 107, 'Image')
        },
        subTitle: text('ImagePromo: subTitle', 'subtitle'),
        description: text('ImagePromo: description', 'Explicabo itaque possimus dignissimos? Repudiandae tempore, fugit illum? Iure error omnis eveniet eius iste molestias. Veritatis provident hic voluptate voluptatibus ullam accusantium, obcaecati tempora soluta praesentium accusamus sed dicta sapiente.'),
        link: {
          text: text('ImagePromo: link text', 'Directions', 'Link'),
          href: text('ImagePromo: link href', '#', 'Link'),
          info: text('ImagePromo: link info', 'Directions to Activity Title', 'Link')
        },
        location: {
          text: text('ImagePromo: location text', '89 Summer St, Malden, MA 02148', 'Location'),
          map: true
        },
        phone: {
          text: text('ImagePromo: phone text', '(781) 322-7500', 'Phone'),
          href: text('ImagePromo: phone href', '17813227500', 'Phone')
        }
      };

      return(<ImagePromo {...props} />);
    }),
    { info: ImagePromoDocs }
  );
