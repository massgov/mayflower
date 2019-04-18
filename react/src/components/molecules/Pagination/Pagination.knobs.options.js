import { action } from '@storybook/addon-actions';

/**
 * Option definitions for the Pagination's enumerable properties (imported in stories)
 */
export default {
  pages: [{
    active: false,
    text: '1',
    onClick: action('1 Link clicked.')
  }, {
    active: true,
    text: 'spacer',
    onClick: undefined
  }, {
    active: false,
    text: '3',
    onClick: action('3 Link clicked.')
  }, {
    active: true,
    text: '4',
    onClick: action('4 Link clicked.')
  }, {
    active: false,
    text: '5',
    onClick: action('5 Link clicked.')
  }, {
    active: false,
    text: 'spacer',
    onClick: undefined
  }, {
    active: false,
    text: '10',
    onClick: action('10 Link clicked.')
  }]
};
