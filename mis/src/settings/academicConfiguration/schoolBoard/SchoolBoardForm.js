import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import {
  SchoolBoardCreateAction,
  updateSingleSchoolBoardAction,
} from "./SchoolBoardActions";

const initialFormValues = {
  IDUniversity: 0,
  IDHRCompany: 2,
  UniversityName: "",
  Description: "",
  IsActive: false,
  Created_On: "2021-09-23",
  Updated_On: "2021-09-23",
};

const SchoolBoardForm = ({ schoolBoard, setOpenPopup }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.UniversityName = !fieldValues.UniversityName
      ? "This feild is required"
      : !fieldValues.UniversityName.trim()
      ? "This feild is required"
      : fieldValues.UniversityName.length > 100
      ? "Must be less than 101 characters"
      : "";

    temp.Description = !fieldValues.Description
      ? "This feild is required"
      : !fieldValues.Description.trim()
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
      if (values.IDUniversity === 0) {
        dispatch(SchoolBoardCreateAction(values));
      } else {
        dispatch(updateSingleSchoolBoardAction(values));
      }
    }
  };

  useEffect(() => {
    if (schoolBoard) {
      setValues({ ...schoolBoard });
    }
  }, [schoolBoard]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="UniversityName"
            label="University Name"
            value={values.UniversityName}
            onChange={handleInputChange}
            errors={errors.UniversityName}
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
            name="Description"
            label="Description"
            value={values.Description}
            onChange={handleInputChange}
            errors={errors.Description}
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

export default SchoolBoardForm;
