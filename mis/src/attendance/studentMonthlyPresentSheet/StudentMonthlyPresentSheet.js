import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import { GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_RESET } from "./StudentMonthlyPresentSheetConstants";
import { getAllStudentPresentSheetDataAction } from "./StudentMonthlyPresentSheetActions";

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

const StudentMonthlyPresentSheet = () => {
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
    allStudentMonthlyPresentSheetData,
    error: allStudentMonthlyPresentSheetDataError,
  } = useSelector((state) => state.getAllStudentMonthlyPresentSheet);

  if (allStudentMonthlyPresentSheetDataError) {
    setNotify({
      isOpen: true,
      message: allStudentMonthlyPresentSheetDataError,
      type: "error",
    });
    dispatch({ type: GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_RESET });
  }

  useEffect(() => {
    if (!allStudentMonthlyPresentSheetData) {
      dispatch(getAllStudentPresentSheetDataAction());
    }
    if (allStudentMonthlyPresentSheetData) {
      setProgramDdl(
        allStudentMonthlyPresentSheetData.searchFilterModel
          .ddlFacultyProgramLink
      );
      setDdlClass(allStudentMonthlyPresentSheetData.searchFilterModel.ddlClass);
      setAcademicYearDdl(
        allStudentMonthlyPresentSheetData.searchFilterModel.ddlAcademicYear
      );
      setDdlShift(
        allStudentMonthlyPresentSheetData.searchFilterModel.ddlAcademicShift
      );
      setDdlSection(
        allStudentMonthlyPresentSheetData.searchFilterModel.ddlSection
      );
    }
  }, [allStudentMonthlyPresentSheetData, dispatch]);

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

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSearchAttendance = () => {
    if (validate()) {
      alert("working");
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
                // onChange={handleInputChange}
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                // onClick={handleBulkEdit}
              >
                UPDATE
              </Button>
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
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Bulk Edit"
      >
        {/* <StudentAttendanceBulk
      bulkData={
        bulkStudentAttendance &&
        bulkStudentAttendance.dbModelPresentAbsentLst
      }
      search={
        bulkStudentAttendance && bulkStudentAttendance.searchFilterModel
      }
      workingDayTotal={
        bulkStudentAttendance && bulkStudentAttendance.WorkingDayTotal
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

export default StudentMonthlyPresentSheet;
