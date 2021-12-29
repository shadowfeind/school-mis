import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import useCustomTable from "../../customHooks/useCustomTable";
import InputControl from "../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import {
  getCounterConfigInitialDataAction,
  getCounterConfigInitialDataForCreateAction,
  getCounterConfigInitialDataForEditAction,
  getCounterConfigListAction,
} from "./CounterConfigurationActions";
import CounterConfigurationForm from "./CounterConfigurationForm";
import {
  COUNTER_CONFIG_CREATE_RESET,
  COUNTER_CONFIG_EDIT_RESET,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_RESET,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_RESET,
  GET_COUNTER_CONFIG_INITIAL_DATA_RESET,
} from "./CounterConfigurationConstants";
import CounterConfigurationTableCollapse from "./CounterConfigurationTableCollapse";

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
  { id: "CounterYear", label: "Counter Year" },
  { id: "CounterFor", label: "Counter For" },
  { id: "Prefix", label: "Prefix" },
  { id: "Middle", label: "Middle" },
  { id: "CurrentCount", label: "Counter" },
  { id: "Status", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const CounterConfiguration = () => {
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [acaYear, setAcaYear] = useState(55);
  const [programValue, setProgramValue] = useState(6);
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
            x.Prefix.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const {
    getAcademicConfigInitialData,
    error: getAcademicConfigInitialDataError,
  } = useSelector((state) => state.getCounterConfigInitialData);

  const { getAcademicConfigInitialDataForCreate } = useSelector(
    (state) => state.getCounterConfigInitialDataForCreate
  );

  const {
    success: counterConfigCreateSuccess,
    error: counterConfigCreateError,
  } = useSelector((state) => state.counterConfigCreate);

  const { counterConfigList } = useSelector(
    (state) => state.getCounterConfigList
  );

  const { getAcademicConfigInitialDataForEdit } = useSelector(
    (state) => state.getCounterConfigInitialDataForEdit
  );

  const { success: counterConfigEditSuccess, error: counterConfigEditFail } =
    useSelector((state) => state.counterConfigEdit);

  if (getAcademicConfigInitialDataError) {
    setNotify({
      isOpen: true,
      message: getAcademicConfigInitialDataError,
      type: "error",
    });
    dispatch({ type: GET_COUNTER_CONFIG_INITIAL_DATA_RESET });
  }

  if (counterConfigCreateSuccess) {
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    dispatch({ type: COUNTER_CONFIG_CREATE_RESET });
    setOpenPopup(false);
  }
  if (counterConfigCreateError) {
    setNotify({
      isOpen: true,
      message: counterConfigCreateError,
      type: "error",
    });
    dispatch({ type: COUNTER_CONFIG_CREATE_RESET });
  }
  if (counterConfigEditSuccess) {
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    dispatch({ type: COUNTER_CONFIG_EDIT_RESET });
    setOpenPopup(false);
  }

  if (counterConfigEditFail) {
    setNotify({
      isOpen: true,
      message: counterConfigEditFail,
      type: "error",
    });
    dispatch({ type: COUNTER_CONFIG_EDIT_RESET });
    setOpenPopup(false);
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "registration" });
    if (!getAcademicConfigInitialData) {
      dispatch(getCounterConfigInitialDataAction());
    }
    if (getAcademicConfigInitialData) {
      setAcademicYearDdl(
        getAcademicConfigInitialData.searchFilterModel.ddlAcademicYear
      );
      setProgramDdl(
        getAcademicConfigInitialData.searchFilterModel.ddlFacultyProgramLink
      );
    }
  }, [dispatch, getAcademicConfigInitialData]);

  useEffect(() => {
    if (counterConfigList) {
      setTableData(counterConfigList.dbModelLst);
    }
  }, [counterConfigList]);

  const handleCreateClick = () => {
    dispatch(getCounterConfigInitialDataForCreateAction(acaYear, programValue));
    dispatch({ type: GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_RESET });
    setOpenPopup(true);
  };

  const listSearchHandler = () => {
    dispatch(getCounterConfigListAction(acaYear, programValue));
  };

  const updateCounterConfig = (id, year, program) => {
    dispatch(getCounterConfigInitialDataForEditAction(id, year, program));
    dispatch({ type: GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_RESET });
    setOpenPopup(true);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="academic year"
                label="Academic Year"
                onChange={(e) => setAcaYear(e.target.value)}
                options={academicYearDdl}
                value={acaYear}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="program"
                label="Program/Faculty"
                value={programValue}
                // onChange={(e) => handleProgramChange(e)}
                options={programDdl}
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleCreateClick}
                type="submit"
              >
                CREATE
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={listSearchHandler}
                type="submit"
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
        </Toolbar>
        {counterConfigList && (
          <TableContainer className={classes.table}>
            <TblHead />

            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => (
                <CounterConfigurationTableCollapse
                  item={item}
                  key={item.$id}
                  updateCounterConfig={updateCounterConfig}
                  year={
                    counterConfigList &&
                    counterConfigList.searchFilterModel.idAcademicYear
                  }
                  program={
                    counterConfigList &&
                    counterConfigList.searchFilterModel.idFacultyProgramLink
                  }
                  //   deleteCollegeHandler={deleteCollegeHandler}
                />
              ))}
            </TableBody>
          </TableContainer>
        )}
        {counterConfigList && <TblPagination />}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Counter Configuration Form"
      >
        <CounterConfigurationForm
          counterFor={
            getAcademicConfigInitialDataForCreate &&
            getAcademicConfigInitialDataForCreate.ddlCounterFor
          }
          counterStatus={
            getAcademicConfigInitialDataForCreate &&
            getAcademicConfigInitialDataForCreate.ddlCounterStatus
          }
          setOpenPopup={setOpenPopup}
          getAcademicConfigInitialDataForEdit={
            getAcademicConfigInitialDataForEdit
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

export default CounterConfiguration;
