import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import {
  AcademicProgramCreateAction,
  updateSingleAcademicProgramAction,
} from "./AcademicProgramActions";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const initialFormValues = {
  IDAcademicProgram: 0,
  IDHRCompany: 2,
  AcademicProgramName: "",
  Description: "",
  IsActive: true,
  Created_On: "2021-09-23",
  Updated_On: "2021-09-23",
};

const AcademicProgramForm = ({ academicProgram, selected, setOpenPopup }) => {
  const [checkboxState, setCheckboxState] = useState([]);
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.AcademicProgramName = !fieldValues.AcademicProgramName
      ? "This feild is required"
      : !fieldValues.AcademicProgramName.trim()
      ? "This feild is required"
      : fieldValues.AcademicProgramName.length > 100
      ? "Must be less than 101 characters"
      : "";

    temp.Description = !fieldValues.Description
      ? "This feild is required"
      : !fieldValues.Description.trim()
      ? "This feild is required"
      : fieldValues.Description.length > 1000
      ? "Must be less than 1000 characters"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (values.IDAcademicProgram === 0) {
        dispatch(AcademicProgramCreateAction(values, checkboxState));
      } else {
        dispatch(updateSingleAcademicProgramAction(values));
      }
    }
  };

  const { academicProgramOption } = useSelector(
    (state) => state.getAcademicProgramOption
  );

  const { available } = academicProgramOption;

  const handleChangeCheckbox = (e) => {
    setCheckboxState([...checkboxState, e.target.value]);
  };

  useEffect(() => {
    if (academicProgram) {
      setValues({ ...academicProgram });
    }
  }, [academicProgram]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="AcademicProgramName"
            label="Academic Program Name*"
            onFocus={e => {
      e.target.select();
    }}
            value={values.AcademicProgramName}
            onChange={handleInputChange}
            errors={errors.AcademicProgramName}
          />
          <InputControl
            name="Description"
            label="Description*"
            onFocus={e => {
      e.target.select();
    }}
            value={values.Description}
            onChange={handleInputChange}
            errors={errors.Description}
          />
          <CheckBoxControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={handleInputChange}
            errors={errors.IsActive}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">School Board:</FormLabel>
            <FormGroup>
              {selected
                ? selected.map((item) => <p> {item.Name}</p>)
                : available.map((item) => (
                    <FormControlLabel
                      key={item.$id}
                      control={
                        <Checkbox
                          onChange={handleChangeCheckbox}
                          value={item.Id}
                        />
                      }
                      label={item.Name}
                    />
                  ))}
            </FormGroup>
          </FormControl>
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

export default AcademicProgramForm;
