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
  CREATE_SINGLE_TEACHER_FAC_SUB_RESET,
  CREATE_TEACHER_FAC_SUB_INITIAL_DATA_RESET,
  GET_ALL_TEACHER_FAC_SUB_INITIAL_DATA_RESET,
  GET_ALL_TEACHER_FAC_SUB_LIST_DATA_RESET,
  GET_SINGLE_TEACHER_FAC_SUB_DATA_RESET,
  SINGLE_TEACHER_FAC_SUB_EDIT_RESET,
} from "./TeacherFacultySubjectConstants";
import {
  createTeacherFacSubInitDataAction,
  getAllTeacherFacSubInitialDataAction,
  getAllTeacherFacSubListDataAction,
  getSingleTeacherFacSubDataAction,
} from "./TeacherFacultySubjectActions";
import TeacherFacultySubjectTableCollapse from "./TeacherFacultySubjectTableCollapse";
import TeacherFacultySubjectForm from "./TeacherFacultySubjectForm";

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
  { id: "IDHRTeacherFacultySubjectMappingHeader", label: "Teacher Name" },
  { id: "IDAcademicFacultySubjectLink", label: "Subject" },
  { id: "Created_On", label: "Created On" },
  { id: "Summary", label: "Summary" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const TeacherFacultySubject = () => {
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
  const [academicYear, setAcademicYear] = useState([]);
  const [academicYearValue, setAcademicYearValue] = useState();
  const [shift, setShift] = useState([]);
  const [shiftValue, setShiftValue] = useState();
  const [program, setProgram] = useState([]);
  const [programValue, setProgramValue] = useState();
  const [section, setSection] = useState([]);
  const [sectionValue, setSectionValue] = useState();
  const [classOpt, setClassOpt] = useState([]);
  const [classOptValue, setClassOptValue] = useState();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();

  const { teacherFacInitData, error } = useSelector(
    (state) => state.getAllTeacherFacSubInitialData
  );

  const {
    teacherFacListData,
    currentQuery,
    error: teacherFacListDataError,
  } = useSelector((state) => state.getAllTeacherFacSubListData);

  const { singleTeacherFacData, error: singleTeacherFacDataError } =
    useSelector((state) => state.getSingleTeacherFacSubData);

  const {
    success: singleTeacherFacSubEditSuccess,
    error: singleTeacherFacSubEditError,
  } = useSelector((state) => state.singleTeacherFacSubEdit);

  const {
    success: createSingleTeacherFacSubSuccess,
    error: createSingleTeacherFacSubError,
  } = useSelector((state) => state.createSingleTeacherFacSub);

  const { createInitTeacherFacData, error: createInitTeacherFacDataError } =
    useSelector((state) => state.createTeacherFacSubInitData);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_TEACHER_FAC_SUB_INITIAL_DATA_RESET });
  }
  if (teacherFacListDataError) {
    setNotify({
      isOpen: true,
      message: teacherFacListDataError,
      type: "error",
    });
    dispatch({ type: GET_ALL_TEACHER_FAC_SUB_LIST_DATA_RESET });
  }
  if (singleTeacherFacDataError) {
    setNotify({
      isOpen: true,
      message: singleTeacherFacDataError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TEACHER_FAC_SUB_DATA_RESET });
  }
  if (singleTeacherFacSubEditError) {
    setNotify({
      isOpen: true,
      message: singleTeacherFacSubEditError,
      type: "error",
    });
    dispatch({ type: SINGLE_TEACHER_FAC_SUB_EDIT_RESET });
  }
  if (singleTeacherFacSubEditSuccess) {
    if (currentQuery) {
      dispatch(
        getAllTeacherFacSubListDataAction(
          currentQuery.year,
          currentQuery.program,
          currentQuery.classId,
          currentQuery.section,
          currentQuery.shift
        )
      );
    }
    setNotify({
      isOpen: true,
      message: "Created Successfully",
      type: "success",
    });
    dispatch({ type: SINGLE_TEACHER_FAC_SUB_EDIT_RESET });
    setOpenPopup(false);
  }

  if (createSingleTeacherFacSubError) {
    setNotify({
      isOpen: true,
      message: createSingleTeacherFacSubError,
      type: "error",
    });
    dispatch({ type: CREATE_SINGLE_TEACHER_FAC_SUB_RESET });
  }

  if (createSingleTeacherFacSubSuccess) {
    dispatch(
      getAllTeacherFacSubListDataAction(
        academicYearValue,
        programValue,
        classOptValue,
        sectionValue,
        shiftValue
      )
    );
    setNotify({
      isOpen: true,
      message: "Successfully Created",
      type: "success",
    });
    dispatch({ type: CREATE_SINGLE_TEACHER_FAC_SUB_RESET });
  }

  if (createInitTeacherFacDataError) {
    setNotify({
      isOpen: true,
      message: createInitTeacherFacDataError,
      type: "error",
    });
    dispatch({ type: CREATE_TEACHER_FAC_SUB_INITIAL_DATA_RESET });
  }

  if (createSingleTeacherFacSubError) {
    setNotify({
      isOpen: true,
      message: createSingleTeacherFacSubError,
      type: "error",
    });
    dispatch({ type: CREATE_SINGLE_TEACHER_FAC_SUB_RESET });
  }

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  const handleSearch = (e) => {
    //not working because it is Number
    // setFilterFn({
    //   fn: (item) => {
    //     if (e.target.value === "") {
    //       return item;
    //     } else {
    //       return item.filter((x) =>
    //         x.IDHRTeacherFacultySubjectMappingHeader.toLowerCase().includes(
    //           e.target.value
    //         )
    //       );
    //     }
    //   },
    // });
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

    
  useEffect(() => {
    if (!teacherFacInitData) {
      dispatch(getAllTeacherFacSubInitialDataAction());
    }
    if (teacherFacInitData) {
      setAcademicYear(teacherFacInitData.searchFilterModel.ddlAcademicYear);
      setShift(teacherFacInitData.searchFilterModel.ddlAcademicShift);
      setProgram(teacherFacInitData.searchFilterModel.ddlFacultyProgramLink);
      setSection(teacherFacInitData.searchFilterModel.ddlSection);
      setClassOpt(teacherFacInitData.searchFilterModel.ddlClass);
    }
  }, [teacherFacInitData]);

  useEffect(() => {
    if (teacherFacListData) {
      setTableData(teacherFacListData.dbModelLst);
    }
  }, [teacherFacListData]);

  const validate=()=>{
    let temp ={};
    temp.academicYearValue = !academicYearValue ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classOptValue = !classOptValue ? "This feild is required" : "";
    temp.sectionValue = !sectionValue ? "This feild is required" : "";
    temp.shiftValue = !shiftValue ? "This feild is required" : "";
    
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  }

  const test = [{ Key: "", Value: "" }];

  const updateTeacherHandler = (id, teacherId) => {
    dispatch(
      getSingleTeacherFacSubDataAction(
        id,
        academicYearValue,
        programValue,
        classOptValue,
        sectionValue,
        shiftValue,
        teacherId
      )
    );
    setOpenPopup(true);
  };

  const listSearchHandler = () => {
    if(validate()){
    dispatch(
      getAllTeacherFacSubListDataAction(
        academicYearValue,
        programValue,
        classOptValue,
        sectionValue,
        shiftValue
      )
    );
      }
  };

  const handleCreate = () => {
    if(validate()){
    dispatch(
      createTeacherFacSubInitDataAction(
        academicYearValue,
        programValue,
        classOptValue,
        sectionValue,
        shiftValue
      )
    );
    dispatch({ type: GET_SINGLE_TEACHER_FAC_SUB_DATA_RESET });
    setOpenPopup(true);
      }
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
                onChange={(e) => setAcademicYearValue(e.target.value)}
                options={academicYear ? academicYear : test}
                errors={errors.academicYearValue}
              />
            </Grid>
            <Grid item xs={2}>
              <SelectControl
                name="ddlFacultyProgramLink"
                label="Program / Faculty"
                value={programValue}
                onChange={(e) => setProgramValue(e.target.value)}
                options={program ? program : test}
                errors={errors.programValue}
              />
            </Grid>
            <Grid item xs={2}>
              <SelectControl
                name="ddlClass"
                label="Class"
                value={classOptValue}
                onChange={(e) => setClassOptValue(e.target.value)}
                options={classOpt ? classOpt : test}
                errors={errors.classOptValue}
              />
            </Grid>

            <Grid item xs={2}>
              <SelectControl
                name="ddlSection"
                label="Section"
                value={sectionValue}
                onChange={(e) => setSectionValue(e.target.value)}
                options={section ? section : test}
                errors={errors.sectionValue}
              />
            </Grid>
            <Grid item xs={2}>
              <SelectControl
                name="ddlAcademicShift"
                label="Shift"
                value={shiftValue}
                onChange={(e) => setShiftValue(e.target.value)}
                options={shift ? shift : test}
                errors={errors.shiftValue}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleCreate}
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
        {teacherFacListData && (
          <TableContainer className={classes.table}>
            <TblHead />
            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => (
                <TeacherFacultySubjectTableCollapse
                  item={item}
                  key={item.$id}
                  updateTeacherHandler={updateTeacherHandler}
                />
              ))}
            </TableBody>
          </TableContainer>
        )}
        {teacherFacListData && <TblPagination />}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Teacher Faculty Subject Form"
      >
        <TeacherFacultySubjectForm
          editData={singleTeacherFacData && singleTeacherFacData}
          createData={createInitTeacherFacData && createInitTeacherFacData}
          setOpenPopup={setOpenPopup}
          section={
            createInitTeacherFacData &&
            createInitTeacherFacData.searchFilterModel.section
          }
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

export default TeacherFacultySubject;
