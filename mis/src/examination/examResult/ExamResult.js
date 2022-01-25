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
  getExamLedgerHeaderAction,
  getExamResultListAction,
  getInitialExamResultDataAction,
  getStudentOptionsForExamMarkAction,
  printExamResultAction,
} from "./ExamResultActions";
import {
  GET_EVENT_FOR_EXAM_MARK_RESET,
  GET_EXAM_LEDGER_HEADER_RESET,
  GET_EXAM_RESULT_LIST_RESET,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_RESET,
} from "./ExamResultConstants";
import ExamResultTableCollapse from "./ExamResultTableCollapse";
import ExamResultDesign from "./ExamResultDesign";
import { testExamJson } from "./testExamResult";
import ExamResultModel from "./ExamResultModel";
import ExamAnnualResultTable from "./ExamAnnualResultTable";

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
  const [showDataTable, setShowDatatable] = useState(false); //to avoid data changing when chaning select control
  const [showAnnualLedger, setShowAnnualLedger] = useState(false);

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

  const { examResultList, error: getexamResultListError } = useSelector(
    (state) => state.getExamResultList
  );

  if (getexamResultListError) {
    setNotify({
      isOpen: true,
      message: getexamResultListError,
      type: "error",
    });
    dispatch({ type: GET_EXAM_RESULT_LIST_RESET });
  }

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
    setShowDatatable(false);
    setAcaYear(value);
    if (classId) {
      dispatch(getEventForExamMarkAction(value, programValue, classId));
      dispatch(
        getStudentOptionsForExamMarkAction(value, programValue, classId, shift)
      );
    }
  };

  const handleClassIdChange = (value) => {
    setShowDatatable(false);
    setClassId(value);
    dispatch(getEventForExamMarkAction(acaYear, programValue, value));
    dispatch(
      getStudentOptionsForExamMarkAction(acaYear, programValue, value, shift)
    );
  };

  const handleShiftChange = (value) => {
    setShowDatatable(false);
    setShift(value);
    dispatch(
      getStudentOptionsForExamMarkAction(acaYear, programValue, classId, value)
    );
  };

  const studentHandler = (e) => {
    setShowDatatable(false);
    setStudent(e.target.value);
  };

  const eventHandler = (e) => {
    setShowDatatable(false);
    setEvent(e.target.value);
  };

  const handleLedgerSearch = () => {
    setShowAnnualLedger(false);
    if ((acaYear, programValue, classId, shift, section, event)) {
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
      setShowDatatable(true);
    }
  };

  const handleBulkPrint = () => {
    setShowDatatable(false);
    setShowAnnualLedger(false);
    if ((acaYear, programValue, classId, section, shift, event)) {
      dispatch(
        printExamResultAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          student
        )
      );
    }
    setOpenPopup(true);
  };

  const handleAnnualLedgerSearch = () => {
    setShowDatatable(false);
    setShowAnnualLedger(true);
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
                onChange={(e) => eventHandler(e)}
                options={ddlEvent ? ddlEvent : test}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Student"
                label="Student"
                value={student}
                onChange={(e) => studentHandler(e)}
                options={ddlStudent ? ddlStudent : test}
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleLedgerSearch}
              >
                SEARCH
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleBulkPrint}
              >
                PRINT RESULT
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleAnnualLedgerSearch}
              >
                ANNUAL LEDGER
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        {examResultList && (
          <ExamResultTableCollapse
            ledgerHeader={
              examResultList &&
              examResultList.ddlAcademicFacultySubjectLinkSubModel
            }
            student={examResultList && examResultList.dbModelLst}
            mark={examResultList && examResultList.dbMarkModelLst}
            showDataTable={showDataTable}
            result={examResultList && examResultList.dbModelResultLst}
            rank={examResultList && examResultList.dbModelRankLst}
            // ledgerHeader={testExamJson.ddlAcademicFacultySubjectLinkSubModel}
            // student={testExamJson.dbModelLst}
            // mark={testExamJson.dbMarkModelLst}
          />
        )}
        {showAnnualLedger && <ExamAnnualResultTable />}
      </CustomContainer>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="">
        <ExamResultModel />
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
