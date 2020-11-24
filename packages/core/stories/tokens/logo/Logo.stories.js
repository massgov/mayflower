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
  <div style={{ background: background || 'none', padding: '5px' }}>
    <Image
      alt="the Massachusetts state seal"
      src={src}
      width={dimension}
      height={dimension}
    />
  </div>
)

// exported story names must be unique
export const sealExample = () => stateSeal({ src: logoSVG, dimension: '150px' });
export const sealColorExample = () => stateSeal({ src: logoColorSVG, dimension: '150px' });
export const seal = () => stateSeal({ src: logo, dimension: '100px' });
export const sealColor = () => stateSeal({ src: logoColor, dimension: '100px' });
export const sealBlack = () => stateSeal({ src: logoBlack, dimension: '100px' });
export const sealWhite = () => stateSeal({ src: logoWhite, dimension: '100px', background: '#000' });
