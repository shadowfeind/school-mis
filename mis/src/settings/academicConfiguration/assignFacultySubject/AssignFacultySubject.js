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
  AcademicFacultyCreateAction,
  getALLAssignFacultySubject,
  getAssignFacultySubjectOptionAction,
  getListAssignFacultySubject,
  getAssignFacultySubjectEditAction,
} from "./AssignFacultySubjectActions";
import AssignFacultySubjectTableCollepse from "./AssignFacultySubjectTableCollapse";
import AssignFacultySubjectFormCreate from "./AssignFacultySubjectFormCreate";
import {
  ASSIGN_FACULTY_SUBJECT_EDIT_POST_RESET,
  ASSIGN_FACULTY_SUBJECT_POST_RESET,
} from "./AssignFacultySubjectConstants";
import AssignFacultySubjectFormEdit from "./AssignFacultySubjectFormEdit";

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
  const [openPopupForm, setOpenPopupForm] = useState(false);
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
  const [classId, setClassId] = useState(14);
  const [acaYear, setAcaYear] = useState(55);
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

  const { success: facultySubjectSuccess, error: facultySubjectError } =
    useSelector((state) => state.assignFacultySubjectPost);

  const { singleFacultySubject } = useSelector(
    (state) => state.assignFacultySubjectEdit
  );

  const { success: singleFacultyEditSuccess } = useSelector(
    (state) => state.assignFacultySubjectEditPost
  );

  if (singleFacultyEditSuccess) {
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    dispatch({ type: ASSIGN_FACULTY_SUBJECT_EDIT_POST_RESET });
  }
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
      setProgramDdl(
        allAcademicSubjects.searchFilterModel.ddlFacultyProgramLink
      );
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
            x.SubjectName.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const updateFacultySubjectHandler = (id) => {
    dispatch(
      getAssignFacultySubjectEditAction(id, acaYear, programValue, classId)
    );
    setOpenPopupForm(true);
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
    dispatch(
      AcademicFacultyCreateAction(
        academicSubjects.idYearFacultyProgramLink,
        academicSubjects.level,
        formCheck
      )
    );
    // console.log(formCheck);
    setOpenPopup(false);
  };

  if (facultySubjectSuccess) {
    setFormCheck([]);
    dispatch({ type: ASSIGN_FACULTY_SUBJECT_POST_RESET });
    dispatch(getListAssignFacultySubject(acaYear, programValue, classId));
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
  }
  if (facultySubjectError) {
    setFormCheck([]);
    dispatch({ type: ASSIGN_FACULTY_SUBJECT_POST_RESET });
    setNotify({
      isOpen: true,
      message: facultySubjectError,
      type: "error",
    });
  }
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
                value={acaYear}
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
                value={classId}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleCreateClick}
                type="submit"
              >
                CREATE
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={listSearchHandler}
                type="submit"
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
                  key={item.$id}
                  updateFacultySubjectHandler={updateFacultySubjectHandler}
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
        title="Add Academic Faculty Subject"
      >
        <AssignFacultySubjectFormCreate
          subjectOptions={
            academicSubjects && academicSubjects.ddlSubjectModelLst
          }
          setFormCheck={setFormCheck}
          formCheckSubmitHandler={formCheckSubmitHandler}
        />
      </Popup>
      <Popup
        openPopup={openPopupForm}
        setOpenPopup={setOpenPopupForm}
        title="Edit Academic Faculty Subject"
      >
        <AssignFacultySubjectFormEdit
          singleFacultySubject={
            singleFacultySubject && singleFacultySubject.model
          }
          dbModel={singleFacultySubject && singleFacultySubject.dbModel}
          idYearFacultyProgramLink={
            singleFacultySubject &&
            singleFacultySubject.idYearFacultyProgramLink
          }
          level={singleFacultySubject && singleFacultySubject.level}
          setOpenPopupForm={setOpenPopupForm}
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
