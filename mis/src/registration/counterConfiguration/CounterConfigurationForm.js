import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import SelectControl from "../../components/controls/SelectControl";
import {
  counterConfigCreateAction,
  counterConfigEditAction,
} from "./CounterConfigurationActions";

const initialFormValues = {
  IDCounter: 0,
  IDHRCompany: 0,
  CounterYear: 0,
  CurrentCount: 0,
  Status: "Open",
  CounterFor: "Inquiry",
  Prefix: "",
  Middle: "",
  IDYearFacultyLink: 0,
  Created_On: "2021-12-29T07:11:25.723Z",
  Updated_On: "2021-12-29T07:11:25.723Z",
};

const CounterConfigurationForm = ({
  counterFor,
  counterStatus,
  setOpenPopup,
  getAcademicConfigInitialDataForEdit,
}) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.CounterYear = !fieldValues.CounterYear
      ? "This feild is required"
      : fieldValues.CounterYear === null
      ? "This feild is required"
      : "";
    temp.Prefix = !fieldValues.Prefix
      ? "This feild is required"
      : !fieldValues.Prefix.trim()
      ? "This feild is required"
      : fieldValues.Prefix.length > 1
      ? "Enter only one character"
      : "";
    temp.CurrentCount = !fieldValues.CurrentCount
      ? "This feild is required"
      : fieldValues.CurrentCount === null
      ? "This feild is required"
      : "";
    temp.Middle = !fieldValues.Middle
      ? "This feild is required"
      : !fieldValues.Middle.trim()
      ? "This feild is required"
      : fieldValues.Middle.length > 1
      ? "Enter only one character"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  useEffect(() => {
    if (getAcademicConfigInitialDataForEdit) {
      setValues(getAcademicConfigInitialDataForEdit.dbModel);
    }
  }, [getAcademicConfigInitialDataForEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (values.IDCounter === 0) {
        dispatch(counterConfigCreateAction(values));
      } else {
        dispatch(counterConfigEditAction(values));
      }
    }
  };

  const testValue = [{ Key: "", Value: "" }];

  const symbolsArr = ["e", "E", "+", "-", "."];

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="CounterYear"
            label="Counter Year"
            value={values.CounterYear}
            type="number"
            variant="outlined"
            onFocus={e => {
      e.target.select();
    }}
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            errors={errors.CounterYear}
            onChange={handleInputChange}
          />

          <InputControl
            name="Prefix"
            label="Prefix"
            value={values.Prefix}
            onFocus={e => {
      e.target.select();
    }}
            variant="outlined"
            errors={errors.Prefix}
            onChange={handleInputChange}
          />
          <InputControl
            name="CurrentCount"
            label="Current Count"
            value={values.CurrentCount}
            onFocus={e => {
      e.target.select();
    }}
            type="number"
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            variant="outlined"
            errors={errors.CurrentCount}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectControl
            name="CounterFor"
            label="Counter For"
            value={values.CounterFor}
            onChange={handleInputChange}
            options={
              counterFor
                ? counterFor
                : getAcademicConfigInitialDataForEdit
                ? getAcademicConfigInitialDataForEdit.ddlCounterFor
                : testValue
            }
          />
          <InputControl
            name="Middle"
            label="Middle"
            value={values.Middle}
            onFocus={e => {
      e.target.select();
    }}
            variant="outlined"
            onChange={handleInputChange}
            errors={errors.Middle}
          />

          <SelectControl
            name="Status"
            label="Status"
            value={values.Status}
            onChange={handleInputChange}
            options={
              counterStatus
                ? counterStatus
                : getAcademicConfigInitialDataForEdit
                ? getAcademicConfigInitialDataForEdit.ddlCounterStatus
                : testValue
            }
          />
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingTop: "10px",
          marginTop: "10px",
          borderTop: "1px solid #f3f3f3",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenPopup(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ margin: "10px 0 0 10px" }}
        >
          SUBMIT
        </Button>
      </div>
    </Form>
  );
};

export default CounterConfigurationForm;
