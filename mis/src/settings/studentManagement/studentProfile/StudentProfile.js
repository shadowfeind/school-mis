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
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import SelectControl from "../../../components/controls/SelectControl";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";

import {
  getAllStudentProfileAction,
  getListStudentProfileAction,
  getSingleStudentProfileEditDataAction,
} from "./StudentProfileActions";
import {
  GET_ALL_STUDENT_PROFILE_RESET,
  GET_LIST_STUDENT_PROFILE_RESET,
  GET_SINGLE_STUDENT_PROFILE_EDIT_DATA_RESET,
  GET_SINGLE_STUDENT_PROFILE_PASSWORDRESET_DATA_RESET,
  RESET_SINGLE_STUDENT_PROFILE_PASSWORD_RESET,
  SINGLE_STUDENT_PROFILE_DETAILS_RESET,
  UPDATE_SINGLE_STUDENT_PROFILE_RESET,
} from "./StudentProfileConstants";
import StudentProfileTableCollapse from "./StudentProfileTableCollapse";
import StudentProfileReset from "./StudentProfileReset";
import StudentProfileForm from "./StudentProfileForm";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
}));

const tableHeader = [
  { id: "RollNo", label: "Roll No" },
  { id: "PUNumber", label: "Symbol Nubmber" },
  { id: "StudentName", label: "Full Name" },
  { id: "AcademicProgramName", label: "Program" },
  { id: "Email", label: "Email" },
  { id: "MobileNo", label: "Mobile" },
  { id: "Action", label: "Action", disableSorting: true },
];

