import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import { svgOptions } from 'MayflowerReactBase/Icon/Icon.knob.options';
import * as Icon from 'MayflowerReactBase/Icon';
import Link from 'MayflowerReactMolecules/Link';
import IconLink from '.';

export const IconLinkExample = (args) => {
  const {
    iconWidth, iconHeight, icon, ...rest
  } = args;
  const props = {
    ...rest
  };
  if (icon) {
    const SelectedComponent = Icon[icon];
    props.icon = <SelectedComponent width={iconWidth} height={iconHeight} />;
  }

  return<IconLink {...props} />;
};

IconLinkExample.storyName = 'Default';
IconLinkExample.args = {
  wrapperClasses: [''],
  link: (
    <Link
      info="Title info here"
      text="Lorem ipsum dolor sit amet"
      href="#"
    />
  ),
  iconWidth: 13,
  iconHeight: 13
};
IconLinkExample.argTypes = {
  link: {
    control: {
      disable: true
    }
  },
  icon: {
    control: {
      type: 'select',
      options: Object.fromEntries(
        Object.entries(svgOptions).map(([key, value]) => [`Icon${key[0].toUpperCase() + key.slice(1)}`, value ? `Icon${value[0].toUpperCase() + value.slice(1)}` : value])
      )
    }
  },
  iconWidth: {
    control: {
      type: 'number'
    }
  },
  iconHeight: {
    control: {
      type: 'number'
    }
  }
};

export default {
  title: 'molecules/IconLink',
  component: IconLink,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
