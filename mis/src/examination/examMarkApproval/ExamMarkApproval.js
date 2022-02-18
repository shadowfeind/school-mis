import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import useCustomTable from "../../customHooks/useCustomTable";
import InputControl from "../../components/controls/InputControl";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import {
  getBulkExamApprovalBlankDataAction,
  getBulkExamApprovalSearchDataAction,
  getExamApprovalScheduleHeaderAction,
  getExamApprovalSearchDataAction,
  getInitialExamApprovalDataAction,
} from "./ExamMarkApprovalActions";
import {
  getEventAction,
  getEventScheduleAction,
  getExamEntryBulkAction,
} from "../examMarkEntry/ExamMarkEntryActions";
import {
  GET_EVENT_RESET,
  GET_EXAM_SCHEDULE_HEADER_RESET,
} from "../examMarkEntry/ExamMarkEntryConstants";
import ExamMarkApprovalTableCollapse from "./ExamMarkApprovalTableCollapse";
import ExamMarkApprovalBulk from "./ExamMarkApprovalBulk";
import {
  GET_EXAM_APPROVAL_SCHEULE_HEADER_RESET,
  POST_BULK_EXAM_APPROVAL_RESET,
} from "./ExamMarkApprovalConstants";
import ExamMarkApprovalBulkBlank from "./ExamMarkApprovalBulkBlank";
import ExamMarkApprovalBlankForm from "./ExamMarkApprovalBlankForm";

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

const tableHeader = [
  { id: "RollNo", label: "Roll No" },
  { id: "FullName", label: "Full Name" },
  { id: "SubjectName", label: "Subject" },
  { id: "FullMark", label: "Full Marks(TH)" },
  { id: "FullMarkPractical", label: "Full Marks(PR)" },
  { id: "FullMarkPreTerm", label: "Full Marks(Pre Term)" },
  { id: "ObtainedMark", label: "ObtainedMark(TH)" },
  { id: "ObtainedMarkPractical", label: "ObtainedMark(PR)" },
  { id: "ObtainedMarkPreTerm", label: "ObtainedMark(Pre Term)" },
];

/*
 * get event name , exam schedule and getBulk has same api
 * as exam mark entry so i have used same reducers and actions
 */

