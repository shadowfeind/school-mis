import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import {
  employeeTypeCreateAction,
  updateSingleEmployeeTypeAction,
} from "./EmployeeTypeActions";

const initialFormValues = {
  IDHREmployeeType: 0,
  IDHRCompany: 2,
  EmployeeTypeName: "",
  Description: "",
  IsTaxApplicable: false,
  IsActive: false,
  Created_On: "2012-12-12T00:00:00",
  Updated_On: "2015-04-09T14:20:39.947",
};

const EmployeeTypeForm = ({ employeeType }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.EmployeeTypeName = !fieldValues.EmployeeTypeName
      ? "This feild is required"
      : fieldValues.EmployeeTypeName.length > 20
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
      if (values.IDHREmployeeType === 0) {
        dispatch(employeeTypeCreateAction(values));
      } else {
        dispatch(updateSingleEmployeeTypeAction(values));
      }
    }
  };

  useEffect(() => {
    if (employeeType) {
      setValues({ ...employeeType });
    }
  }, [employeeType]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="EmployeeTypeName"
            label="Employee Type Name"
            value={values.EmployeeTypeName}
            onChange={handleInputChange}
            errors={errors.EmployeeTypeName}
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
            name="Description"
            label="Description"
            value={values.Description}
            onChange={handleInputChange}
            errors={errors.Description}
          />
          <CheckBoxControl
            name="IsTaxApplicable"
            label="IsTaxApplicable"
            value={values.IsTaxApplicable}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </Form>
  );
};

export default EmployeeTypeForm;
