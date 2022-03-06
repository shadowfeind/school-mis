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
import AddIcon from "@material-ui/icons/Add";
import CustomContainer from "../../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SelectControl from "../../../components/controls/SelectControl";
import {
  GET_ALL_ASSIGN_ECA_RESET,
  GET_LIST_ASSIGN_ECA_RESET,
  GET_SINGLE_CREATE_ASSIGN_ECA_RESET,
  POST_ASSIGN_ECA_RESET,
} from "./AssignEcaConstants";
import AssignEcaTableCollapse from "./AssignEcaTableCollapse";
import {
  getALLAssignEcaAction,
  getListAssignEcaAction,
  getSingleCreateAssignEcaAction,
} from "./AssignEcaActions";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
}));

const tableHeader = [
  { id: "FacultyLevel", label: "Level" },
  { id: "ECAName", label: "ECA Name" },
  { id: "ECADescription", label: "ECA Description" },
  { id: "Created_On", label: "Created_On" },
  { id: "Updated_On", label: "Updated_On" },
  { id: "IsActive", label: "IsActive" },
  { id: "IDHRCompany", label: "Company" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AssignECA = () => {
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

  const [academicYear, setAcademicYear] = useState([]);
  const [acaYear, setacaYear] = useState("");
  const [ddlprogram, setDdlProgram] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [ddlClass, setDdlClass] = useState([]);
  const [classId, setClassId] = useState();

  const [errors, setErrors] = useState([]);
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
            x.FacultyLevel.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const { allAssignEca, error } = useSelector((state) => state.getAllAssignEca);

  const { listAssignEca, error: listAssignEcaError } = useSelector(
    (state) => state.getListAssignEca
  );

  const { singleCreateAssignEca, error: singleCreateAssignEcaError } =
    useSelector((state) => state.getSingleCreateAssignEca);

  const { success: postAssignEcaSuccess, error: postAssignEcaError } =
    useSelector((state) => state.postAssignEca);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ASSIGN_ECA_RESET });
  }

  if (listAssignEcaError) {
    setNotify({
      isOpen: true,
      message: listAssignEcaError,
      type: "error",
    });
    dispatch({ type: GET_LIST_ASSIGN_ECA_RESET });
  }

  if (singleCreateAssignEcaError) {
    setNotify({
      isOpen: true,
      message: singleCreateAssignEcaError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_CREATE_ASSIGN_ECA_RESET });
  }

  if (postAssignEcaError) {
    setNotify({
      isOpen: true,
      message: postAssignEcaError,
      type: "error",
    });
    dispatch({ type: POST_ASSIGN_ECA_RESET });
  }
  if (postAssignEcaSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    dispatch({ type: POST_ASSIGN_ECA_RESET });
    dispatch(getListAssignEcaAction(year, program, classId));
  }

  useEffect(() => {
    if (!allAssignEca) {
      dispatch(getALLAssignEcaAction());
    }
    if (allAssignEca) {
      setAcademicYear(allAssignEca.searchFilterModel.ddlAcademicYear);
      setDdlProgram(allAssignEca.searchFilterModel.ddlFacultyProgramLink);
      setDdlClass(allAssignEca.searchFilterModel.ddlClass);
    }
  }, [dispatch, allAssignEca]);

  useEffect(() => {
    if (listAssignEca) {
      setTableData([...listAssignEca.dbModelLst]);
    }
  }, [listAssignEca]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const listSearchHandler = () => {
    if (validate()) {
      dispatch(getListAssignEcaAction(acaYear, programValue, classId));
    }
  };

  const createHandler = (year, program, classId) => {
    dispatch(getSingleCreateAssignEcaAction(year, program, classId));
    setOpenPopup(true);
  };

  // const updateAssignEca = (year, program, classId) => {
  //   dispatch(getSingleCreateAssignEcaAction(year, program, classId));
  //   setOpenPopup(true);
  // }

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="Academic Year"
                label="Academic Year"
                value={acaYear}
                onChange={(e) => setacaYear(e.target.value)}
                options={academicYear}
                errors={errors.acaYear}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Program/Faculty"
                label="Program/Faculty"
                value={programValue}
                onChange={(e) => setProgramValue(e.target.value)}
                options={ddlprogram}
                errors={errors.programValue}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Classes"
                label="Classes"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                options={ddlClass}
                errors={errors.classId}
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                className={classes.button}
                style={{ margin: "10px 0 0 10px" }}
                onClick={createHandler}
              >
                Create{" "}
              </Button>
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
        {listAssignEca && (
          <TableContainer className={classes.table}>
            <TblHead />

            <TableBody>
              {tableDataAfterPagingAndSorting().map((item) => (
                <AssignEcaTableCollapse item={item} key={item.$id} />
              ))}
            </TableBody>
          </TableContainer>
        )}

        {listAssignEca && <TblPagination />}
      </CustomContainer>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default AssignECA;