const ExamMarkApproval = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlEvent, setDdlEvent] = useState([]);
  const [ddlSchedule, setDdlSchedule] = useState([]);
  const [programValue, setProgramValue] = useState();
  const [classId, setClassId] = useState();
  const [acaYear, setAcaYear] = useState();
  const [shift, setShift] = useState();
  const [section, setSection] = useState();
  const [event, setEvent] = useState();
  const [schedule, setSchedule] = useState();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [openBulkPopup, setOpenBulkPopup] = useState(false);
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
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  const handleSearch = (e) => {
    setFilterFn({
      fn: (item) => {
        if (e.target.value === "") {
          return item;
        } else {
          return item.filter((x) =>
            x.EventName.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const { examApprovalInitialDatas } = useSelector(
    (state) => state.getInitialExamApprovalData
  );

  const { allEvents, success: getEventSuccess } = useSelector(
    (state) => state.getEvent
  );

  const { allSchedule, success: getScheduleSuccess } = useSelector(
    (state) => state.getEventSchedule
  );

  const { scheduleHeader, error: scheduleHeaderError } = useSelector(
    (state) => state.getExamApprovalScheduleHeader
  );

  const { searchData } = useSelector(
    (state) => state.getExamApprovalSearchData
  );

  const { bulkData } = useSelector(
    (state) => state.getBulkExamApprovalSearchData
  );

  const { bulkBlankData } = useSelector(
    (state) => state.getBulkExamApprovalBlankData
  );

  const {
    success: postBulkExamApprovalSuccess,
    error: postBulkExamApprovalError,
  } = useSelector((state) => state.postBulkExamApproval);

  if (getEventSuccess) {
    setDdlEvent(allEvents);
    dispatch({ type: GET_EVENT_RESET });
  }

  if (scheduleHeader) {
    setDdlSchedule(scheduleHeader);
    dispatch({ type: GET_EXAM_APPROVAL_SCHEULE_HEADER_RESET });
  }
  if (postBulkExamApprovalSuccess) {
    setNotify({
      isOpen: true,
      message: "Succesfully Edited",
      type: "success",
    });
    dispatch({ type: POST_BULK_EXAM_APPROVAL_RESET });
    dispatch(
      getExamApprovalSearchDataAction(
        acaYear,
        programValue,
        classId,
        section,
        shift,
        event,
        schedule
      )
    );
    setOpenPopup(false);
  }
  if (postBulkExamApprovalError) {
    setNotify({
      isOpen: true,
      message: postBulkExamApprovalError,
      type: "error",
    });
    dispatch({ type: POST_BULK_EXAM_APPROVAL_RESET });
    setOpenPopup(false);
  }

  const handleProgramValue = (value) => {
    setProgramValue(value);
    if ((acaYear, classId, shift)) {
      dispatch(
        getExamApprovalScheduleHeaderAction(value, acaYear, classId, shift)
      );
    }
  };

  const handleYearChange = (value) => {
    setAcaYear(value);
    if (classId) {
      dispatch(getEventAction(value, programValue, classId));
    }
  };

  const handleClassIdChange = (value) => {
    setClassId(value);
    dispatch(getEventAction(acaYear, programValue, value));
  };

  const eventHandler = (value) => {
    setEvent(value);
    dispatch(
      getExamApprovalScheduleHeaderAction(
        acaYear,
        programValue,
        classId,
        section,
        value
      )
    );
  };

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "examination" });
    if (!examApprovalInitialDatas) {
      dispatch(getInitialExamApprovalDataAction());
    }
    if (examApprovalInitialDatas) {
      setProgramDdl(
        examApprovalInitialDatas.searchFilterModel.ddlFacultyProgramLink
      );
      setDdlClass(examApprovalInitialDatas.searchFilterModel.ddlClass);
      setAcademicYearDdl(
        examApprovalInitialDatas.searchFilterModel.ddlAcademicYear
      );
      setDdlShift(examApprovalInitialDatas.searchFilterModel.ddlAcademicShift);
      setDdlSection(examApprovalInitialDatas.searchFilterModel.ddlSection);
    }
  }, [examApprovalInitialDatas, dispatch]);

  useEffect(() => {
    if (searchData) {
      setTableData(searchData.dbModelLsts);
    }
  }, [searchData]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.shift1 = !shift ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    temp.event = !event ? "This feild is required" : "";
    temp.schedule = !schedule ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleExamApprovalSearch = () => {
    if (validate()) {
      dispatch(
        getExamApprovalSearchDataAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          schedule
        )
      );
    }
  };

  const handleBulkEdit = () => {
    if (validate()) {
      dispatch(
        getBulkExamApprovalSearchDataAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          schedule
        )
      );
      setOpenPopup(true);
    }
  };

  const handleBulkBlankData = () => {
    if (validate()) {
      dispatch(
        getBulkExamApprovalBlankDataAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event,
          schedule
        )
      );
      setOpenBulkPopup(true);
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
                onChange={(e) => setShift(e.target.value)}
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
                name="ExamScheduleHeader"
                label="Exam Schedule Header"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                options={ddlSchedule ? ddlSchedule : test}
                errors={errors.schedule}
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleBulkEdit}
              >
                BULKEDIT
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleBulkBlankData}
              >
                BULK BLANK
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleExamApprovalSearch}
              >
                SEARCH
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "15px" }}></div>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Exam Mark"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        {searchData && (
          <TableContainer className={classes.table}>
            <TblHead />

            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => (
                <ExamMarkApprovalTableCollapse item={item} key={item.$id} />
              ))}
            </TableBody>
          </TableContainer>
        )}

        {searchData && <TblPagination />}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Bulk Edit"
      >
        <ExamMarkApprovalBulk
          statusData={
            bulkData && bulkData.searchFilterModel.ddlStudentExamStatus
          }
          search={bulkData && bulkData.searchFilterModel}
          bulkData={bulkData && bulkData.dbModelLsts}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <Popup
        openPopup={openBulkPopup}
        setOpenPopup={setOpenBulkPopup}
        title="Bulk Blank Edit"
      >
        <ExamMarkApprovalBlankForm blankData={bulkBlankData && bulkBlankData} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default ExamMarkApproval;
