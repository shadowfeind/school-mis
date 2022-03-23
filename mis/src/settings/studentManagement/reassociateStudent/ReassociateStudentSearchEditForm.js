import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch,useSelector } from "react-redux";
import { putReassociateStudentsAction } from "./ReassociateStudentActions";
import SelectControl from "../../../components/controls/SelectControl";

const initialFormValues = {
  IDStudentFacultyLevel: "",
  IDYearFacultyLink: "",
  IDAdmissionRegistration: "",
  IDLevel: "",
  Section: "",
  IDAcademicShift: "",
  LevelStatus: "",
  Created_On: "2022-03-21T10:50:18.233Z",
  Updated_On: "2022-03-21T10:50:18.233Z",
};

const ReassociateStudentSearchEditForm = (reassociateForm,setOpenPopup) => {

  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.IDAdmissionRegistration = !fieldValues.IDAdmissionRegistration
    ? "This feild is required"
    : "";
    temp.IDYearFacultyLink = !fieldValues.IDYearFacultyLink
    ? "This feild is required"
    : "";
    temp.IDLevel = !fieldValues.IDLevel
    ? "This feild is required"
    : "";
    temp.IDAcademicShift = !fieldValues.IDAcademicShift
    ? "This feild is required"
    : "";
    temp.Section = !fieldValues.Section
    ? "This feild is required"
    : "";
    temp.LevelStatus = !fieldValues.LevelStatus
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
        dispatch(putReassociateStudentsAction(values));
      }
    }

    useEffect(() => {
      if (reassociateForm) {
        setValues({ ...reassociateForm.dbModel });
      }
    }, [reassociateForm]);

    const test = [{Key:"",Value:""}]

  return (
    <>
      <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
      <Grid item xs={6}>
      <InputControl
      disabled
            name="IDAdmissionRegistration"
            label="Admission Registration"
            value={values.IDAdmissionRegistration}
            onChange={handleInputChange}
            errors={errors.IDAdmissionRegistration}
          />
          <SelectControl
            name="IDYearFacultyLink"
            label="Year Faculty Link"
            value={values.IDYearFacultyLink}
            // options={ddlAcademicYear}
            onChange={handleInputChange}
            errors={errors.IDYearFacultyLink}
          />
          <SelectControl
            name="IDLevel"
            label="Level"
            value={values.IDLevel}
            // options={ddlClass}
            onChange={handleInputChange}
            errors={errors.IDLevel}
          /></Grid>
           <Grid item xs={6}>
          <SelectControl
            name="IDAcademicShift"
            label="AcademicShift"
            value={values.IDAcademicShift}
            // options={ddlAcademicShift}
            onChange={handleInputChange}
            errors={errors.IDAcademicShift}
          />
          <SelectControl
            name="Section"
            label="Section"
            value={values.Section}
            // options={ddlSection}
            onChange={handleInputChange}
            errors={errors.Section}
          />
          <SelectControl
            name="LevelStatus"
            label="Level Status"
            value={values.LevelStatus}
            // options={ddlLevelStatus}
            onChange={handleInputChange}
            errors={errors.LevelStatus}
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
    </>
  )
};

export default ReassociateStudentSearchEditForm;
