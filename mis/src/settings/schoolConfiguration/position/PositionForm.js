import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import { positionCreateAction } from "./PositionActions";

const initialFormValues = {
  IDHRPosition: 0,
  IDHRCompany: 2,
  PositionHead: "",
  PositionDescription: "",
  IsActive: false,
  Created_On: "2021-09-23T03:44:16.140Z",
  Updated_On: "2021-09-23T03:44:16.141Z",
};

const PositionForm = ({ position }) => {
  const dispatch = useDispatch();
  const validate = () => {
    let temp = {};
    temp.PositionHead = values.PositionHead ? "" : "This feild is required";
    temp.PositionDescription = values.PositionDescription
      ? ""
      : "This feild is required";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  console.log(values);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (values.IDHRPosition === 0) {
        dispatch(positionCreateAction(values));
      }
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
            name="PositionHead"
            label="Position Head"
            value={values.PositionHead}
            onChange={handleInputChange}
            errors={errors.PositionHead}
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
            name="PositionDescription"
            label="Position Description"
            value={values.PositionDescription}
            onChange={handleInputChange}
            errors={errors.PositionDescription}
          />
        </Grid>
      </Grid>
    </Form>
  );
};

export default PositionForm;
