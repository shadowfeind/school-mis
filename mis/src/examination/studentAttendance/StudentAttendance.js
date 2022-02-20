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
import {
  getBulkStudentAttendanceAction,
  getAllStudentAttendanceAction,
  getAllStudentAttendanceInitialDataAction,
} from "./StudentAttendanceActions";
import SelectControl from "../../components/controls/SelectControl";
import { GET_EVENT_RESET } from "../examMarkEntry/ExamMarkEntryConstants";
import { getEventAction } from "../examMarkEntry/ExamMarkEntryActions";
import {
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_RESET,
  GET_ALL_STUDEN_ATTENDANCE_RESET,
  GET_BULK_STUDENT_ATTENDANCE_RESET,
  POST_BULK_STUDENT_ATTENDANCE_RESET,
} from "./StudentAttendanceConstants";
import StudentAttendanceTableCollapse from "./StudentAttendanceTableCollapse";
import StudentAttendanceBulk from "./StudentAttendanceBulk";

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
  { id: "MobileNumber", label: "Mobile Number" },
  { id: "", label: "EmailID)" },
  { id: "Actions", label: "Actions", disablesorting: true },
];

/*
 * get event name , exam schedule and getBulk has same api
 * as exam mark entry so i have used same reducers and actions
 */

const StudentAttendance = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlEvent, setDdlEvent] = useState([]);

  const [programValue, setProgramValue] = useState();
  const [classId, setClassId] = useState();
  const [acaYear, setAcaYear] = useState();
  const [shift, setShift] = useState();
  const [section, setSection] = useState();
  const [event, setEvent] = useState();
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
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
            x.FullName.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const { studentAttendanceInitData, error: studentAttendanceInitDataError } =
    useSelector((state) => state.getAllStudentAttendanceInitialData);

  const { allEvents, success: getEventSuccess } = useSelector(
    (state) => state.getEvent
  );

  const { allStudentAttendance, error: allStudentAttendanceError } =
    useSelector((state) => state.getAllStudentAttendance);

  const { bulkStudentAttendance, error: bulkStudentAttendanceError } =
    useSelector((state) => state.getBulkStudentAttendance);

  const {
    success: postBulkStudentAttendanceSuccess,
    error: postBulkStudentAttendanceError,
  } = useSelector((state) => state.postBulkStudentAttendance);

  if (getEventSuccess) {
    setDdlEvent(allEvents);
    dispatch({ type: GET_EVENT_RESET });
  }

  if (studentAttendanceInitDataError) {
    setNotify({
      isOpen: true,
      message: studentAttendanceInitDataError,
      type: "error",
    });
    dispatch({ type: GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_RESET });
  }

  if (allStudentAttendanceError) {
    setNotify({
      isOpen: true,
      message: allStudentAttendanceError,
      type: "error",
    });
    dispatch({ type: GET_ALL_STUDEN_ATTENDANCE_RESET });
  }

  if (bulkStudentAttendanceError) {
    setNotify({
      isOpen: true,
      message: bulkStudentAttendanceError,
      type: "error",
    });
    dispatch({ type: GET_BULK_STUDENT_ATTENDANCE_RESET });
  }
  if (postBulkStudentAttendanceSuccess) {
    setNotify({
      isOpen: true,
      message: "Created Successfully Created",
      type: "success",
    });
    dispatch({ type: POST_BULK_STUDENT_ATTENDANCE_RESET });
    dispatch(
      getAllStudentAttendanceAction(
        acaYear,
        programValue,
        classId,
        section,
        shift,
        event
      )
    );
    setOpenPopup(false);
  }

  if (postBulkStudentAttendanceError) {
    setNotify({
      isOpen: true,
      message: postBulkStudentAttendanceError,
      type: "error",
    });
    dispatch({ type: POST_BULK_STUDENT_ATTENDANCE_RESET });
    setOpenPopup(false);
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "examination" });
    if (!studentAttendanceInitData) {
      dispatch(getAllStudentAttendanceInitialDataAction());
    }
    if (studentAttendanceInitData) {
      setProgramDdl(
        studentAttendanceInitData.searchFilterModel.ddlFacultyProgramLink
      );
      setDdlClass(studentAttendanceInitData.searchFilterModel.ddlClass);
      setAcademicYearDdl(
        studentAttendanceInitData.searchFilterModel.ddlAcademicYear
      );
      setDdlShift(studentAttendanceInitData.searchFilterModel.ddlAcademicShift);
      setDdlSection(studentAttendanceInitData.searchFilterModel.ddlSection);
    }
  }, [studentAttendanceInitData, dispatch]);

  useEffect(() => {
    if (allStudentAttendance) {
      setTableData(allStudentAttendance.dbModelLst);
    }
  }, [allStudentAttendance]);

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

  const handleProgramValue = (value) => {
    setProgramValue(value);
    if ((acaYear, classId, shift)) {
      dispatch(getEventAction(value, acaYear, classId, shift));
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

  const handleStudentSearch = () => {
    if (validate()) {
      dispatch(
        getAllStudentAttendanceAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event
        )
      );
    }
  };

  const handleBulkEdit = () => {
    if (validate()) {
      dispatch(
        getBulkStudentAttendanceAction(
          acaYear,
          programValue,
          classId,
          section,
          shift,
          event
        )
      );
    }
    setOpenPopup(true);
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
                onChange={(e) => handleProgramValue(e.target.value)}
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
                options={ddlSection ? ddlSection : test}
                errors={errors.section}
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
                errors={errors.event}
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
                BULK EDIT
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
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Academic Faculty"
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
        {allStudentAttendance && (
          <TableContainer className={classes.table}>
            <TblHead />

            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => (
                <StudentAttendanceTableCollapse
                  item={item}
                  key={item.$id}
                  attendance={
                    allStudentAttendance &&
                    allStudentAttendance.StudentAttendanceDays
                  }
                />
              ))}
            </TableBody>
          </TableContainer>
        )}

        {allStudentAttendance && <TblPagination />}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Bulk Edit"
      >
        <StudentAttendanceBulk
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
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default StudentAttendance;
