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
  GET_ALL_CLASS_SUBJECT_RESET,
  GET_CLASS_SUBJECT_LIST_RESET,
  GET_SINGLE_CLASS_SUBJECT_RESET,
  GET_TO_CREATE_CLASS_SUBJECT_RESET,
  POST_TO_CREATE_CLASS_SUBJECT_RESET,
  UPDATE_SINGLE_CLASS_SUBJECT_RESET,
} from "./ClassSubjectConstants";
import {
  createSingleClassSubjectAction,
  getALLClassSubjectAction,
  getClassSubjectListAction,
  getSingleClassSubjectAction,
  getToCreateClassSubjectAction,
} from "./ClassSubjectActions";
import ClassSubjectTableCollapse from "./ClassSubjectTableCollapse";
import ClassSubjectEditForm from "./ClassSubjectEditForm";
import ClassSubjectCreateForm from "./ClassSubjectCreateForm";

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

const ClassSubject = () => {
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
  const [classId, setClassId] = useState(14);
  const [formCheck, setFormCheck] = useState([]);
  const classes = useStyles();

  const dispatch = useDispatch();

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

  const { allClassSubjects, error } = useSelector(
    (state) => state.getAllClassSubject
  );

  const { listClassSubjects, error: listClassSubjectsError } = useSelector(
    (state) => state.getClassSubjectList
  );

  const { createClassSubjects, error: createClassSubjectsError } = useSelector(
    (state) => state.getToCreateClassSubject
  );

  const { singleClassSubject, error: singleClassSubjectError } = useSelector(
    (state) => state.getSingleClassSubject
  );

  const {
    success: updateSingleClassSubjectSuccess,
    error: updateSingleClassSubjectError,
  } = useSelector((state) => state.updateSingleClassSubject);

  const {
    success: postToCreateClassSubjectSuccess,
    error: postToCreateClassSubjectError,
  } = useSelector((state) => state.postToCreateClassSubject);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_CLASS_SUBJECT_RESET });
  }
  if (listClassSubjectsError) {
    setNotify({
      isOpen: true,
      message: listClassSubjectsError,
      type: "error",
    });
    dispatch({ type: GET_CLASS_SUBJECT_LIST_RESET });
  }
  if (createClassSubjectsError) {
    setNotify({
      isOpen: true,
      message: createClassSubjectsError,
      type: "error",
    });
    dispatch({ type: GET_TO_CREATE_CLASS_SUBJECT_RESET });
  }
  if (singleClassSubjectError) {
    setNotify({
      isOpen: true,
      message: singleClassSubjectError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_CLASS_SUBJECT_RESET });
  }
  if (updateSingleClassSubjectError) {
    setNotify({
      isOpen: true,
      message: updateSingleClassSubjectError,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_CLASS_SUBJECT_RESET });
    setOpenPopupForm(false);
  }
  if (updateSingleClassSubjectSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    dispatch(getClassSubjectListAction(classId));
    dispatch({ type: UPDATE_SINGLE_CLASS_SUBJECT_RESET });
    setOpenPopupForm(false);
  }
  if (postToCreateClassSubjectSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    dispatch({ type: POST_TO_CREATE_CLASS_SUBJECT_RESET });
  }
  if (postToCreateClassSubjectError) {
    setNotify({
      isOpen: true,
      message: postToCreateClassSubjectError,
      type: "error",
    });
    dispatch({ type: POST_TO_CREATE_CLASS_SUBJECT_RESET });
  }

  useEffect(() => {
    if (!allClassSubjects) {
      dispatch(getALLClassSubjectAction());
    }
    if (allClassSubjects) {
      setDdlClass(allClassSubjects.searchFilterModel.ddlClass);
    }
  }, [dispatch, allClassSubjects]);

  const listSearchHandler = () => {
    dispatch(getClassSubjectListAction(classId));
  };

  const handleCreateClick = () => {
    dispatch(getToCreateClassSubjectAction(classId));
    setOpenPopup(true);
  };

  const updateClassSubject = (id) => {
    dispatch(getSingleClassSubjectAction(id));
    setOpenPopupForm(true);
  };
  const formCheckSubmitHandler = () => {
    dispatch(
      createSingleClassSubjectAction(
        createClassSubjects.idYearFacultyProgramLink,
        createClassSubjects.level,
        formCheck
      )
    );
    setOpenPopup(false);
  };

  useEffect(() => {
    if (listClassSubjects) {
      setTableData(listClassSubjects.dbModelLst);
    }
  }, [listClassSubjects]);

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="classes"
                label="Classes"
                onChange={(e) => setClassId(e.target.value)}
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
            label="Search Class Subject"
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
        {listClassSubjects && (
          <TableContainer className={classes.table}>
            <TblHead />

            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => (
                <ClassSubjectTableCollapse
                  item={item}
                  key={item.$id}
                  updateClassSubject={updateClassSubject}
                  //   deleteCollegeHandler={deleteCollegeHandler}
                />
              ))}
            </TableBody>
          </TableContainer>
        )}
        {listClassSubjects && <TblPagination />}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Add Class Subject"
      >
        <ClassSubjectCreateForm
          subjectOptions={
            createClassSubjects && createClassSubjects.ddlSubjectModelLst
          }
          setFormCheck={setFormCheck}
          formCheckSubmitHandler={formCheckSubmitHandler}
        />
      </Popup>
      <Popup
        openPopup={openPopupForm}
        setOpenPopup={setOpenPopupForm}
        title="Edit Class Subject"
      >
        <ClassSubjectEditForm
          singleClassSubject={singleClassSubject && singleClassSubject.model}
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

export default ClassSubject;
