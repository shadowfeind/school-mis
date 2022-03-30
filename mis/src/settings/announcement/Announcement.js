import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
} from "@material-ui/core";
import useCustomTable from "../../customHooks/useCustomTable";
import InputControl from "../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import LoadingComp from "../../components/LoadingComp";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import AnnouncementForm from "./AnnouncementForm";
import {
  getAllAnnouncementAction,
  getFCMForAnnouncementAction,
  getSingleAnnouncementAction,
} from "./AnnouncementAction";
import AnnouncementTableCollapse from "./AnnouncementTableCollapse";
import {
  ANNOUNCEMENT_CREATE_RESET,
  ANNOUNCEMENT_FCM_RESET,
  GET_ALL_ANNOUNCEMENT_RESET,
  GET_SINGLE_ANNOUNCEMENT_RESET,
  UPDATE_SINGLE_ANNOUNCEMENT_RESET,
} from "./AnnouncementConstants";
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
  { id: "NewsHeading", label: "News Heading" },
  { id: "NewsDescription", label: "News Description" },
  { id: "IsActive", label: "IsActive" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
  { id: "actions", label: "Actions", disableSorting: true },
];
const AnnouncementTest = () => {
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

  const { announcement, error,loading } = useSelector((state) => state.announcement);

  const { success: createAnnouncementSuccess, error: createAnnouncementError } =
    useSelector((state) => state.createAnnouncement);

  const { singleAnnouncement, error: singleAnnouncementError } = useSelector(
    (state) => state.getSingleAnnouncement
  );

  const { announcementFCM, error: announcementFCMError } = useSelector(
    (state) => state.getFCMForAnnouncement
  );

  const {
    success: updateSingleAnnouncementSuccess,
    error: updateSingleAnnouncementError,
  } = useSelector((state) => state.updateSingleAnnouncement);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ANNOUNCEMENT_RESET });
  }
  if (announcementFCMError) {
    setNotify({
      isOpen: true,
      message: announcementFCMError,
      type: "error",
    });
    dispatch({ type: ANNOUNCEMENT_FCM_RESET });
  }
  if (createAnnouncementError) {
    setNotify({
      isOpen: true,
      message: createAnnouncementError,
      type: "error",
    });
    dispatch({ type: ANNOUNCEMENT_CREATE_RESET });
  }
  if (singleAnnouncementError) {
    setNotify({
      isOpen: true,
      message: singleAnnouncementError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_ANNOUNCEMENT_RESET });
  }
  if (updateSingleAnnouncementError) {
    setNotify({
      isOpen: true,
      message: updateSingleAnnouncementError,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_ANNOUNCEMENT_RESET });
  }

  if (createAnnouncementSuccess) {
    dispatch(getAllAnnouncementAction());
    setNotify({
      isOpen: true,
      message: "Announcement Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: ANNOUNCEMENT_CREATE_RESET });
  }

  if (updateSingleAnnouncementSuccess) {
    dispatch(getAllAnnouncementAction());
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: UPDATE_SINGLE_ANNOUNCEMENT_RESET });
  }

  useEffect(() => {
    if (!announcement) {
      dispatch(getAllAnnouncementAction());
    }
    if (announcement) {
      setTableData(announcement.dbModelLst);
    }
  }, [dispatch, announcement]);
  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/notification" });
  }, [dispatch]);

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
            x.NewsHeading.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const addHandler = () => {
    dispatch(getFCMForAnnouncementAction());
    dispatch({ type: GET_SINGLE_ANNOUNCEMENT_RESET });
    setOpenPopup(true);
  };

  const updateCollegeHandler = () => {
    dispatch(getSingleAnnouncementAction());
    setOpenPopup(true);
  };

  const deleteCollegeHandler = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to Delete this record?",
      subTitle: "You cannot undo this action",
    });
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Announcement"
            InputProps={{
              startAdornment: (
                <InputAdornment announcement="start">
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
        {loading ? (
          <LoadingComp />
        ) : (
          <>
        <TableContainer className={classes.table}>
          <TblHead />

          <TableBody>
            {tableDataAfterPagingAndSorting().map((item) => (
              <AnnouncementTableCollapse
                item={item}
                key={item.$id}
                updateCollegeHandler={updateCollegeHandler}
                deleteCollegeHandler={deleteCollegeHandler}
              />
            ))}
          </TableBody>
        </TableContainer>
        <TblPagination />
        </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Announcement Form"
      >
        <AnnouncementForm
          announcement={singleAnnouncement && singleAnnouncement.dbModel}
          fcmTokenList={announcementFCM && announcementFCM.fcmTokenValueLst}
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

export default AnnouncementTest;
