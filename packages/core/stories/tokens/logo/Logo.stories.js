import React from 'react';
import Image from '@massds/mayflower-react/dist/Image';
import logoSVG from '@massds/mayflower-assets/static/images/logo/stateseal.svg';
import logoColorSVG from '@massds/mayflower-assets/static/images/logo/stateseal-color.svg';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import logoColor from '@massds/mayflower-assets/static/images/logo/stateseal-color.png';
import logoBlack from '@massds/mayflower-assets/static/images/logo/stateseal-black.png';
import logoWhite from '@massds/mayflower-assets/static/images/logo/stateseal-white.png';
import generateTitle from '../../util/generateTitle';

const { STORYBOOK_CDN_PATH } = process.env;

const stateSeal = ({ src, dimension, background }) => (
  <div style={{ background: background || 'none', padding: '5px', lineHeight: 0 }}>
    <Image
      alt="the Massachusetts state seal"
      src={src}
      width={dimension}
      height={dimension}
    />
  </div>
);

const bgLight = { background: '#F2F2F2' };
const bgLight1 = { background: '#E7EEF4' };
const bgDark = { background: '#141414' };
const bgDark1 = { background: '#14558F' };
const bgDark2 = { background: '#388557' };

// exported story names must be unique
export const sealExample = () => stateSeal({ src: logoSVG, dimension: '150px' });
export const sealColorExample = () => stateSeal({ src: logoColorSVG, dimension: '150px' });

export const seal = () => stateSeal({ src: logo, dimension: '100px' });
export const sealBGLight = () => stateSeal({ src: logo, dimension: '100px', ...bgLight });
export const sealBGLight1 = () => stateSeal({ src: logo, dimension: '100px', ...bgLight1 });

export const sealColor = () => stateSeal({ src: logoColor, dimension: '100px' });
export const sealColorBGLight = () => stateSeal({ src: logoColor, dimension: '100px', ...bgLight1 });
export const sealColorBGDark = () => stateSeal({ src: logoColor, dimension: '100px', ...bgDark1 });

export const sealBlack = () => stateSeal({ src: logoBlack, dimension: '100px' });
export const sealBlackBGLight = () => stateSeal({ src: logoBlack, dimension: '100px', ...bgLight });
export const sealBlackBGLight1 = () => stateSeal({ src: logoBlack, dimension: '100px', ...bgLight1 });

export const sealWhiteBGDark = () => stateSeal({ src: logoWhite, dimension: '100px', ...bgDark });
export const sealWhiteBGDark1 = () => stateSeal({ src: logoWhite, dimension: '100px', ...bgDark1 });
export const sealWhiteBGDark2 = () => stateSeal({ src: logoWhite, dimension: '100px', ...bgDark2 });
