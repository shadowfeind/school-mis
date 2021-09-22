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

import EmployeeTypeTableCollapse from "./EmployeeTypeTableCollapse";
import { getAllEmployeeTypeAction } from "./EmployeeTypeActions";
import EmployeeTypeForm from "./EmployeeTypeForm";

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
  { id: "EmployeeTypeName", label: "Employee Type Name" },
  { id: "Description", label: "Description" },
  { id: "IsTaxApplicable", label: "IsTaxApplicable" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const EmployeeType = () => {
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

  const { loading, employeeType } = useSelector((state) => state.employeeType);

  const updateCollegeHandler = (id) => {};

  const deleteCollegeHandler = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to Delete this record?",
      subTitle: "You cannot undo this action",
    });
  };

  useEffect(() => {
    if (!employeeType) {
      dispatch(getAllEmployeeTypeAction());
    }
    if (employeeType) {
      setTableData(employeeType.hrEmployeeTypeModelLst);
    }
  }, [dispatch, employeeType]);

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
            x.EmployeeTypeName.toLowerCase().includes(e.target.value)
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
            label="Search Employee Type"
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
            onClick={() => setOpenPopup(true)}
            // onClick={() => dispatch(test())}
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
                <EmployeeTypeTableCollapse
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
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Employee Type Form"
      >
        <EmployeeTypeForm
          college={employeeType ? employeeType.hrEmployeeTypeModelLst : {}}
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

export default EmployeeType;
