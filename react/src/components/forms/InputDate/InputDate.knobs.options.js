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
    'M/DD/YYYY e.g. 1/31/2017': 'M/dd/yyyy',
    'MM/DD/YYYY e.g. 01/31/2017': 'MM/dd/yyyy',
    'MM-DD-YYYY e.g. 01-31-2017': 'MM-dd-yyyy',
    'YYYYMMDD e.g. 20170131': 'yyyyMMdd'
  }
};
