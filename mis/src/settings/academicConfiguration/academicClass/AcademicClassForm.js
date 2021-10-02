import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import { academicClassCreateAction } from "./AcademicClassActions";

const initialFormValues = {
  IDClass: 0,
  IDHRCompany: 2,
  ClassName: "",
  ClassLocation: null,
  IsActive: false,
  Created_On: "2021-09-23T03:44:16.140Z",
  Updated_On: "2021-09-23T03:44:16.141Z",
};

const AcademicClassForm = ({ academicClass }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.ClassName = !fieldValues.ClassName ? "This feild is required" : "";
    temp.ClassLocation = !fieldValues.ClassLocation
      ? "This feild is required"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      dispatch(academicClassCreateAction(values));
      // if (values.IDClass === 0) {
      //   dispatch(positionCreateAction(values));
      // }
      // else {
      //   dispatch(updateSingleCollegeAction(values));
      // }
    }
  };

  // useEffect(() => {
  //   if (position) {
  //     setValues({ ...position });
  //   }
  // }, [position]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="ClassName"
            label="Class Name"
            value={values.ClassName}
            onChange={handleInputChange}
            errors={errors.ClassName}
          />

          <CheckBoxControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={handleInputChange}
            errors={errors.IsActive}
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
            name="ClassLocation"
            label="Class Location"
            value={values.ClassLocation}
            onChange={handleInputChange}
            errors={errors.ClassLocation}
          />
        </Grid>
      </Grid>
    </Form>
  );
};

export default AcademicClassForm;
