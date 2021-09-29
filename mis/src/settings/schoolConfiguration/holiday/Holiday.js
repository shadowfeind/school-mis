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
import { getAllHolidayAction, getSingleHolidayAction } from "./HolidayActions";
import HolidayTableCollapse from "./HolidayTableCollapse";
import HolidayForm from "./HolidayForm";
import {
  GET_SINGLE_HOLIDAY_RESET,
  HOLIDAY_CREATE_RESET,
  UPDATE_SINGLE_HOLIDAY_RESET,
} from "./HolidayConstants";

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
  { id: "HolidayName", label: "Holiday Name" },
  { id: "Description", label: "Description" },
  { id: "FromDate", label: "FromDate" },
  { id: "ToDate", label: "ToDate" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const Holiday = () => {
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

  const { loading, holiday } = useSelector((state) => state.holiday);

  const { success: createHolidaySuccess } = useSelector(
    (state) => state.createHoliday
  );

  const { singleHoliday } = useSelector((state) => state.getSingleHoliday);

  const { success: updateSingleHolidaySuccess } = useSelector(
    (state) => state.updateSingleHoliday
  );

  if (createHolidaySuccess) {
    dispatch(getAllHolidayAction());
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: HOLIDAY_CREATE_RESET });
  }

  if (updateSingleHolidaySuccess) {
    dispatch(getAllHolidayAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_HOLIDAY_RESET });
  }

  const updateCollegeHandler = (id) => {
    dispatch(getSingleHolidayAction(id));
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
    if (!holiday) {
      dispatch(getAllHolidayAction());
    }
    if (holiday) {
      setTableData(holiday.att_HRHolidayModelLst);
    }
  }, [dispatch, holiday]);

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
            x.HolidayName.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_HOLIDAY_RESET });
    setOpenPopup(true);
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Holiday"
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
              <HolidayTableCollapse
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
        title="Employee Type Form"
      >
        <HolidayForm holiday={singleHoliday && singleHoliday.hrHolidayModel} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default Holiday;
