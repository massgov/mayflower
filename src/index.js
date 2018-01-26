/*
  Since we are package a library of UI components, export each component here
  @see https://github.com/insin/nwb/blob/master/docs/guides/ReactComponents.md#libraries
*/

// base / helpers
export { SocialIcon } from './components/SocialIcon';

// @atoms
export SiteLogo from './components/atoms/media/site-logo/SiteLogo';
export SvgSearch from './components/atoms/icons/SvgSearch';
export CompHeading from './components/atoms/headings/comp-heading/CompHeading';

// @molecules
export { FooterLinks } from './components/molecules/FooterLinks';
export { SocialLinks } from './components/molecules/SocialLinks';

// @organisms
export { Footer } from './components/organisms/Footer';
