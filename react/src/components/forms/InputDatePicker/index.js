import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import classnames from 'classnames';

const InputDatePicker = ({ required }) => {
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const inputClasses = classnames('ma__input-date js-input-date', {
    'js-is-required': required
  });
  const inputProps = {
    className: inputClasses
  };
  return(
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        autoOk
        disableToolbar
        label="Select a date:"
        variant="inline"
        format="M/DD/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        inputProps={inputProps}
      />
    </MuiPickersUtilsProvider>
  );
};

export default InputDatePicker;