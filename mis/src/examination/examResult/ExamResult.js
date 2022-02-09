import React, { useEffect, useState } from "react";
import { Button, makeStyles, Toolbar, Grid } from "@material-ui/core";
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
  printExamResultCountAction,
  printFinalResultAction,
} from "./ExamResultActions";
import {
  GET_EVENT_FOR_EXAM_MARK_RESET,
  GET_EXAM_LEDGER_HEADER_RESET,
  GET_EXAM_RESULT_LIST_RESET,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_RESET,
  PRINT_EXAM_RESULT_RESET,
  PRINT_FINAL_RESULT_RESET,
} from "./ExamResultConstants";
import ExamResultTableCollapse from "./ExamResultTableCollapse";
import ExamResultModel from "./ExamResultModel";
import ExamAnnualResultTable from "./ExamAnnualResultTable";
import DatePickerControl from "../../components/controls/DatePickerControl";
import FinalExamResult from "./FinalExamResult";

// NOTE
//exam ledger header is exam ledger
//NOTE
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
  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [shift, setShift] = useState("");
  const [section, setSection] = useState("");
  const [event, setEvent] = useState("");
  const [student, setStudent] = useState(0);
  const [date, setDate] = useState("2022-01-28");
  const [dateValue, setDateValue] = useState("2022-01-28");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupFinal, setOpenPopupFinal] = useState(false);
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
  const { printExamResult, error: printExamResultError } = useSelector(
    (state) => state.printExamResult
  );
  const { examLedgerHeader, error: examLedgerHeaderError } = useSelector(
    (state) => state.getExamLedgerHeader
  );
  const { printFinalResult, error: printFinalResultError } = useSelector(
    (state) => state.printFinalResult
  );

  if (getexamResultListError) {
    setNotify({
      isOpen: true,
      message: getexamResultListError,
      type: "error",
    });
    dispatch({ type: GET_EXAM_RESULT_LIST_RESET });
  }
  if (printFinalResultError) {
    setNotify({
      isOpen: true,
      message: printFinalResultError,
      type: "error",
    });
    dispatch({ type: PRINT_FINAL_RESULT_RESET });
  }
  if (examLedgerHeaderError) {
    setNotify({
      isOpen: true,
      message: examLedgerHeaderError,
      type: "error",
    });
    dispatch({ type: GET_EXAM_LEDGER_HEADER_RESET });
  }
  if (printExamResultError) {
    setNotify({
      isOpen: true,
      message: printExamResultError,
      type: "error",
    });
    dispatch({ type: PRINT_EXAM_RESULT_RESET });
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

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.shift1 = !shift ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    temp.event = !event ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleDate = (date) => {
    if (date) {
      setDateValue(date);
      const newDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
      setDate(newDate);
    }
  };

  const handleProgramValue = (value) => {
    setProgramValue(value);
    if ((acaYear, classId, shift)) {
      dispatch(
        getExamApprovalScheduleHeaderAction(value, acaYear, classId, shift)
      );
    }
  };

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

  const studentHandler = (value) => {
    setShowDatatable(false);
    setStudent(value);
  };

  const eventHandler = (value) => {
    setShowDatatable(false);
    setEvent(value);
  };

  const handleLedgerSearch = () => {
    setShowAnnualLedger(false);
    if (
      validate(acaYear, programValue, classId, section, shift, event, student)
    ) {
      dispatch(
        getExamResultListAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
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
    if (
      validate(acaYear, programValue, classId, section, shift, event, student)
    ) {
      dispatch(
        printExamResultAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          student,
          date
        )
      );
    }
    setOpenPopup(true);
  };

  const handleAnnualLedgerSearch = () => {
    if (validate()) {
      dispatch(
        getExamLedgerHeaderAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          student
        )
      );
      setShowDatatable(false);
      setShowAnnualLedger(true);
    }
  };

  const handleCountPrint = () => {
    if (validate()) {
      dispatch(
        printExamResultCountAction(
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
  };

  const handlePrintFinalResult = () => {
    if (validate()) {
      dispatch(
        printFinalResultAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          student,
          date
        )
      );
      setOpenPopupFinal(true);
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
                errors={errors.acaYear}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Program/Faculty"
                label="Program/Faculty"
                value={programValue}
                onChange={(e) => handleProgramValue(e.target.value)}
                options={programDdl}
                errors={errors.programValue}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Classes"
                label="Classes"
                value={classId}
                onChange={(e) => handleClassIdChange(e.target.value)}
                options={ddlClass}
                errors={errors.classId}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Shift"
                label="Shift"
                value={shift}
                onChange={(e) => handleShiftChange(e.target.value)}
                options={ddlShift}
                errors={errors.shift1}
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
                errors={errors.section}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="EventName"
                label="Event Name"
                value={event}
                onChange={(e) => eventHandler(e.target.value)}
                options={ddlEvent ? ddlEvent : test}
                errors={errors.event}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Student"
                label="Student"
                value={student}
                onChange={(e) => studentHandler(e.target.value)}
                options={ddlStudent ? ddlStudent : test}
                errors={errors.student}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <DatePickerControl
                name="DOJ"
                label="Pick Exam Date"
                value={dateValue}
                onChange={(e) => handleDate(e.target.value)}
                errors={errors.date}
              />
            </Grid>

            <Grid item xs={12}>
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
                onClick={handleCountPrint}
              >
                PRINT RESULT COUNT
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handlePrintFinalResult}
              >
                PRINT FINAL RESULT
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
          />
        )}
        {showAnnualLedger && (
          <ExamAnnualResultTable ledgerData={examLedgerHeader} />
        )}
      </CustomContainer>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="">
        <ExamResultModel examReport={printExamResult && printExamResult} />
      </Popup>
      <Popup
        openPopup={openPopupFinal}
        setOpenPopup={setOpenPopupFinal}
        title=""
      >
        <FinalExamResult result={printFinalResult} />
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
