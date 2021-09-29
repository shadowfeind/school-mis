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
import {
  getAllEmployeeCategoryRoleAction,
  getSingleEmployeeCategoryRoleAction,
} from "./EmployeeCategoryRoleActions";
import EmployeeCategoryRoleTableCollapse from "./EmployeeCategoryRoleTableCollapse";
import EmployeeCategoryRoleForm from "./EmployeeCategoryRoleForm";
import {
  EMPLOYEE_CATEGORY_ROLE_CREATE_RESET,
  GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_RESET,
  UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_RESET,
} from "./EmployeeCategoryRoleConstant";

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
  { id: "Heading", label: "Heading" },
  { id: "Description", label: "Description" },
  { id: "IsActive", label: "IsActive" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
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

  const { loading, employeeCategoryRole } = useSelector(
    (state) => state.employeeCategoryRole
  );

  const { success: createEmployeeCategoryRoleSuccess } = useSelector(
    (state) => state.createEmployeeCategoryRole
  );

  const { singleEmployeeCategoryRole } = useSelector(
    (state) => state.getSingleEmployeeCategoryRole
  );

  const { success: updateSingleCategoryRoleSuccess } = useSelector(
    (state) => state.updateSingleEmployeeCategoryRole
  );

  if (createEmployeeCategoryRoleSuccess) {
    dispatch(getAllEmployeeCategoryRoleAction());
    setNotify({
      isOpen: true,
      message: "Employee Category Role Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: EMPLOYEE_CATEGORY_ROLE_CREATE_RESET });
  }

  if (updateSingleCategoryRoleSuccess) {
    dispatch(getAllEmployeeCategoryRoleAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_RESET });
  }

  const updateCollegeHandler = (id) => {
    dispatch(getSingleEmployeeCategoryRoleAction(id));
    setOpenPopup(true);
  };

  const deleteCollegeHandler = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to Delete this record?",
      subTitle: "You cannot undo this action",
    });
  };

  useEffect(() => {
    if (!employeeCategoryRole) {
      dispatch(getAllEmployeeCategoryRoleAction());
    }
    if (employeeCategoryRole) {
      setTableData(employeeCategoryRole.dbModelLst);
    }
  }, [dispatch, employeeCategoryRole]);

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
            x.Heading.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_RESET });
    setOpenPopup(true);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Employee Category Role"
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
            onClick={addHandler}
            // onClick={() => dispatch(test())}
          >
            Add{" "}
          </Button>
        </Toolbar>
        <TableContainer className={classes.table}>
          <TblHead />
          {/* {loading ? (
            <div></div>
          ) : ( */}
          <TableBody>
            {tableDataAfterPagingAndSorting().map((item) => (
              <EmployeeCategoryRoleTableCollapse
                item={item}
                updateCollegeHandler={updateCollegeHandler}
                deleteCollegeHandler={deleteCollegeHandler}
              />
            ))}
          </TableBody>
          {/* )} */}
        </TableContainer>
        <TblPagination />
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Employee Category Role Form"
      >
        <EmployeeCategoryRoleForm
          employeeCategoryRole={
            singleEmployeeCategoryRole && singleEmployeeCategoryRole.dbModel
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

export default EmployeeType;
