import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const DatePickerControl = ({ name, label, value, onChange }) => {
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
        label={label}
        name={name}
        value={value}
        onChange={(date) => {
          console.log(typeof date.toISOString());
          onChange(converToDefaultEventPara(name, date));
        }}
      />
    </MuiPickersUtilsProvider>
    // <TextField
    //   id="date"
    //   label={label}
    //   type="date"
    //   name={name}
    //   defaultValue={value}
    //   InputLabelProps={{
    //     shrink: true,
    //   }}
    //   onChange={(date) => {
    //     console.log(date);
    //     const newDate = new Date(date.timeStamp * 1000).toISOString();
    //     console.log(newDate);
    //     onChange(converToDefaultEventPara(name, newDate));
    //   }}
    // />
    // <TextField
    //   name={name}
    //   label={label}
    //   type="datetime-local"
    //   defaultValue={value}
    //   InputLabelProps={{
    //     shrink: true,
    //   }}
    //   onChange={(date) => {
    //     const changedDate = date.timeStamp * 1000;
    //     const newDate = new Date(changedDate).toISOString();
    //     console.log(newDate);
    //     console.log(changedDate);
    //     console.log(date);
    //     console.log(new Date(1632904900).toISOString());
    //     onChange(converToDefaultEventPara(name, newDate));
    //   }}
    // />
  );
};

export default DatePickerControl;
