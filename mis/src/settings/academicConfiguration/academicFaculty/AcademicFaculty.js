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
  ACADEMIC_FACULTY_CREATE_RESET,
  GET_SINGLE_ACADEMIC_FACULTY_RESET,
} from "./AcademicFacultyConstants";
import {
  getAcademicFacultyOptionAction,
  getAllAcademicFacultyAction,
  getSingleAcademicFacultyAction,
} from "./AcademicFacultyActions";
import AcademicFacultyForm from "./AcademicFacultyForm";
import AcademicFacultyTableCollapse from "./AcademicFacultyTableCollapse";

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
  { id: "Header", label: "Academic Header" },
  { id: "TotalLevel", label: "Total Level" },
  { id: "IsActive", label: "IsActive" },
  { id: "LevelMOU", label: "Level MOU" },
  { id: "TotalSeat", label: "Total Seat" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AcademicFaculty = () => {
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

  const { academicFaculty, error } = useSelector(
    (state) => state.academicFaculty
  );

  const {
    success: createAcademicFacultySuccess,
    error: createAcademicFacultyError,
  } = useSelector((state) => state.createAcademicFaculty);

  const { singleAcademicFaculty, error: singleAcademicFacultyError } =
    useSelector((state) => state.getSingleAcademicFaculty);

  // const { success: updateSingleAcademicFacultySuccess } = useSelector(
  //   (state) => state.updateSingleAcademicFaculty
  // );

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
  }
  if (createAcademicFacultyError) {
    setNotify({
      isOpen: true,
      message: createAcademicFacultyError,
      type: "error",
    });
  }
  if (singleAcademicFacultyError) {
    setNotify({
      isOpen: true,
      message: singleAcademicFacultyError,
      type: "error",
    });
  }

  if (createAcademicFacultySuccess) {
    dispatch(getAllAcademicFacultyAction());
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: ACADEMIC_FACULTY_CREATE_RESET });
  }

  // if (updateSingleAcademicProgramSuccess) {
  //   dispatch(getAllAcademicProgramAction());
  //   setNotify({
  //     isOpen: true,
  //     message: "Updated Succesfully",
  //     type: "success",
  //   });
  //   setOpenPopup(false);
  //   dispatch({ type: UPDATE_SINGLE_ACADEMIC_PROGRAM_RESET });
  // }

  const updateCollegeHandler = (id) => {
    dispatch(getSingleAcademicFacultyAction(id));
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
    if (!academicFaculty) {
      dispatch(getAllAcademicFacultyAction());
    }
    if (academicFaculty) {
      setTableData(academicFaculty.dbModelLst);
    }
  }, [dispatch, academicFaculty]);

  useEffect(() => {
    dispatch(getAcademicFacultyOptionAction());
  }, []);

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
            x.Header.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_ACADEMIC_FACULTY_RESET });
    setOpenPopup(true);
  };
  return (
    <>
      <CustomContainer>
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

          <TableBody>
            {tableDataAfterPagingAndSorting().map((item) => (
              <AcademicFacultyTableCollapse
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
        <AcademicFacultyForm
          academicFaculty={
            singleAcademicFaculty && singleAcademicFaculty.dbModel
          }
          selected={singleAcademicFaculty && singleAcademicFaculty.selected}
          setOpenPopup={setOpenPopup}
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

export default AcademicFaculty;
