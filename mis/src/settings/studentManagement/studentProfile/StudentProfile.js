import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
} from "@material-ui/core";
import useCustomTable from "../../../customHooks/useCustomTable";
import InputControl from "../../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../../components/Popup";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";

import { getAllStudentProfileAction } from "./StudentProfileActions";

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
  { id: "RegNo", label: "Reg No" },
  { id: "FullName", label: "Full Name" },
  { id: "Program", label: "Program" },
  { id: "Email", label: "Email" },
  { id: "Mobile", label: "Mobile" },
  { id: "Status", label: "Status" },
];

const StudentProfile = () => {
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

  const classes = useStyles();

  const dispatch = useDispatch();

  const { loading, studentProfile } = useSelector(
    (state) => state.studentProfile
  );

  const updateCollegeHandler = (id) => {};

  const deleteCollegeHandler = (id) => {};

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
    if (!studentProfile) {
      dispatch(getAllStudentProfileAction());
    }
    if (studentProfile) {
      setTableData(studentProfile.dbModelLst);
    }
  }, [dispatch, studentProfile]);

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

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Student Profile"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className={classes.button}
            // onClick={addHandler}
          >
            Add{" "}
          </Button>
        </Toolbar>
        <TableContainer className={classes.table}>
          <TblHead />
          {loading ? (
            <div></div>
          ) : (
            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => (
                <StudentProfileTableCollapse
                  item={item}
                  updateCollegeHandler={updateCollegeHandler}
                  deleteCollegeHandler={deleteCollegeHandler}
                />
              ))}
            </TableBody>
          )}
        </TableContainer>
        <TblPagination />
      </CustomContainer>
    </>
  );
};

export default StudentProfile;
