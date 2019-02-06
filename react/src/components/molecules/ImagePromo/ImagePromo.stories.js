import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs/react';

import ImagePromo from '.';
import ImagePromoDocs from './ImagePromo.md';
import Icon from '../../atoms/icons/Icon';

const getCommonPropsWithKnobs = () => ({
  title: {
    href: text('ImagePromo.title.href', '#'),
    text: text('ImagePromo.title.text', 'Activity Title')
  },
  tags: null,
  stacked: boolean('ImagePromo.stacked', false),
  small: boolean('ImagePromo.small', false),
  image: {
    src: text('ImagePromo.image.src', 'https://mayflower.digital.mass.gov/assets/images/placeholder/190x107.png'),
    alt: text('ImagePromo.image.alt', 'placeholder image'),
    width: number('ImagePromo.image.width', 190),
    height: number('ImagePromo.image.height', 107)
  },
  subTitle: text('ImagePromo.subTitle', 'subtitle'),
  description: text('ImagePromo.description', 'Explicabo itaque possimus dignissimos? Repudiandae tempore, fugit illum? Iure error omnis eveniet eius iste molestias. Veritatis provident hic voluptate voluptatibus ullam accusantium, obcaecati tempora soluta praesentium accusamus sed dicta sapiente.'),
  link: {
    text: text('ImagePromo.link.text', 'Read More'),
    href: text('ImagePromo.link.href', '#'),
    info: text('ImagePromo.link.info', 'Read More about Activity Title')
  },
  location: null,
  phone: null
});

storiesOf('molecules/ImagePromo', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('ImagePromo', (() => {
    const props = getCommonPropsWithKnobs();

    return(<ImagePromo {...props} />);
  }))
  .add(
    'ImagePromo as orgInfo', withInfo(`<div>${ImagePromoDocs}</div>`)(() => {
    // Override some props/knobs for "with map link" variation example.
      const commonProps = getCommonPropsWithKnobs();
      const props = Object.assign(commonProps, {
        title: {
          href: text('ImagePromo.title.href', '#'),
          text: text('ImagePromo.title.text', 'Maura Healey')
        },
        image: {
          src: text('ImagePromo.image.src', 'https://mayflower.digital.mass.gov/assets/images/placeholder/100x100.png'),
          alt: text('ImagePromo.image.alt', 'placeholder image'),
          width: number('ImagePromo.image.width', 100),
          height: number('ImagePromo.image.height', 100)
        },
        stacked: boolean('ImagePromo.stacked', true),
        small: boolean('ImagePromo.small', true),
        subTitle: text('ImagePromo.subTitle', 'Attorney General'),
        description: text('ImagePromo.description', 'The Attorney General is the chief lawyer and law enforcement officer of the Commonwealth of Massachusetts. In addition, her office is an advocate and resource for the Commonwealth and its residents.'),
        link: {
          text: text('ImagePromo.link.text', 'more information'),
          href: text('ImagePromo.link.href', '#'),
          info: text('ImagePromo.link.info', 'learn more about Attorney General Maura Healey')
        }
      });
      return(<ImagePromo {...props} />);
    }),
    { info: ImagePromoDocs }
  )
  .add(
    'ImagePromo with map link', (() => {
    // Override some props/knobs for "with map link" variation example.
      const commonProps = getCommonPropsWithKnobs();
      const props = Object.assign(commonProps, {
        tags: [{
          id: 123,
          label: 'handicapped accessible',
          icon: <Icon name="wheelchair" />
        }, {
          id: 456,
          label: 'open now',
          icon: <Icon name="opennow" />
        }],
        image: {
          ...commonProps.image,
          width: undefined
        },
        link: {
          text: text('ImagePromo.link.text', 'Directions'),
          href: text('ImagePromo.link.href', '#'),
          info: text('ImagePromo.link.info', 'Directions to Activity Title')
        },
        location: {
          text: text('ImagePromo.location.text', '89 Summer St, Malden, MA 02148'),
          map: true
        },
        phone: {
          text: text('ImagePromo.phone.text', '(781) 322-7500'),
          href: text('ImagePromo.phone.href', '17813227500')
        }
      });

      return(<ImagePromo {...props} />);
    }),
    { info: ImagePromoDocs }
  );
