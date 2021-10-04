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
  getAllAcademicSectionAction,
  getSingleAcademicSectionAction,
} from "./AcademicSectionActions";
import AcademicSectionTableCollapse from "./AcademicSectionTableCollapse";
import AcademicSectinoForm from "./AcademicSectionForm";
import {
  ACADEMIC_SECTION_CREATE_RESET,
  GET_SINGLE_ACADEMIC_SECTION_RESET,
  UPDATE_SINGLE_ACADEMIC_SECTION_RESET,
} from "./AcademicSectionConstants";

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
  { id: "RoomName", label: "Room Name" },
  { id: "RoomLocation", label: "Room Location" },
  { id: "RoomCapacity", label: "RoomCapacity" },
  { id: "IsActive", label: "IsActive" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AcademicSection = () => {
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

  const { loading, academicSection } = useSelector(
    (state) => state.academicSection
  );

  const { success: createAcademicSection } = useSelector(
    (state) => state.createAcademicSection
  );

  const { singleAcademicSection } = useSelector(
    (state) => state.getSingleAcademicSection
  );

  const { success: updateAcademicSectionSuccess } = useSelector(
    (state) => state.updateSingleAcademicSection
  );

  if (createAcademicSection) {
    dispatch(getAllAcademicSectionAction());
    setNotify({
      isOpen: true,
      message: "Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: ACADEMIC_SECTION_CREATE_RESET });
  }

  if (updateAcademicSectionSuccess) {
    dispatch(getAllAcademicSectionAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_ACADEMIC_SECTION_RESET });
  }

  const updateCollegeHandler = (id) => {
    dispatch(getSingleAcademicSectionAction(id));
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
    if (!academicSection) {
      dispatch(getAllAcademicSectionAction());
    }
    if (academicSection) {
      setTableData(academicSection.dbModelLst);
    }
  }, [dispatch, academicSection]);

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
            x.RoomName.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_ACADEMIC_SECTION_RESET });
    setOpenPopup(true);
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Position"
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
              <AcademicSectionTableCollapse
                item={item}
                key={item.$id}
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
        title="School Settings Form"
      >
        <AcademicSectinoForm
          academicSection={
            singleAcademicSection && singleAcademicSection.dbModel
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

export default AcademicSection;
