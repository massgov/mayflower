import React from 'react';
import DecorativeLink from '../../atoms/links/DecorativeLink';
import Link from '../../molecules/Link';
import Icon from '../../base/Icon';
import IconLink from '../../molecules/IconLink';
import OperationalHours from '../../atoms/contact/OperationalHours';

const getLink = (text = 'Sample Link') => {
  const linkProps = {
    text,
    href: 'http://www.mass.gov/'
  };
  return<Link {...linkProps} />;
};

const getDecorativeLink = () => {
  const props = {
    info: 'Title info here',
    text: 'Lorem ipsum dolor sit amet',
    href: '#',
    showFileIcon: false
  };
  return<DecorativeLink {...props} />;
};

const getContactGroupItems = () => {
  const items = [];
  const types = ['phone', 'online', 'email', 'address'];
  for (let i = 0; i < 5; i += 1) {
    // ContactGroup items array.
    const primaryItem = {
      type: types[i],
      label: `Primary Info Label ${i}:`,
      address: '123 Imaginary Lane',
      link: { href: 'http://www.mass.gov/', text: `PrimaryInfo Item Link ${i}` },
      details: `Primary Info details ${i}`
    };
    items.push(primaryItem);
  }
  return items;
};

const getContactGroup = () => {
  const props = {
    icon: 'SvgMarker',
    name: 'Address',
    text: 'Sample Contact Group',
    level: 1,
    items: getContactGroupItems()
  };
  return<ContactGroup {...props} />;
};

const getIcon = (name) => {
  const props = {
    name,
    svgWidth: 13,
    svgHeight: 13,
    title: 'Icon Title Here',
    classes: ['ma__general-teaser__secondaryicon']
  };
  return<Icon {...props} />;
};

const getIconLink = () => {
  const props = {
    link: getLink(),
    icon: getIcon('phone')
  };
  return<IconLink {...props} />;
};

const getOperationalHours = () => {
  const start = new Date('March 15, 2002 03:00:00');
  const end = new Date('March 15, 2002 18:00:00');
  const hours = {
    monday: {
      status: true,
      start,
      end
    },
    tuesday: {
      status: true,
      start,
      end
    },
    wednesday: {
      status: true,
      start,
      end
    },
    thursday: {
      status: true,
      start,
      end
    },
    friday: {
      status: true,
      start,
      end
    },
    saturday: {
      status: true,
      start,
      end
    },
    sunday: {
      status: true,
      start,
      end
    }
  };
  const props = {
    hours,
    listKey: 'demo',
    currentDay: 'friday'
  };
  return<OperationalHours {...props} />;
};

export default {
  getLink,
  getDecorativeLink,
  getContactGroup,
  getIcon,
  getIconLink,
  getOperationalHours,
  leftSideProps: () => {
    const left = [];
    for (let i = 0; i < 3; i += 1) {
      left.push(getLink());
    }
    left.push(getContactGroup());
    return left;
  },
  rightSideProps: () => {
    const right = [];
    right.push(getDecorativeLink());
    right.push(getIconLink());
    right.push(getOperationalHours());
    return right;
  }
};
