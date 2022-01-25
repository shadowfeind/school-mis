import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SelectControl from "../../../components/controls/SelectControl";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import { GET_INITIAL_STUDENT_ID_CARD_DATA_RESET } from "./StudentIdCardConstants";
import {
  getActiveStudentsForStudentIdCardDataAction,
  getInitialStudentIdCardDataAction,
} from "./StudentIdCardActions";
import { getActiveStudentsForAdmitCardDataAction } from "../../../examination/printAdminCard/PrintAdminCardActions";
import { GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_RESET } from "../../../examination/printAdminCard/PrintAdminCardConstants";
import StudentCardDesign from "./StudentCardDesign";

//getActiveStudentsForAdmitCardDataAction is used from admitCard actions to fetch student lists
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

const test = [{ Key: "", Value: "" }];

const StudentIdCard = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlStudent, setDdlStudent] = useState([]);
  const [programValue, setProgramValue] = useState(6);
  const [classId, setClassId] = useState();
  const [acaYear, setAcaYear] = useState(55);
  const [shift, setShift] = useState(2);
  const [section, setSection] = useState(1);
  const [student, setStudent] = useState(0);
  const [date, setDate] = useState("12-22-2022");
  const dispatch = useDispatch();
  const classes = useStyles();

  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const { studentIdCardInitialData, error } = useSelector(
    (state) => state.getInitialStudentIdCardData
  );

  const {
    activeStudentsForAdmitCard,
    success: activeStudentsForAdmitCardSuccess,
  } = useSelector((state) => state.getActiveStudentsForAdmitCardData);

  const { activeStudentsForIdCard } = useSelector(
    (state) => state.getActiveStudentsForStudentIdCardData
  );

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_INITIAL_STUDENT_ID_CARD_DATA_RESET });
  }

  if (activeStudentsForAdmitCardSuccess) {
    setDdlStudent(activeStudentsForAdmitCard);
    dispatch({ type: GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_RESET });
  }

  useEffect(() => {
    if (!studentIdCardInitialData) {
      dispatch(getInitialStudentIdCardDataAction());
    }
    if (studentIdCardInitialData) {
      setProgramDdl(
        studentIdCardInitialData.searchFilterModel.ddlFacultyProgramLink
      );
      setDdlClass(studentIdCardInitialData.searchFilterModel.ddlClass);
      setAcademicYearDdl(
        studentIdCardInitialData.searchFilterModel.ddlAcademicYear
      );
      setDdlShift(studentIdCardInitialData.searchFilterModel.ddlAcademicShift);
      setDdlSection(studentIdCardInitialData.searchFilterModel.ddlSection);
    }
  }, [studentIdCardInitialData, dispatch]);

  const handleYearChange = (value) => {
    setAcaYear(value);
    if ((programValue, classId, shift)) {
      dispatch(
        getActiveStudentsForAdmitCardDataAction(
          value,
          programValue,
          classId,
          shift
        )
      );
    }
  };

  const handleClassIdChange = (value) => {
    setClassId(value);
    if ((programValue, acaYear, shift)) {
      dispatch(
        getActiveStudentsForAdmitCardDataAction(
          acaYear,
          programValue,
          value,
          shift
        )
      );
    }
  };

  const handleShift = (value) => {
    setShift(value);
    if ((programValue, acaYear, classId)) {
      dispatch(
        getActiveStudentsForAdmitCardDataAction(
          acaYear,
          programValue,
          classId,
          value
        )
      );
    }
  };

  const handleDate = (date) => {
    const newDate = `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}`;
    setDate(newDate);
  };

  const handleStudentSearch = () => {
    if ((acaYear, programValue, classId, shift, student, section, date)) {
      dispatch(
        getActiveStudentsForStudentIdCardDataAction(
          acaYear,
          programValue,
          classId,
          shift,
          student,
          section,
          date
        )
      );
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
                options={academicYearDdl}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Program/Faculty"
                label="Program/Faculty"
                value={programValue}
                // onChange={handleInputChange}
                options={programDdl}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Classes"
                label="Classes"
                value={classId}
                onChange={(e) => handleClassIdChange(e.target.value)}
                options={ddlClass}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Shift"
                label="Shift"
                value={shift}
                onChange={(e) => handleShift(e.target.value)}
                options={ddlShift}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Section"
                label="Section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                options={ddlSection}
              />
            </Grid>

            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Student"
                label="Student"
                value={student}
                onChange={(e) => setStudent(e.target.value)}
                options={ddlStudent ? ddlStudent : test}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <DatePickerControl
                name="DOJ"
                label="Pick Exam Date"
                value={date}
                onChange={(e) => handleDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                // onClick={handleBulkPrint}
              >
                BULK PRINT
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleStudentSearch}
              >
                SEARCH
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "15px" }}></div>

        {activeStudentsForIdCard && (
          <Grid container style={{ fontSize: "12px" }}>
            {activeStudentsForIdCard.dbModelLst.map((student) => (
              <StudentCardDesign
                key={student.$id}
                student={student}
                classname={classId}
                examDate={date}
              />
            ))}
          </Grid>
        )}
      </CustomContainer>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        {/* <PrintAdminCardPrint
      students={printStudentsAdmitCard && printStudentsAdmitCard.dbModelLst}
      imagePath={
        printStudentsAdmitCard && printStudentsAdmitCard.ImagePathLst
      }
      classname={printStudentsAdmitCard && printStudentsAdmitCard.ClassName}
      examDate={printStudentsAdmitCard && printStudentsAdmitCard.examDate}
    /> */}
      </Popup>

      <Notification notify={notify} setNotify={setNotify} />
      {/* <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      /> */}
    </>
  );
};

export default StudentIdCard;
