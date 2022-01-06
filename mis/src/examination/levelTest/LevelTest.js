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
import { getInitialLevelTestDataAction } from "./LevelTestActions";
import { getEventAction } from "../examMarkEntry/ExamMarkEntryActions";
import { GET_EVENT_RESET } from "../examMarkEntry/ExamMarkEntryConstants";

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
 * get event name  has same api
 * as exam mark entry so i have used same reducers and actions
 */

const LevelTest = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlEvent, setDdlEvent] = useState([]);
  const [programValue, setProgramValue] = useState(6);
  const [classId, setClassId] = useState();
  const [acaYear, setAcaYear] = useState(55);
  const [shift, setShift] = useState(2);
  const [section, setSection] = useState(1);
  const [event, setEvent] = useState(20027);

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
            x.EventName.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const { levelTestInitialDatas } = useSelector(
    (state) => state.getInitialLevelTestData
  );

  const { allEvents, success: getEventSuccess } = useSelector(
    (state) => state.getEvent
  );

  if (getEventSuccess) {
    setDdlEvent(allEvents);
    dispatch({ type: GET_EVENT_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "examination" });
    if (!levelTestInitialDatas) {
      dispatch(getInitialLevelTestDataAction());
    }
    if (levelTestInitialDatas) {
      setProgramDdl(
        levelTestInitialDatas.searchFilterModel.ddlFacultyProgramLink
      );
      setDdlClass(levelTestInitialDatas.searchFilterModel.ddlClass);
      setAcademicYearDdl(
        levelTestInitialDatas.searchFilterModel.ddlAcademicYear
      );
      setDdlShift(levelTestInitialDatas.searchFilterModel.ddlAcademicShift);
      setDdlSection(levelTestInitialDatas.searchFilterModel.ddlSection);
    }
  }, [levelTestInitialDatas, dispatch]);

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
                onChange={(e) => setShift(e.target.value)}
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
                name="EventName"
                label="Event Name"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                options={ddlEvent ? ddlEvent : test}
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
                EDIT
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                // onClick={handleExamApprovalSearch}
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

export default LevelTest;
