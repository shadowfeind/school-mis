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
import { getAcademicYearCalendarProgramAction } from "../academicYearCalendar/AcademicYearCalendarActions";
import {
  getALLAssignFacultySubject,
  getAssignFacultySubjectOptionAction,
  getListAssignFacultySubject,
} from "./AssignFacultySubjectActions";
import AssignFacultySubjectTableCollepse from "./AssignFacultySubjectTableCollapse";
import AssignFacultySubjectFormCreate from "./AssignFacultySubjectFormCreate";

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
  { id: "SubjectName", label: "Subject Name" },
  { id: "SubjectCode", label: "Subject Code" },
  { id: "IsOptional", label: "Optional" },
  { id: "IsCompulsory", label: "Compulsory" },
  { id: "IsTheoritical", label: "Theoritical" },
  { id: "IsPractical", label: "Practical" },
  { id: "CreditHour", label: "Credit Hour" },
  { id: "IsActive", label: "Active" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AssignFacultySubject = () => {
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
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [programValue, setProgramValue] = useState(6);
  const [classId, setClassId] = useState(0);
  const [acaYear, setAcaYear] = useState(0);
  const [formCheck, setFormCheck] = useState([]);

  const classes = useStyles();

  const dispatch = useDispatch();

  const { allAcademicSubjects } = useSelector(
    (state) => state.getAllAssignFacultySubject
  );

  const { academicYearCalendarProgram } = useSelector(
    (state) => state.getAcademicYearCalendarProgram
  );

  const { academicSubjectsList } = useSelector(
    (state) => state.getListAssignFacultySubject
  );

  const { academicSubjects } = useSelector(
    (state) => state.getAssignFacultySubjectOption
  );

  // if (createAcademicYearCalendarSuccess) {
  //   dispatch(getAllAcademicYearCalendarAction());
  //   setNotify({
  //     isOpen: true,
  //     message: "Created Succesfully",
  //     type: "success",
  //   });
  //   setOpenPopup(false);
  //   dispatch({ type: ACADEMIC_YEAR_CREATE_RESET });
  // }

  const updateCollegeHandler = (id) => {
    // dispatch(getSingleAcademicYearAction(id));
    // setOpenPopup(true);
  };

  const deleteCollegeHandler = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to Delete this record?",
      subTitle: "You cannot undo this action",
    });
  };

  useEffect(() => {
    if (!allAcademicSubjects) {
      dispatch(getALLAssignFacultySubject());
    }
    if (allAcademicSubjects) {
      // setTableData(academicYearCalendar.dbModelLst);
      setDdlClass(allAcademicSubjects.searchFilterModel.ddlClass);
      setAcademicYearDdl(allAcademicSubjects.searchFilterModel.ddlAcademicYear);
    }
  }, [dispatch, allAcademicSubjects]);

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

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_ACADEMIC_YEAR_CALENDAR_RESET });
    setOpenPopup(true);
  };

  const handleSelectChange = (value) => {
    dispatch(getAcademicYearCalendarProgramAction(value));
  };

  const listSearchHandler = () => {
    dispatch(getListAssignFacultySubject(acaYear, programValue, classId));
  };

  useEffect(() => {
    if (academicYearCalendarProgram) {
      setProgramDdl([...academicYearCalendarProgram.ddlFacultyProgramLink]);
    }
  }, [academicYearCalendarProgram]);
  useEffect(() => {
    if (academicSubjectsList) {
      setTableData(academicSubjectsList.dbModelLst);
    }
  }, [academicSubjectsList]);

  const handleAcademicYearChange = (e) => {
    handleSelectChange(e.target.value);
    setAcaYear(e.target.value);
  };

  const handleClassChange = (e) => {
    setClassId(e.target.value);
  };

  const handleCreateClick = () => {
    dispatch(
      getAssignFacultySubjectOptionAction(acaYear, programValue, classId)
    );
    setOpenPopup(true);
  };

  const formCheckSubmitHandler = () => {
    console.log(formCheck);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="academic year"
                label="Academic Year"
                onChange={(e) => handleAcademicYearChange(e)}
                options={academicYearDdl}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="program"
                label="Program/Faculty"
                value={programValue}
                // onChange={(e) => handleProgramChange(e)}
                options={programDdl}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="classes"
                label="Classes"
                onChange={(e) => handleClassChange(e)}
                options={ddlClass}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleCreateClick}
              >
                CREATE
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
        {academicSubjectsList && (
          <TableContainer className={classes.table}>
            <TblHead />

            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => (
                <AssignFacultySubjectTableCollepse
                  item={item}
                  key={item.id}
                  updateCollegeHandler={updateCollegeHandler}
                  deleteCollegeHandler={deleteCollegeHandler}
                />
              ))}
            </TableBody>
          </TableContainer>
        )}
        {academicSubjectsList && <TblPagination />}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Add Academic Subject"
      >
        <AssignFacultySubjectFormCreate
          subjectOptions={
            academicSubjects && academicSubjects.ddlSubjectModelLst
          }
          setFormCheck={setFormCheck}
          formCheckSubmitHandler={formCheckSubmitHandler}
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

export default AssignFacultySubject;
