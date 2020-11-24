import React from 'react';
import Image from '@massds/mayflower-react/dist/Image';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import logoColor from '@massds/mayflower-assets/static/images/logo/stateseal-color.png';
import logoBlack from '@massds/mayflower-assets/static/images/logo/stateseal-white.png';
import logoWhite from '@massds/mayflower-assets/static/images/logo/stateseal-black.png';
import generateTitle from '../../util/generateTitle';

const { STORYBOOK_CDN_PATH } = process.env;

const darkBackground = (story) => {
  return story.parameters = {
    backgrounds: {
        default: 'dark',
        values: [
          { name: 'light', value: '#eeeeee' },
          { name: 'dark', value: '#222222' },
        ],
    }
  }
}

const stateSeal = (
  <Image
    alt="the Massachusetts state seal"
    src={logo}
    width={150}
    height={150}
  />
)

const stateSealColor = (
  <Image
    alt="the Massachusetts state seal"
    src={logo}
    width={150}
    height={150}
  />
)

// exported story names must be unique
export const seal = () => stateSeal;
darkBackground(seal)


export const sealColor = () => stateSealColor;
darkBackground(sealColor)
