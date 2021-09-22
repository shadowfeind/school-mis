import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";

const initialFormValues = {
  IDHRRole: 0,
  IDHRCompany: 2,
  RoleName: "",
  Description: "",
  IsSystemDefined: true,
  MarkAsAdmin: false,
  Created_On: "2012-12-12T00:00:00",
  Updated_On: "2015-04-09T14:20:39.947",
};

const RoleForm = ({ role }) => {
  const dispatch = useDispatch();
  const validate = () => {
    let temp = {};
    temp.RoleName =
      values.RoleName.length > 20
        ? "RoleName must be less than 20 characters"
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
    if (role) {
      setValues({ ...role });
    }
  }, [role]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="RoleName"
            label="Role Name"
            value={values.RoleName}
            onChange={handleInputChange}
            errors={errors.RoleName}
            required
          />

          <InputControl
            name="Description"
            label="Description"
            value={values.Description}
            onChange={handleInputChange}
            errors={errors.Description}
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
          <CheckBoxControl
            name="MarkAsAdmin"
            label="MarkAsAdmin"
            value={values.MarkAsAdmin}
            onChange={handleInputChange}
            // errors={errors.IsTaxApplicable}
            required
          />
        </Grid>
      </Grid>
    </Form>
  );
};

export default RoleForm;
