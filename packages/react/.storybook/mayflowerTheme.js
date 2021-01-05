import { create } from '@storybook/theming/create';
import logo from './mayflower-react-logo.png';
export default create({
  base: 'light',

	colorPrimary: '#388557',
  colorSecondary: '#14558F',

  // UI
  appBg: '#F2F2F2',
	appContentBg: '#FFFFFF',
  appBorderColor: '#DCDCDC',
  appBorderRadius: 0,

  // Typography
  fontBase: '"Noto Sans VF", "Noto Sans", "Helvetica", "Arial", sans-serif',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#707070',
  barSelectedColor: '#14558F',
  barBg: '#F2F2F2',

  // Form colors
  inputBg: 'white',
  inputBorder: '#DCDCDC',
  inputTextColor: '#141414',
  inputBorderRadius: 4,

  brandTitle: `Mayflower React Component Library`,
  brandUrl: 'https://mayflower.digital.mass.gov',
  brandImage: logo,
});
