import { TextField } from "@material-ui/core";
import React from "react";

const DatePickerControl = ({ name, label, value, onChange }) => {
  const converToDefaultEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    // <TextField
    //   id="date"
    //   label={label}
    //   type="date"
    //   name={name}
    //   defaultValue={value}
    //   InputLabelProps={{
    //     shrink: true,
    //   }}
    //   onChange={(date) => onChange(converToDefaultEventPara(name, date))}
    // />
    <TextField
      id="datetime-local"
      name={name}
      label={label}
      type="datetime-local"
      defaultValue={value}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(date) => {
        const newDate = new Date(date.timeStamp);
        console.log(newDate);

        // onChange(converToDefaultEventPara(name, newDate));
      }}
    />
  );
};

export default DatePickerControl;