const StudentProfile = () => {
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
  const [tableData, setTableData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [errors, setErrors] = useState({});
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [openResetPopup, setOpenResetPopup] = useState(false);
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

  const classes = useStyles();

  const dispatch = useDispatch();

  const { studentProfile, error } = useSelector(
    (state) => state.studentProfile
  );

  const { listStudentProfile, error: listStudentProfileError } = useSelector(
    (state) => state.getListStudentProfile
  );

  const {
    singleStudentProfileDetails,
    error: singleStudentProfileDetailsError,
  } = useSelector((state) => state.getSingleStudentProfileDetails);

  const {
    singleStudentProfilePasswordresetDataDetails,
    error: singleStudentProfilePasswordresetDataDetailsError,
  } = useSelector((state) => state.getSingleStudentProfilePasswordresetData);

  const {
    success: resetSingleStudentProfilePasswordSuccess,
    error: resetSingleStudentProfilePasswordError,
  } = useSelector((state) => state.resetSingleStudentProfilePassword);

  const { editSingleStudentData, error: editSingleStudentDataError } =
    useSelector((state) => state.getSingleStudentProfileEditData);

  const {
    success: updateSingleStudentProfileSuccess,
    error: updateSingleStudentProfileError,
  } = useSelector((state) => state.updateSingleStudentProfile);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_STUDENT_PROFILE_RESET });
  }
  if (listStudentProfileError) {
    setNotify({
      isOpen: true,
      message: listStudentProfileError,
      type: "error",
    });
    dispatch({ type: GET_LIST_STUDENT_PROFILE_RESET });
  }
  if (singleStudentProfileDetailsError) {
    setNotify({
      isOpen: true,
      message: singleStudentProfileDetailsError,
      type: "error",
    });
    dispatch({ type: SINGLE_STUDENT_PROFILE_DETAILS_RESET });
  }
  if (singleStudentProfilePasswordresetDataDetailsError) {
    setNotify({
      isOpen: true,
      message: singleStudentProfilePasswordresetDataDetailsError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_STUDENT_PROFILE_PASSWORDRESET_DATA_RESET });
  }
  if (resetSingleStudentProfilePasswordError) {
    setNotify({
      isOpen: true,
      message: resetSingleStudentProfilePasswordError,
      type: "error",
    });
    dispatch({ type: RESET_SINGLE_STUDENT_PROFILE_PASSWORD_RESET });
    setOpenResetPopup(false);
  }
  if (resetSingleStudentProfilePasswordSuccess) {
    setNotify({
      isOpen: true,
      message: "Password Reset Completed",
      type: "success",
    });
    dispatch({ type: RESET_SINGLE_STUDENT_PROFILE_PASSWORD_RESET });
    setOpenResetPopup(false);
  }
  if (editSingleStudentDataError) {
    setNotify({
      isOpen: true,
      message: editSingleStudentDataError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_STUDENT_PROFILE_EDIT_DATA_RESET });
    setOpenResetPopup(false);
  }
  if (updateSingleStudentProfileError) {
    setNotify({
      isOpen: true,
      message: updateSingleStudentProfileError,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_STUDENT_PROFILE_RESET });
    setOpenResetPopup(false);
  }
  if (updateSingleStudentProfileSuccess) {
    setNotify({
      isOpen: true,
      message: "Updated Successfully",
      type: "success",
    });
    dispatch(
      getListStudentProfileAction(
        academicYearValue,
        programValue,
        shiftValue,
        classOptValue,
        sectionValue
      )
    );
    dispatch({ type: UPDATE_SINGLE_STUDENT_PROFILE_RESET });
    setOpenPopup(false);
  }

  const deleteCollegeHandler = (id) => {};

  useEffect(() => {
    if (!studentProfile) {
      dispatch(getAllStudentProfileAction());
    }
    if (studentProfile) {
      setAcademicYear(studentProfile.searchFilterModel.ddlAcademicYear);
      setShift(studentProfile.searchFilterModel.ddlAcademicShift);
      setProgram(studentProfile.searchFilterModel.ddlFacultyProgramLink);
      setSection(studentProfile.ddlSection);
      setClassOpt(studentProfile.searchFilterModel.ddlClass);
    }
  }, [dispatch, studentProfile]);

  useEffect(() => {
    if (listStudentProfile) {
      setTableData([...listStudentProfile.dbModelLst]);
    }
  }, [listStudentProfile]);

  const validate = () => {
    let temp = {};
    temp.academicYearValue = !academicYearValue ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.shiftValue = !shiftValue ? "This feild is required" : "";
    temp.classOptValue = !classOptValue ? "This feild is required" : "";
    temp.sectionValue = !sectionValue ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
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

  const listSearchHandler = () => {
    if (validate()) {
      dispatch(
        getListStudentProfileAction(
          academicYearValue,
          programValue,
          shiftValue,
          classOptValue,
          sectionValue
        )
      );
    }
  };

  const updateFormHandler = (id) => {
    if (listStudentProfile) {
      dispatch(
        getSingleStudentProfileEditDataAction(
          id,
          listStudentProfile.searchFilterModel.idAcademicYear,

          listStudentProfile.searchFilterModel.idFacultyProgramLink,
          listStudentProfile.searchFilterModel.classSection,
          listStudentProfile.searchFilterModel.idClass,
          listStudentProfile.searchFilterModel.idShift
        )
      );
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
                options={academicYear}
                errors={errors.academicYearValue}
              />
            </Grid>
            <Grid item xs={2}>
              <SelectControl
                name="ddlFacultyProgramLink"
                label="Program / Faculty"
                value={programValue}
                onChange={(e) => setProgramValue(e.target.value)}
                options={program}
                errors={errors.programValue}
              />
            </Grid>
            <Grid item xs={2}>
              <SelectControl
                name="ddlClass"
                label="Class"
                value={classOptValue}
                onChange={(e) => setClassOptValue(e.target.value)}
                options={classOpt}
                errors={errors.classOptValue}
              />
            </Grid>

            <Grid item xs={2}>
              <SelectControl
                name="ddlSection"
                label="Section"
                value={sectionValue}
                onChange={(e) => setSectionValue(e.target.value)}
                options={section}
                errors={errors.sectionValue}
              />
            </Grid>
            <Grid item xs={2}>
              <SelectControl
                name="ddlAcademicShift"
                label="Shift"
                value={shiftValue}
                onChange={(e) => setShiftValue(e.target.value)}
                options={shift}
                errors={errors.shiftValue}
              />
            </Grid>
            <Grid item xs={3}>
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
        <TableContainer className={classes.table}>
          <TblHead />
          {listStudentProfile && (
            <TableBody>
              {tableDataAfterPagingAndSorting().map((item, index) => (
                <StudentProfileTableCollapse
                  item={item}
                  key={item.$id}
                  selectedIndex={selectedIndex}
                  index={index}
                  setSelectedIndex={setSelectedIndex}
                  year={listStudentProfile.searchFilterModel.idAcademicYear}
                  program={
                    listStudentProfile.searchFilterModel.idFacultyProgramLink
                  }
                  section={listStudentProfile.searchFilterModel.classSection}
                  classId={listStudentProfile.searchFilterModel.idClass}
                  shift={listStudentProfile.searchFilterModel.idShift}
                  studentDetails={singleStudentProfileDetails}
                  studentDetails={
                    singleStudentProfileDetails &&
                    singleStudentProfileDetails.hrEmployeeModel
                  }
                  setOpenResetPopup={setOpenResetPopup}
                  updateFormHandler={updateFormHandler}
                  // deleteCollegeHandler={deleteCollegeHandler}
                />
              ))}
            </TableBody>
          )}
        </TableContainer>
        {listStudentProfile && <TblPagination />}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Level Up Reassociate Students"
      >
        <StudentProfileForm
          studentData={editSingleStudentData && editSingleStudentData}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <Popup
        openPopup={openResetPopup}
        setOpenPopup={setOpenResetPopup}
        title="Reset Student Details"
      >
        <StudentProfileReset
          studentDetails={
            singleStudentProfilePasswordresetDataDetails &&
            singleStudentProfilePasswordresetDataDetails.hrEmployeeModel
          }
          setOpenResetPopup={setOpenResetPopup}
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

export default StudentProfile;
