import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import { svgOptions } from 'MayflowerReactBase/Icon/Icon.knob.options';
import * as Icon from 'MayflowerReactBase/Icon';
import ButtonWithIcon from '.';
import ButtonWithIconDocs from './ButtonWithIcon.md';
import buttonWithIconOptions from './ButtonWithIcon.knobs.options';

export default {
  title: 'atoms/buttons/ButtonWithIcon',
  component: ButtonWithIcon,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ButtonWithIconDocs} />
    }
  }
};

export const ButtonWithIconExample = (args) => {
  const {
    name, width, height, ...rest
  } = args;
  const IconComponent = Icon[name];
  return(<ButtonWithIcon {...rest} icon={<IconComponent width={width} height={height} />} />);
};
ButtonWithIconExample.storyName = 'Default';
ButtonWithIconExample.args = {
  onClick: action('ButtonWithIcon clicked'),
  text: 'Button With Icon',
  type: 'submit',
  classes: [],
  iconSize: '',
  size: '',
  expanded: true,
  capitalized: true,
  'arial-label': '',
  'aria-haspopup': false,
  name: 'IconChevron',
  width: 20,
  height: 20
};
ButtonWithIconExample.argTypes = {
  icon: {
    control: {
      disable: true
    }
  },
  type: {
    control: {
      type: 'select',
      options: buttonWithIconOptions.type
    }
  },
  iconSize: {
    control: {
      type: 'select',
      options: buttonWithIconOptions.iconSize
    }
  },
  size: {
    control: {
      type: 'select',
      options: buttonWithIconOptions.size
    }
  },
  theme: {
    control: {
      type: 'select',
      options: buttonWithIconOptions.theme
    }
  },
  usage: {
    control: {
      type: 'select',
      options: buttonWithIconOptions.usage
    }
  },
  name: {
    control: {
      type: 'select',
      options: Object.fromEntries(
        Object.entries(svgOptions).map(([key, value]) => [`Icon${key[0].toUpperCase() + key.slice(1)}`, value ? `Icon${value[0].toUpperCase() + value.slice(1)}` : value])
      )
    }
  }
};

export const ButtonSearch = (args) => {
  const {
    name, width, height, ...rest
  } = args;
  const IconComponent = Icon[name];

  return(
    <ButtonWithIcon {...rest} icon={<IconComponent width={width} height={height} />} />
  );
};
ButtonSearch.storyName = 'ButtonSearch';
ButtonSearch.args = {
  onClick: action('ButtonWithIcon clicked'),
  usage: '',
  name: 'IconChevron',
  width: 20,
  height: 20
};
ButtonSearch.argTypes = {
  usage: {
    control: {
      type: 'select',
      options: buttonWithIconOptions.usage
    }
  },
  name: {
    control: {
      type: 'select',
      options: {
        IconChevron: 'IconChevron',
        IconSearch: 'IconSearch'
      }
    }
  }
};