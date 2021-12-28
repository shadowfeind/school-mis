import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import useCustomTable from "../../../customHooks/useCustomTable";
import InputControl from "../../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SelectControl from "../../../components/controls/SelectControl";
import {
  getAllReassociateStudentsAction,
  getReassociateStudentsLevelupAction,
  getReassociateStudentsLevelupPostAction,
  getReassociateStudentsListsAction,
} from "./ReassociateStudentActions";
import ReassociateStudentTableCollapse from "./ReassociateStudentTableCollapse";
import ReassociateStudentLevelUp from "./ReassociateStudentLevelUp";
import { GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_RESET } from "./ReassociateStudentConstants";
import ReassociateStudentSearchEditForm from "./ReassociateStudentSearchEditForm";

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

const tableHeader = [
  { id: "StudentName", label: "Student Name" },
  { id: "RollNo", label: "Roll No" },
  { id: "PUNumber", label: "Symbol Number" },
  { id: "AcademicProgramName", label: "ProgramName" },
  { id: "Email", label: "Email" },
  { id: "MobileNo", label: "Mobile No" },
  { id: "LevelStatus", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const ReassociateStudent = () => {
  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupEdit, setOpenPopupEdit] = useState(false);
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
  const [academicYear, setAcademicYear] = useState([]);
  const [academicYearValue, setAcademicYearValue] = useState(55);
  const [shift, setShift] = useState([]);
  const [shiftValue, setShiftValue] = useState(2);
  const [program, setProgram] = useState([]);
  const [programValue, setProgramValue] = useState(6);
  const [section, setSection] = useState([]);
  const [sectionValue, setSectionValue] = useState(1);
  const [classOpt, setClassOpt] = useState([]);
  const [classOptValue, setClassOptValue] = useState(14);
  const [formCheck, setFormCheck] = useState([]);

  const dispatch = useDispatch();
  const classes = useStyles();
  const { allReassociateStudents } = useSelector(
    (state) => state.getAllReassociateStudents
  );

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
            x.StudentName.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const { reassociateStudentLists } = useSelector(
    (state) => state.getReassociateStudentsLists
  );

  const { reassociateStudentLevel } = useSelector(
    (state) => state.getReassociateStudentsLevelup
  );

  const { success: reassociatePostSuccess } = useSelector(
    (state) => state.getReassociateStudentsLevelupPost
  );

  if (reassociatePostSuccess) {
    setFormCheck([]);
    dispatch({ type: GET_REASSOCIATE_STUDENTS_LEVEL_UP_POST_RESET });
    setNotify({
      isOpen: true,
      message: "Edited Succesfully",
      type: "success",
    });
  }
  const handleAcademicYearChange = (e) => {
    setAcademicYearValue(e.target.value);
    setProgramValue(6);
  };
  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
    if (!allReassociateStudents) {
      dispatch(getAllReassociateStudentsAction());
    }
    if (allReassociateStudents) {
      setAcademicYear(allReassociateStudents.searchFilterModel.ddlAcademicYear);
      setShift(allReassociateStudents.searchFilterModel.ddlAcademicShift);
      setProgram(
        allReassociateStudents.searchFilterModel.ddlFacultyProgramLink
      );
      setSection(allReassociateStudents.ddlSection);
      setClassOpt(allReassociateStudents.searchFilterModel.ddlClass);
    }
  }, [allReassociateStudents]);

  useEffect(() => {
    if (reassociateStudentLists) {
      setTableData(reassociateStudentLists.dbModelLst);
    }
  }, [reassociateStudentLists]);

  const listSearchHandler = () => {
    dispatch(
      getReassociateStudentsListsAction(
        academicYearValue,
        programValue,
        shiftValue,
        classOptValue,
        sectionValue
      )
    );
  };
  const handleLevelup = () => {
    dispatch(
      getReassociateStudentsLevelupAction(
        academicYearValue,
        programValue,
        shiftValue,
        classOptValue,
        sectionValue
      )
    );
    setOpenPopup(true);
  };

  const formCheckSubmitHandler = () => {
    dispatch(
      getReassociateStudentsLevelupPostAction(
        formCheck,
        reassociateStudentLevel.searchFilterModel
      )
    );
    console.log(formCheck);
    setOpenPopup(false);
  };

  const updateFormHandler = () => {
    setOpenPopupEdit(true);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={2}>
              <SelectControl
                name="academicYear"
                label="Academic Year"
                value={academicYearValue}
                onChange={(e) => handleAcademicYearChange(e)}
                options={academicYear}
              />
            </Grid>
            <Grid item xs={2}>
              <SelectControl
                name="ddlFacultyProgramLink"
                label="Program / Faculty"
                value={programValue}
                options={program}
              />
            </Grid>
            <Grid item xs={2}>
              <SelectControl
                name="ddlClass"
                label="Class"
                value={classOptValue}
                onChange={(e) => setClassOptValue(e.target.value)}
                options={classOpt}
              />
            </Grid>

            <Grid item xs={2}>
              <SelectControl
                name="ddlSection"
                label="Section"
                value={sectionValue}
                onChange={(e) => setSectionValue(e.target.value)}
                options={section}
              />
            </Grid>
            <Grid item xs={2}>
              <SelectControl
                name="ddlAcademicShift"
                label="Shift"
                value={shiftValue}
                onChange={(e) => setShiftValue(e.target.value)}
                options={shift}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleLevelup}
              >
                LEVEL UP
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={listSearchHandler}
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
            label="Search Reassociate Student"
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
        {reassociateStudentLists && (
          <TableContainer className={classes.table}>
            <TblHead />

            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => (
                <ReassociateStudentTableCollapse
                  item={item}
                  key={item.$id}
                  updateFormHandler={updateFormHandler}
                  // deleteCollegeHandler={deleteCollegeHandler}
                />
              ))}
            </TableBody>
          </TableContainer>
        )}
        {reassociateStudentLists && <TblPagination />}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Level Up Reassociate Students"
      >
        <ReassociateStudentLevelUp
          dbModelLst={
            reassociateStudentLevel && reassociateStudentLevel.dbModelLst
          }
          ddlSection={
            reassociateStudentLevel && reassociateStudentLevel.ddlSection
          }
          ddlLevelStatus={
            reassociateStudentLevel && reassociateStudentLevel.ddlLevelStatus
          }
          setOpenPopup={setOpenPopup}
          setFormCheck={setFormCheck}
          formCheckSubmitHandler={formCheckSubmitHandler}
        />
      </Popup>
      <Popup
        openPopup={openPopupEdit}
        setOpenPopup={setOpenPopupEdit}
        title="Edit Reassociate Students"
      >
        <ReassociateStudentSearchEditForm />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default ReassociateStudent;
