import { action } from '@storybook/addon-actions';

/**
 * Option definitions for the Pagination's enumerable properties (imported in stories)
 */
export default {
  pages: [{
    active: false,
    text: '1',
    onClick: action('1 Link clicked.'),
    ariaLabel: 'Go to Search Results Page 1'
  }, {
    active: true,
    text: 'spacer',
    onClick: undefined
  }, {
    active: false,
    text: '3',
    onClick: action('3 Link clicked.'),
    ariaLabel: 'Go to Search Results Page 3'
  }, {
    active: true,
    text: '4',
    onClick: action('4 Link clicked.'),
    ariaLabel: 'Go to Search Results Page 4'
  }, {
    active: false,
    text: '5',
    onClick: action('5 Link clicked.'),
    ariaLabel: 'Go to Search Results Page 5'
  }, {
    active: false,
    text: 'spacer',
    onClick: undefined
  }, {
    active: false,
    text: '10',
    onClick: action('10 Link clicked.'),
    ariaLabel: 'Go to Search Results Page 10'
  }]
};
