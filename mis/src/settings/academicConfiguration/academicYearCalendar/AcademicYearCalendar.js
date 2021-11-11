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
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { GET_SINGLE_ACADEMIC_YEAR_CALENDAR_RESET } from "./AcademicYearCalendarConstant";
import AcademicYearCalendarTableCollapse from "./AcademicYearCalendarTableCollapse";
import { getAllAcademicYearCalendarAction } from "./AcademicYearCalendarActions";
import SelectControl from "../../../components/controls/SelectControl";

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
  { id: "EventName", label: "Event Name" },
  { id: "EventType", label: "Event Type" },
  { id: "EventStatus", label: "Event Status" },
  { id: "FromDate", label: "From Date" },
  { id: "ToDate", label: "To Date" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AcademicYearCalendar = () => {
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

  const { academicYearCalendar } = useSelector(
    (state) => state.academicYearCalendar
  );
  const { success: createAcademicYearCalendarSuccess } = useSelector(
    (state) => state.createAcademicYearCalendar
  );

  const { singleAcademicYearCalendar } = useSelector(
    (state) => state.getSingleAcademicYearCalendar
  );

  // if (createAcademicYearCalendarSuccess) {
  //   dispatch(getAllAcademicYearCalendarAction());
  //   setNotify({
  //     isOpen: true,
  //     message: "Created Succesfully",
  //     type: "success",
  //   });
  //   setOpenPopup(false);
  //   dispatch({ type: ACADEMIC_YEAR_CREATE_RESET });
  // }

  const updateCollegeHandler = (id) => {
    // dispatch(getSingleAcademicYearAction(id));
    // setOpenPopup(true);
  };

  const deleteCollegeHandler = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to Delete this record?",
      subTitle: "You cannot undo this action",
    });
  };

  useEffect(() => {
    if (!academicYearCalendar) {
      dispatch(getAllAcademicYearCalendarAction());
    }
    if (academicYearCalendar) {
      setTableData(academicYearCalendar.dbModelLst);
    }
  }, [dispatch, academicYearCalendar]);

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
            x.EventName.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_ACADEMIC_YEAR_CALENDAR_RESET });
    setOpenPopup(true);
  };

  const gender = [
    { Key: "male", Value: "Male" },
    { Key: "female", Value: "Female" },
  ];

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="Sex"
                label="Academic Year"
                // value={values.Sex}
                // onChange={handleInputChange}
                options={gender}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Sex"
                label="Program/Faculty"
                className={classes.customInput}
                // value={values.Sex}
                // onChange={handleInputChange}
                options={gender}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Sex"
                label="Classes"
                className={classes.customInput}
                // value={values.Sex}
                // onChange={handleInputChange}
                options={gender}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
              >
                CREATE
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
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
            label="Search Academic Faculty"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          {/* <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className={classes.button}
            onClick={addHandler}
          >
            Add{" "}
          </Button> */}
        </Toolbar>
        <TableContainer className={classes.table}>
          <TblHead />

          <TableBody>
            {tableDataAfterPagingAndSorting().map((item) => (
              <AcademicYearCalendarTableCollapse
                item={item}
                key={item.id}
                updateCollegeHandler={updateCollegeHandler}
                deleteCollegeHandler={deleteCollegeHandler}
              />
            ))}
          </TableBody>
        </TableContainer>
        <TblPagination />
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Academic Faculty Form"
      >
        {/* <AcademicYearForm
      academicYear={singleAcademicYear && singleAcademicYear.dbModel}
      selected={singleAcademicYear && singleAcademicYear.selected}
    /> */}
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default AcademicYearCalendar;
