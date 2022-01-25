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
    { id: "IDHRTeacherFacultySubjectMappingHeader", label: "Teacher Name" },
    { id: "IDAcademicFacultySubjectLink", label: "Subject" },
    { id: "Created_On", label: "Created On" },
    { id: "Summary", label: "Summary" },
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
    useState(6);
  const dispatch = useDispatch();
  const classes = useStyles();

  const { searchTeacherFacInitData, error } = useSelector(
    (state) => state.getAllSearchTeacherFacSubInitialData
  );
  const {
    searchTeacherFacListData,
    currentQuery,
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

  const test = [{ Key: "", Value: "" }];

  const listSearchHandler = () => {
    dispatch(
      getAllSearchTeacherFacSubListDataAction(creationAccountSectionValue)
    );
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
        {searchTeacherFacInitData && (<TableContainer className={classes.table}>
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
          </TableContainer>)}
      </CustomContainer>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default SearchTeacherFacultySubject;
