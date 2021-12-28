import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import {
  getEventForExamMarkAction,
  getExamResultListAction,
  getInitialExamResultDataAction,
  getStudentOptionsForExamMarkAction,
} from "./ExamResultActions";
import {
  GET_EVENT_FOR_EXAM_MARK_RESET,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_RESET,
} from "./ExamResultConstants";
import ExamResultTableCollapse from "./ExamResultTableCollapse";

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

const ExamResult = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlEvent, setDdlEvent] = useState([]);
  const [ddlStudent, setDdlStudent] = useState([]);
  const [programValue, setProgramValue] = useState(6);
  const [classId, setClassId] = useState();
  const [acaYear, setAcaYear] = useState(55);
  const [shift, setShift] = useState(2);
  const [section, setSection] = useState(1);
  const [event, setEvent] = useState();
  const [student, setStudent] = useState();
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

  const { examResultInitialDatas } = useSelector(
    (state) => state.getInitialExamResultData
  );

  const { allEventsForExamMark, success: getExamMarkEventSuccess } =
    useSelector((state) => state.getEventForExamMark);

  const {
    studentOptionsForExamMark,
    success: studentOptionsForExamMarkSuccess,
  } = useSelector((state) => state.getInitialExamResultStudentOptions);

  if (getExamMarkEventSuccess) {
    setDdlEvent(allEventsForExamMark);
    dispatch({ type: GET_EVENT_FOR_EXAM_MARK_RESET });
  }

  if (studentOptionsForExamMarkSuccess) {
    setDdlStudent(studentOptionsForExamMark);
    dispatch({ type: GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "examination" });
    if (!examResultInitialDatas) {
      dispatch(getInitialExamResultDataAction());
    }
    if (examResultInitialDatas) {
      setProgramDdl(
        examResultInitialDatas.searchFilterModel.ddlFacultyProgramLink
      );
      setDdlClass(examResultInitialDatas.searchFilterModel.ddlClass);
      setAcademicYearDdl(
        examResultInitialDatas.searchFilterModel.ddlAcademicYear
      );
      setDdlShift(examResultInitialDatas.searchFilterModel.ddlAcademicShift);
      setDdlSection(examResultInitialDatas.searchFilterModel.ddlSection);
    }
  }, [examResultInitialDatas, dispatch]);

  const handleYearChange = (value) => {
    setAcaYear(value);
    if (classId) {
      dispatch(getEventForExamMarkAction(value, programValue, classId));
      dispatch(
        getStudentOptionsForExamMarkAction(value, programValue, classId, shift)
      );
    }
  };

  const handleClassIdChange = (value) => {
    setClassId(value);
    dispatch(getEventForExamMarkAction(acaYear, programValue, value));
    dispatch(
      getStudentOptionsForExamMarkAction(acaYear, programValue, value, shift)
    );
  };

  const handleShiftChange = (value) => {
    setShift(value);
    dispatch(
      getStudentOptionsForExamMarkAction(acaYear, programValue, classId, value)
    );
  };

  const handleExamResultSearch = () => {
    if ((acaYear, programValue, classId, shift, section, event, student)) {
      dispatch(
        getExamResultListAction(
          acaYear,
          programValue,
          classId,
          shift,
          section,
          event,
          student
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
                onChange={(e) => handleShiftChange(e.target.value)}
                options={ddlShift}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Section"
                label="Section"
                value={section}
                // onChange={(e) => setSection(e.target.value)}
                options={ddlSection}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="EventName"
                label="Event Name"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                options={ddlEvent ? ddlEvent : test}
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleExamResultSearch}
              >
                SEARCH
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                // onClick={handleExamApprovalSearch}
              >
                APPROVE
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <ExamResultTableCollapse />
        {/* {searchData && (
      <TableContainer className={classes.table}>
        <TblHead />

        <TableBody>
          {tableDataAfterPagingAndSorting().map((item) => (
            <ExamMarkApprovalTableCollapse item={item} key={item.$id} />
          ))}
        </TableBody>
      </TableContainer>
    )}

    {searchData && <TblPagination />} */}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Bulk Edit"
      >
        {/* <ExamMarkApprovalBulk
      statusData={
        bulkData && bulkData.searchFilterModel.ddlStudentExamStatus
      }
      bulkData={bulkData && bulkData.dbModelLsts}
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

export default ExamResult;
