import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const DatePickerControl = ({ name, label, value, onChange, errors = null }) => {
  const converToDefaultEventPara = (name, value) => ({
    target: {
      name,
      value,
      
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        format="dd-MM-yyyy"
        label={label}
        name={name}
        value={value}
        onChange={(date) => {
          onChange(converToDefaultEventPara(name, date));
        }}
        {...(errors && { error: true, helperText: errors })}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerControl;
