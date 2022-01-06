import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import {
  createSingleTeacherFacSubAction,
  singleTeacherFacSubEditAction,
} from "./TeacherFacultySubjectActions";

const initialFormValues = {
  IDHRTeacherFacultySubjectMappingHeader: 0,
  IDTeacher: 0,
  Level: 13,
  IDYearFacultyLink: 110,
  IDAcademicFacultySubjectLink: 22142,
  Summary: "",
  IDAcademicShift: 2,
  Section: "",
  IsActive: true,
  Created_On: "2022-01-06T13:05:53.393",
  Updated_On: "2022-01-06T13:05:53.393",
};

const TeacherFacultySubjectForm = ({
  editData,
  createData,
  setOpenPopup,
  section,
}) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.Summary = !fieldValues.Summary
      ? "This feild is required"
      : !fieldValues.Summary.trim()
      ? "This feild is required"
      : fieldValues.Summary.length > 200
      ? "Must be less than 101 characters"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (values.IDHRTeacherFacultySubjectMappingHeader === 0) {
        dispatch(createSingleTeacherFacSubAction(values, section));
      } else {
        dispatch(singleTeacherFacSubEditAction(values));
      }
      setOpenPopup(false);
    }
  };

  const fillerArray = [{ Key: "", Value: "" }];
  useEffect(() => {
    if (editData) {
      setValues({ ...editData.dbModel });
    }
  }, [editData]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <SelectControl
            name="IDTeacher"
            label="Teacher"
            value={values.IDTeacher}
            onChange={handleInputChange}
            options={
              editData
                ? editData.ddlTeacher
                : createData
                ? createData.ddlTeacher
                : fillerArray
            }
          />
          <InputControl
            name="Summary"
            label="Summary"
            value={values.Summary}
            onChange={handleInputChange}
            variant="outlined"
            errors={errors.Summary}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectControl
            name="IDAcademicFacultySubjectLink"
            label="Faculty Subject"
            value={values.IDAcademicFacultySubjectLink}
            onChange={handleInputChange}
            options={
              editData
                ? editData.ddlFacultySubject
                : createData
                ? createData.ddlFacultySubject
                : fillerArray
            }
          />
          <SelectControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={handleInputChange}
            options={
              editData
                ? editData.ddlIsActive
                : createData
                ? createData.ddlIsActive
                : fillerArray
            }
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

export default TeacherFacultySubjectForm;
