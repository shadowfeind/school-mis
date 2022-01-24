import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import {
  AcademicSectionCreateAction,
  updateSingleAcademicSectionAction,
} from "./AcademicSectionActions";

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

const AcademicSectinoForm = ({ academicSection, setOpenPopup }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.RoomName = !fieldValues.RoomName
      ? "This feild is required"
      : !fieldValues.RoomName.trim()
      ? "This feild is required"
      : "";
    temp.RoomCapacity = fieldValues.RoomCapacity
      ? ""
      : "This feild is required";
    temp.RoomLocation = !fieldValues.RoomLocation
      ? "This feild is required"
      : !fieldValues.RoomLocation.trim()
      ? "This feild is required"
      : fieldValues.RoomLocation.length > 200
      ? "Must be less than 201 letters"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (values.IDAcademicRoom === 0) {
        dispatch(AcademicSectionCreateAction(values));
      } else {
        dispatch(updateSingleAcademicSectionAction(values));
      }
    }
  };

  useEffect(() => {
    if (academicSection) {
      setValues({ ...academicSection });
    }
  }, [academicSection]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="RoomName"
            label="Room Name*"
            value={values.RoomName}
            onChange={handleInputChange}
            errors={errors.RoomName}
          />

          <InputControl
            name="RoomLocation"
            label="Room Location*"
            value={values.RoomLocation}
            onChange={handleInputChange}
            errors={errors.RoomLocation}
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
          <InputControl
            name="RoomCapacity"
            label="RoomCapacity*"
            value={values.RoomCapacity}
            onChange={handleInputChange}
            errors={errors.RoomCapacity}
            type="number"
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

export default AcademicSectinoForm;
