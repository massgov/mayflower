export default {
  startDate: {
    labelText: 'Select a start date',
    placeholder: 'm/dd/yyyy',
    required: false,
    id: 'start-date',
    name: 'start-date',
    restrict: 'max'
  },
  endDate: {
    labelText: 'Select an end date',
    placeholder: 'today',
    required: false,
    id: 'end-date',
    name: 'end-date',
    restrict: 'max'
  }
};
