import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";

const initialFormValues = {
  IDAcademicRoom: 0,
  IDHRCompany: 2,
  RoomName: "",
  RoomLocation: "",
  RoomCapacity: 30,
  IsActive: false,
  Created_On: "2021-09-23T03:44:16.140Z",
  Updated_On: "2021-09-23T03:44:16.141Z",
};

const AcademicSectinoForm = () => {
  const dispatch = useDispatch();
  const validate = () => {
    let temp = {};
    temp.RoomName = values.RoomName ? "" : "This feild is required";
    temp.RoomCapacity = values.RoomCapacity ? "" : "This feild is required";
    temp.RoomLocation = values.RoomLocation ? "" : "This feild is required";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  console.log(values);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      //   if (values.IDHRPosition === 0) {
      //     dispatch(positionCreateAction(values));
      //   }
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
            name="RoomName"
            label="Room Name"
            value={values.RoomName}
            onChange={handleInputChange}
            errors={errors.RoomName}
          />
          <Grid item xs={6}>
            <InputControl
              name="RoomLocation"
              label="Room Location"
              value={values.RoomLocation}
              onChange={handleInputChange}
              errors={errors.RoomLocation}
            />
          </Grid>
          <CheckBoxControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={handleInputChange}
            errors={errors.IsActive}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="RoomCapacity"
            label="RoomCapacity"
            value={values.RoomCapacity}
            onChange={handleInputChange}
            errors={errors.RoomCapacity}
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
      </Grid>
    </Form>
  );
};

export default AcademicSectinoForm;
