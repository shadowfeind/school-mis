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

import { getAllRolesAction, getSingleRoleAction } from "./RoleActions";
import RoleTableCollapse from "./RoleTableCollapse";
import RoleForm from "./RoleForm";
import {
  GET_SINGLE_ROLE_RESET,
  ROLE_CREATE_RESET,
  UPDATE_SINGLE_ROLE_RESET,
} from "./RoleConstant";

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
  { id: "RoleName", label: "Role Name" },
  { id: "Description", label: "Description" },
  { id: "Created_On", label: "Created_On" },
  { id: "Updated_On", label: "Updated_On" },
  { id: "MarkAsAdmin", label: "MarkAsAdmin" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const Role = () => {
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

  const { loading, role } = useSelector((state) => state.role);

  const { success: createRoleSuccess } = useSelector(
    (state) => state.createRole
  );

  const { singleRole } = useSelector((state) => state.getSingleRole);

  const { success: updateSingleRoleSuccess } = useSelector(
    (state) => state.updateSingleRole
  );

  if (createRoleSuccess) {
    dispatch(getAllRolesAction());
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: ROLE_CREATE_RESET });
  }

  if (updateSingleRoleSuccess) {
    dispatch(getAllRolesAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_ROLE_RESET });
  }

  const updateCollegeHandler = (id) => {
    dispatch(getSingleRoleAction(id));
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
    if (!role) {
      dispatch(getAllRolesAction());
    }
    if (role) {
      setTableData(role.hrRoleModelLst);
    }
  }, [dispatch, role]);

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
            x.RoleName.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_ROLE_RESET });
    setOpenPopup(true);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Role"
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
          {loading ? (
            <div></div>
          ) : (
            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => (
                <RoleTableCollapse
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
        title="Employee Role Form"
      >
        <RoleForm role={singleRole && singleRole.hrRoleModel} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default Role;
