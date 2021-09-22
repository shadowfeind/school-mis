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
import SchoolSettingsTableCollapse from "./SchoolSettingsTableCollapse";
import SchoolSettingsForm from "./SchoolSettingsForm";
import { getAllSchoolSettingsAction } from "./SchoolSettingsActions";

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
  { id: "CompanyName", label: "Company Name" },
  { id: "CompanyAddress", label: "Company Address" },
  { id: "PhoneNo", label: "Phone Number" },
  { id: "EmailID", label: "Email ID" },
  { id: "WebSite", label: "WebSite" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const SchoolSettings = () => {
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

  const { loading, schoolSettings } = useSelector(
    (state) => state.schoolSettings
  );

  const updateCollegeHandler = (id) => {};

  const deleteCollegeHandler = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to Delete this record?",
      subTitle: "You cannot undo this action",
    });
  };

  useEffect(() => {
    if (!schoolSettings) {
      dispatch(getAllSchoolSettingsAction());
    }
    if (schoolSettings) {
      setTableData(schoolSettings.dbModelLstTest);
    }
  }, [dispatch, schoolSettings]);

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
            x.CompanyName.toLowerCase().includes(e.target.value)
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
            label="Search College"
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
                <SchoolSettingsTableCollapse
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
        title="School Settings Form"
      >
        <SchoolSettingsForm
          college={schoolSettings ? schoolSettings.dbModelLstTest : {}}
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

export default SchoolSettings;
