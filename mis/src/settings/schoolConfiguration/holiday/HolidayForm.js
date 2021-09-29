import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import {
  holidayCreateAction,
  updateSingleHoliadyAction,
} from "./HolidayActions";

const initialFormValues = {
  IDHRHoliday: 0,
  IDHRCompany: 2,
  HolidayName: "",
  Description: "",
  FromDate: "2021-10-08T00:00:00",
  ToDate: "2021-10-15T00:00:00",
  IsActive: false,
  Created_On: "2012-12-12T00:00:00",
  Updated_On: "2015-04-09T14:20:39.947",
};

const HolidayForm = ({ holiday }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.HolidayName = !fieldValues.HolidayName
      ? "This feild is required"
      : fieldValues.HolidayName.length > 20
      ? "Must be less than 20 characters"
      : "";

    temp.Description = fieldValues.Description ? "" : "This feild is required";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (values.IDHRHoliday === 0) {
        dispatch(holidayCreateAction(values));
      } else {
        dispatch(updateSingleHoliadyAction(values));
      }
    }
  };

  useEffect(() => {
    if (holiday) {
      setValues({ ...holiday });
    }
  }, [holiday]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="HolidayName"
            label="Holiday Name"
            value={values.HolidayName}
            onChange={handleInputChange}
            errors={errors.HolidayName}
          />

          <DatePickerControl
            name="FromDate"
            label="FromDate"
            value={values.FromDate}
            onChange={handleInputChange}
            required
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ margin: "10px 0 0 10px" }}
            >
              SUBMIT
            </Button>
          </div>
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="Description"
            label="Description"
            value={values.Description}
            onChange={handleInputChange}
            errors={errors.Description}
          />
          <DatePickerControl
            name="ToDate"
            label="ToDate"
            value={values.ToDate}
            onChange={handleInputChange}
            required
          />
          <CheckBoxControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={handleInputChange}
            // errors={errors.IsTaxApplicable}
            required
          />
        </Grid>
      </Grid>
    </Form>
  );
};

export default HolidayForm;
