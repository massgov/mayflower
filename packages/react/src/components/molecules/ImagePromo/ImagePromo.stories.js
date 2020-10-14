import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import rectPlaceholder from '@massds/mayflower-assets/static/images/placeholder/190x107.png';
import sqrPlaceholder from '@massds/mayflower-assets/static/images/placeholder/100x100.png';
import IconWheelchair from 'MayflowerReactBase/Icon/IconWheelchair';
import IconOpennow from 'MayflowerReactBase/Icon/IconOpennow';
import ImagePromo from '.';
import ImagePromoDocs from './ImagePromo.md';


const Template = (args) => <ImagePromo {...args} />;
export const ImagePromoExample = Template.bind({});
ImagePromoExample.storyName = 'Default';
ImagePromoExample.args = {
  title: {
    href: '#',
    text: 'Activity Title'
  },
  tags: null,
  stacked: false,
  small: false,
  image: {
    src: rectPlaceholder,
    alt: 'placeholder image',
    width: 190,
    height: 107
  },
  subTitle: 'subtitle',
  description: 'Explicabo itaque possimus dignissimos? Repudiandae tempore, fugit illum? Iure error omnis eveniet eius iste molestias. Veritatis provident hic voluptate voluptatibus ullam accusantium, obcaecati tempora soluta praesentium accusamus sed dicta sapiente.',
  link: {
    text: 'Read More',
    href: '#',
    info: 'Read More about Activity Title'
  },
  location: null,
  phone: null
};

export const ImagePromoOrgInfo = Template.bind({});
ImagePromoOrgInfo.storyName = 'ImagePromo as orgInfo';
ImagePromoOrgInfo.args = {
  title: {
    href: '#',
    text: 'Maura Healey'
  },
  tags: null,
  stacked: true,
  small: true,
  image: {
    src: sqrPlaceholder,
    alt: 'placeholder image',
    width: 100,
    height: 100
  },
  subTitle: 'Attorney General',
  description: 'The Attorney General is the chief lawyer and law enforcement officer of the Commonwealth of Massachusetts. In addition, her office is an advocate and resource for the Commonwealth and its residents.',
  link: {
    text: 'more information',
    href: '#',
    info: 'learn more about Attorney General Maura Healey'
  },
  location: null,
  phone: null
};

export const ImagePromoMapLink = Template.bind({});
ImagePromoMapLink.storyName = 'ImagePromo with map link';
ImagePromoMapLink.args = {
  title: {
    href: '#',
    text: 'Activity Title'
  },
  tags: [{
    id: 123,
    label: 'handicapped accessible',
    icon: <IconWheelchair />
  }, {
    id: 456,
    label: 'open now',
    icon: <IconOpennow />
  }],
  stacked: false,
  small: false,
  image: {
    src: rectPlaceholder,
    alt: 'placeholder image',
    width: undefined,
    height: 107
  },
  subTitle: 'subtitle',
  description: 'Explicabo itaque possimus dignissimos? Repudiandae tempore, fugit illum? Iure error omnis eveniet eius iste molestias. Veritatis provident hic voluptate voluptatibus ullam accusantium, obcaecati tempora soluta praesentium accusamus sed dicta sapiente.',
  link: {
    text: 'Directions',
    href: '#',
    info: 'Directions to Activity Title'
  },
  location: {
    text: '89 Summer St, Malden, MA 02148',
    map: true
  },
  phone: {
    text: '(781) 322-7500',
    href: '17813227500'
  }
};
export default {
  title: 'molecules/ImagePromo',
  component: ImagePromo,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ImagePromoDocs} />
    }
  }
};
