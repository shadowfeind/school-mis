import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import DatePickerControl from "../../components/controls/DatePickerControl";
import SelectControl from "../../components/controls/SelectControl";
import { Timelapse } from "@material-ui/icons";

const initialFormValues = {
  IDAcademicExamSchedule: 0,
  IDYearFacultyLink: 0,
  IDAcademicYearCalendar: 0,
  IDAcademicFacultySubjectLink: 0,
  ExamType: "",
  ExamScheduleFromDate: "2022-01-28T07:12:28.958Z",
  ExamScheduleToDate: "2022-01-28T07:12:28.958Z",
  ExamScheduleFromTime: "",
  ExamScheduleToTime: "",
  FullMark: 0,
  PassMark: 0,
  FullMarkPractical: 0,
  FullMarkPreTerm: 0,
  DisplayName: "",
  GroupNumber: 0,
  ApplyGroup: true,
  AcademicYear: "",
  Level: 0,
  SubjectOrder: 0,
  Created_On: "2022-01-28T07:12:28.958Z",
  Updated_On: "2022-01-28T07:12:28.958Z",
};

const ExamScheduleForm = (examSchedule, setOpenPopup) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.IDAcademicFacultySubjectLink = !fieldValues.IDAcademicFacultySubjectLink
      ? "This feild is required"
      : !fieldValues.IDAcademicFacultySubjectLink.trim()
      ? "This feild is required"
      : "";
      temp.ExamType = !fieldValues.ExamType ? "This feild is required" :"";
      temp.FullMark = !fieldValues.FullMark ? "This feild is required" :"";
      temp.ApplyGroup = !fieldValues.ApplyGroup ? "This feild is required" :"";
      temp.ExamScheduleFromDate = !fieldValues.ExamScheduleFromDate ? "This feild is required" :"";
      temp.ExamScheduleToDate = !fieldValues.ExamScheduleToDate ? "This feild is required" :"";
      temp.DisplayName = !fieldValues.DisplayName ? "This feild is required" :
      temp.DisplayName = fieldValues.DisplayName < 2 ? "Input Only 2 Characters" :"";
      temp.SubjectOrder = !fieldValues.SubjectOrder ? "This feild is required" :"";
      temp.PassMark = !fieldValues.PassMark ? "This feild is required" :"";
      temp.GroupNumber = !fieldValues.GroupNumber ? "This feild is required" :"";
      temp.ExamScheduleFromTime = !fieldValues.ExamScheduleFromTime ? "This feild is required" :"";
      temp.ExamScheduleToTime = !fieldValues.ExamScheduleToTime ? "This feild is required" :"";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (values.IDAcademicExamSchedule === 0) {
        dispatch(getSingleExamScheduleCreateAction(values));
      } 
    }
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);
    useEffect(() => {
      if (examSchedule) {
        setValues({ ...examSchedule });
      }
    }, [examSchedule]);

  return(
<>
<Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <SelectControl
            name="IDAcademicFacultySubjectLink"
            label="Subject"
            value={values.IDAcademicFacultySubjectLink}
            options={ddlSubject}
            onChange={handleInputChange}
            errors={errors.IDAcademicFacultySubjectLink}
          />
          <SelectControl
            name="ExamType"
            label="Exam Type*"
            value={values.ExamType}
            options={ddlExamType}
            onChange={handleInputChange}
            errors={errors.ExamType}
          />
          <InputControl
            name="FullMark"
            label="Full Marks*"
            value={values.FullMark}
            onChange={handleInputChange}
            errors={errors.FullMark}
            type="number"
          />
          <SelectControl
            name="ApplyGroup"
            label="Apply Group"
            value={values.ApplyGroup}
            options={ddlIsActive}
            onChange={handleInputChange}
            errors={errors.ApplyGroup}
          />
          <DatePickerControl
            name="ExamScheduleFromDate"
            label="Start Date"
            value={values.ExamScheduleFromDate}
            onChange={handleInputChange}
            errors={errors.ExamScheduleFromDate}
          />
          <DatePickerControl
            name="ExamScheduleToDate"
            label="End Date"
            value={values.ExamScheduleToDate}
            onChange={handleInputChange}
            errors={errors.ExamScheduleToDate}
          />
          </Grid>
          <Grid item xs={6}>
          <InputControl
            name="DisplayName"
            label="Display Name"
            value={values.DisplayName}
            onChange={handleInputChange}
            errors={errors.DisplayName}
          />
          <InputControl
            name="SubjectOrder"
            label="Subject Order"
            value={values.SubjectOrder}
            onChange={handleInputChange}
            errors={errors.SubjectOrder}
          />
          <InputControl
            name="PassMark"
            label="Pass Mark"
            value={values.PassMark}
            onChange={handleInputChange}
            errors={errors.PassMark}
            type = "number"
          />
          <InputControl
            name="GroupNumber"
            label="Group Number"
            value={values.GroupNumber}
            onChange={handleInputChange}
            errors={errors.GroupNumber}
          />
         <Timelapse
            name="ExamScheduleFromTime"
            label="Start Time"
            value={values.ExamScheduleFromTime}
            onChange={handleInputChange}
            errors={errors.ExamScheduleFromTime}
          />
          <Timelapse
            name="ExamScheduleToTime"
            label="End Time"
            value={values.ExamScheduleToTime}
            onChange={handleInputChange}
            errors={errors.ExamScheduleToTime}
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

export default ExamScheduleForm;
