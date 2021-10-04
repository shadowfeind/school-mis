import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import {
  academicClassCreateAction,
  updateSingleAcademicClassAction,
} from "./AcademicClassActions";

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
    temp.ClassName = !fieldValues.ClassName
      ? "This feild is required"
      : fieldValues.ClassName.length > 20
      ? "Must be less than 21 characters"
      : "";
    temp.ClassLocation =
      fieldValues.ClassLocation && fieldValues.ClassLocation.length > 200
        ? "Must be less than 501 characters"
        : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (values.IDClass === 0) {
        dispatch(academicClassCreateAction(values));
      } else {
        dispatch(updateSingleAcademicClassAction(values));
      }
    }
  };

  useEffect(() => {
    if (academicClass) {
      setValues({ ...academicClass });
    }
  }, [academicClass]);
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
