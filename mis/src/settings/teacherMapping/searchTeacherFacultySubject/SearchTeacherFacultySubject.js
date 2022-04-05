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
import LoadingComp from "../../../components/LoadingComp";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SelectControl from "../../../components/controls/SelectControl";
import {
  GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_RESET,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_RESET,
} from "./SearchTeacherFacultySubjectConstants";
import {
  getAllSearchTeacherFacSubInitialDataAction,
  getAllSearchTeacherFacSubListDataAction,
} from "./SearchTeacherFacultySubjectActions";
import SearchTeacherFacultySubjectTableCollapse from "./SearchTeacherFacultySubjectTableCollapse";

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
  { id: "TeacherName", label: "Teacher Name" },
  { id: "IDYearFacultyLink", label: "Academic Year" },
  { id: "IDAcademicFacultySubjectLink", label: "Faculty/Program" },
  { id: "Level", label: "Class" },
  { id: "SubjectName", label: "Subject" },
  { id: "Section", label: "Section" },
  { id: "IDAcademicShift", label: "Academic Shift" },
  { id: "Created_On", label: "Created On" },
  { id: "IsActive", label: "IsActive" },
];

const SearchTeacherFacultySubject = () => {
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
  const [creationAccountSection, setCreationAccountSection] = useState([]);
  const [creationAccountSectionValue, setCreationAccountSectionValue] =
    useState();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();

  const { searchTeacherFacInitData, error } = useSelector(
    (state) => state.getAllSearchTeacherFacSubInitialData
  );
  const {
    searchTeacherFacListData,
    loading,
    error: searchTeacherFacListDataError,
  } = useSelector((state) => state.getAllSearchTeacherFacSubListData);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_RESET });
  }

  if (searchTeacherFacListDataError) {
    setNotify({
      isOpen: true,
      message: searchTeacherFacListDataError,
      type: "error",
    });
    dispatch({ type: GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_RESET });
  }

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  const handleSearch = (e) => {};
  useEffect(() => {
    if (!searchTeacherFacInitData) {
      dispatch(getAllSearchTeacherFacSubInitialDataAction());
    }
    if (searchTeacherFacInitData) {
      setCreationAccountSection(
        searchTeacherFacInitData.searchFilterModel.ddlTeacher
      );
    }
  }, [searchTeacherFacInitData]);

  useEffect(() => {
    if (searchTeacherFacListData) {
      setTableData(searchTeacherFacListData.dbModelLst);
    }
  }, [searchTeacherFacListData]);
  const validate = () => {
    let temp = {};
    temp.creationAccountSectionValue = !creationAccountSectionValue
      ? "This feild is required"
      : "";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const test = [{ Key: "", Value: "" }];

  const listSearchHandler = () => {
    if (validate()) {
      dispatch(
        getAllSearchTeacherFacSubListDataAction(creationAccountSectionValue)
      );
    }
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={4}>
              <SelectControl
                name="creationAccountSection"
                label="Search Teacher Faculty Subject"
                value={creationAccountSectionValue}
                onChange={(e) => setCreationAccountSectionValue(e.target.value)}
                options={creationAccountSection ? creationAccountSection : test}
                errors={errors.creationAccountSectionValue}
              />
            </Grid>
            <Grid item xs={4}>
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
        {loading ? (
          <LoadingComp />
        ) : (
          <>
        {searchTeacherFacInitData && (
          <TableContainer className={classes.table}>
            <TblHead />
            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => (
                <SearchTeacherFacultySubjectTableCollapse
                  item={item}
                  key={item.$id}
                  //   updateTeacherHandler={updateTeacherHandler}
                />
              ))}
            </TableBody>
          </TableContainer>
        )}
        </>
        )}
      </CustomContainer>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default SearchTeacherFacultySubject;
