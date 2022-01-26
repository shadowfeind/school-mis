import React, { useEffect, useState } from "react";
import { Button, makeStyles, Toolbar, Grid } from "@material-ui/core";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import {
  getAllTotalStudentAttendanceAction,
  getListTotalStudentAttendanceAction,
} from "./TotalStudentAttendanceActions";
import { GET_ALL_TOTAL_STUDENT_ATTENDANCE_RESET } from "./TotalStudentAttendanceConstant";
import DatePickerControl from "../../components/controls/DatePickerControl";
import {
  getEnglishDateAction,
  getSubjectOptionsForSelectAction,
} from "../studentMonthlyPresentSheet/StudentMonthlyPresentSheetActions";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
  customInput: {
    minWidth: "200px",
  },
}));

const TotalStudentAttendance = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlSubject, setDdlSubject] = useState([]);
  const [ddlNepMonth, setDdlNepMonth] = useState([]);
  const [ddlNepYear, setDdlNepYear] = useState([]);

  const [programValue, setProgramValue] = useState();
  const [classId, setClassId] = useState();
  const [acaYear, setAcaYear] = useState();
  const [shift, setShift] = useState();
  const [section, setSection] = useState();
  const [subject, setSubject] = useState();
  const [nepMonth, setNepMonth] = useState();
  const [nepYear, setNepYear] = useState();
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState();

  const dispatch = useDispatch();
  const classes = useStyles();

  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const {
    allTotalStudentAttendanceData,
    error: allStudentAttendanceDataError,
  } = useSelector((state) => state.getAllTotalStudentAttendance);

  const { subjectOptions, error: subjectOptionsError } = useSelector(
    (state) => state.getSubjectOptionsForSelect
  );

  const { engDate, error: engDateError } = useSelector(
    (state) => state.getEnglishDate
  );

  if (allStudentAttendanceDataError) {
    setNotify({
      isOpen: true,
      message: allStudentAttendanceDataError,
      type: "error",
    });
    dispatch({ type: GET_ALL_TOTAL_STUDENT_ATTENDANCE_RESET });
  }

  useEffect(() => {
    if (!allTotalStudentAttendanceData) {
      dispatch(getAllTotalStudentAttendanceAction());
    }
    if (allTotalStudentAttendanceData) {
      setProgramDdl(
        allTotalStudentAttendanceData.searchFilterModel.ddlFacultyProgramLink
      );
      setDdlClass(allTotalStudentAttendanceData.searchFilterModel.ddlClass);
      setAcademicYearDdl(
        allTotalStudentAttendanceData.searchFilterModel.ddlAcademicYear
      );
      setDdlShift(
        allTotalStudentAttendanceData.searchFilterModel.ddlAcademicShift
      );
      setDdlSection(allTotalStudentAttendanceData.searchFilterModel.ddlSection);
      setDdlNepMonth(
        allTotalStudentAttendanceData.searchFilterModel.ddlnpMonth
      );
      setDdlNepYear(allTotalStudentAttendanceData.searchFilterModel.ddlnpYear);
      setDate(
        allTotalStudentAttendanceData.searchFilterModel.currentDate.slice(0, 10)
      );
      setNepMonth(allTotalStudentAttendanceData.searchFilterModel.npMonth);
      setNepYear(allTotalStudentAttendanceData.searchFilterModel.npYear);
    }
  }, [allTotalStudentAttendanceData, dispatch]);

  useEffect(() => {
    if (subjectOptions) {
      setDdlSubject(subjectOptions);
    }
  }, [subjectOptions]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.shift = !shift ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    temp.subject = !subject ? "This feild is required" : "";
    temp.nepMonth = !nepMonth ? "This feild is required" : "";
    temp.nepYear = !nepYear ? "This feild is required" : "";
    temp.date = !date ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSearchAttendance = () => {
    if (validate()) {
      dispatch(
        getListTotalStudentAttendanceAction(
          acaYear,
          programValue,
          classId,
          subject,
          section,
          shift,
          nepYear,
          nepMonth,
          date
        )
      );
    }
  };

  const handleYearChange = (value) => {
    setAcaYear(value);
    if ((programValue, classId)) {
      dispatch(getSubjectOptionsForSelectAction(value, programValue, classId));
    }
  };

  const handleProgramChange = (value) => {
    setProgramValue(value);
    if ((acaYear, classId)) {
      dispatch(getSubjectOptionsForSelectAction(acaYear, value, classId));
    }
  };

  const handleClassIdChange = (value) => {
    setClassId(value);
    if ((acaYear, programValue)) {
      dispatch(getSubjectOptionsForSelectAction(acaYear, programValue, value));
    }
  };

  const nepMonthHandler = (value) => {
    setNepMonth(value);
    if (nepYear) {
      dispatch(getEnglishDateAction(value, nepYear));
    }
  };
  const nepYearHandler = (value) => {
    setNepYear(value);
    if (nepMonth) {
      dispatch(getEnglishDateAction(nepMonth, value));
    }
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="Academic Year"
                label="Academic Year"
                value={acaYear}
                onChange={(e) => handleYearChange(e.target.value)}
                options={academicYearDdl ? academicYearDdl : test}
                errors={errors.acaYear}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Program/Faculty"
                label="Program/Faculty"
                value={programValue}
                onChange={(e) => handleProgramChange(e.target.value)}
                options={programDdl ? programDdl : test}
                errors={errors.programValue}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Classes"
                label="Classes"
                value={classId}
                onChange={(e) => handleClassIdChange(e.target.value)}
                options={ddlClass ? ddlClass : test}
                errors={errors.classId}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Shift"
                label="Shift"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                options={ddlShift ? ddlShift : test}
                errors={errors.shift}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Section"
                label="Section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                options={ddlSection ? ddlSection : test}
                errors={errors.section}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Sujbect"
                label="Subject Name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                options={ddlSubject ? ddlSubject : test}
                errors={errors.subject}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="NepaliMonth"
                label="Nepali Month"
                value={nepMonth}
                onChange={(e) => nepMonthHandler(e.target.value)}
                options={ddlNepMonth ? ddlNepMonth : test}
                errors={errors.nepMonth}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="NepaliYear"
                label="Nepali Year"
                value={nepYear}
                onChange={(e) => nepYearHandler(e.target.value)}
                options={ddlNepYear ? ddlNepYear : test}
                errors={errors.nepYear}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <DatePickerControl
                name="CurrentYear"
                label="Current Year"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                errors={errors.date}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleSearchAttendance}
              >
                SEARCH
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        {/* {getListStudentPresent && (
      <StudentMonthlyPresentSheetTableCollapse
        students={getListStudentPresent && getListStudentPresent}
      />
    )} */}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Bulk Edit"
      >
        {/* <StudentMonthlyPresentSheetUpdateForm
      students={
        getListForUpdateStudentPresent && getListForUpdateStudentPresent
      }
    /> */}
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default TotalStudentAttendance;
