/**
 * Option definitions for the InputDate's enumerable properties (imported in stories)
 */
export default {
  restrict: {
    default: '',
    min: 'min',
    max: 'max'
  },
  format: {
    'M/DD/YYYY e.g. 1/31/2017': 'M/DD/YYYY',
    'MM/DD/YYYY e.g. 01/31/2017': 'MM/DD/YYYY',
    'MM-DD-YYYY e.g. 01-31-2017': 'MM-DD-YYYY',
    'YYYYMMDD e.g. 20170131': 'YYYYMMDD'
  }
};
