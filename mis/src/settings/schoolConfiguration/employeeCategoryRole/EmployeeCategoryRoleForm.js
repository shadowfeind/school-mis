import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";

const initialFormValues = {
  IDHREmployeeCategoryRole: 0,
  Heading: "",
  Description: "",
  IsActive: false,
  Created_On: "2012-12-12T00:00:00",
  Updated_On: "2015-04-09T14:20:39.947",
};

const EmployeeCategoryRoleForm = ({ college }) => {
  const dispatch = useDispatch();
  const validate = () => {
    let temp = {};
    temp.Heading =
      values.Heading.length > 10
        ? "Heading Name must be less than 10 characters"
        : "";
    temp.Description =
      values.Description.length > 200
        ? "Description cannot be greater than 200 characters"
        : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
    }
  };

  useEffect(() => {
    if (college) {
      setValues({ ...college });
    }
  }, [college]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="Heading"
            label="Heading"
            value={values.Heading}
            onChange={handleInputChange}
            errors={errors.Heading}
            required
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
            name="Description"
            label="Description"
            value={values.Description}
            onChange={handleInputChange}
            errors={errors.Description}
            required
          />
        </Grid>
      </Grid>
    </Form>
  );
};

export default EmployeeCategoryRoleForm;
