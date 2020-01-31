import { create } from '@storybook/theming';
import logo from './mayflower-react-logo.png';

// https://storybook.js.org/docs/configurations/theming/

export default create({
  base: 'light',

  colorSecondary: '#14558F',

  appBg: '#F2F2F2',
  appBorderColor: '#DCDCDC',
  appBorderRadius: 6,

  barTextColor: '#707070',
  barSelectedColor: '#14558F',
  barBg: '#F2F2F2',

  inputBg: 'white',
  inputBorder: '#DCDCDC',
  inputTextColor: '#141414',
  inputBorderRadius: 4,

  brandImage: logo,
  brandTitle: 'Mayflower React',
  brandUrl: 'https://github.com/massgov/mayflower'
});
