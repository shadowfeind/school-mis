import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { unstable_batchedUpdates } from "react-dom";
import InputControl from "../../components/controls/InputControl";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import LoadingComp from "../../components/LoadingComp";
import Popup from "../../components/Popup";
import useCustomTable from "../../customHooks/useCustomTable";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import AddIcon from "@material-ui/icons/Add";
import {
  GET_ALL_TEACHER_NOTIFICATION_RESET,
  GET_LIST_TEACHER_NOTIFICATION_RESET,
  GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_RESET,
  POST_TEACHER_NOTIFICATION_RESET,
} from "./TeacherNotificationConstants";
import {
  getListTeacherNotificationAction,
  getSingleCreateTeacherNotificationAction,
} from "./TeacherNotificationActions";
import TeacherNotificationTableCollapse from "./TeacherNotificationTableCollapse";
import TeacherNotificationForm from "./TeacherNotificationForm";

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
  { id: "MessageHeading", label: "Heading" },
  { id: "MessageDescription", label: "Description" },
  { id: "ReceiverID", label: "Receiver ID" },
  { id: "PostedDate", label: "Posted Date" },
  { id: "Action", label: "Action", disableSorting: true },
];

const TeacherNotification = () => {
  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });

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
            x.FullName.toLowerCase().includes(e.target.value)
          );
        }
      },
    });
  };

  const dispatch = useDispatch();
  const classes = useStyles();

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

  const { allTeacherNotification, error } = useSelector(
    (state) => state.getAllTeacherNotification
  );

  const { listTeacherNotification,loading, error: listTeacherNotificationError } =
    useSelector((state) => state.getListTeacherNotification);

  const {
    singleCreateTeacherNotification,
    error: singleCreateTeacherNotificationError,
  } = useSelector((state) => state.getSingleCreateTeacherNotification);

  const {
    success: postTeacherNotification,
    error: postTeacherNotificationError,
  } = useSelector((state) => state.postTeacherNotification);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_TEACHER_NOTIFICATION_RESET });
  }

  if (listTeacherNotificationError) {
    setNotify({
      isOpen: true,
      message: listTeacherNotificationError,
      type: "error",
    });
    dispatch({ type: GET_LIST_TEACHER_NOTIFICATION_RESET });
  }

  if (singleCreateTeacherNotificationError) {
    setNotify({
      isOpen: true,
      message: singleCreateTeacherNotificationError,
      type: "error",
    });
    setOpenPopup(false);
    dispatch({ type: GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_RESET });
  }

  if (postTeacherNotificationError) {
    setNotify({
      isOpen: true,
      message: postTeacherNotificationError,
      type: "error",
    });
    dispatch({ type: POST_TEACHER_NOTIFICATION_RESET });
    setOpenPopup(false);
  }
  if (postTeacherNotification) {
    setNotify({
      isOpen: true,
      message: "Successfully Created",
      type: "success",
    });
    dispatch({ type: POST_TEACHER_NOTIFICATION_RESET });
    dispatch(getListTeacherNotificationAction());
    setOpenPopup(false);
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/notification" });
    if (!listTeacherNotification) {
      dispatch(getListTeacherNotificationAction());
    }
    if (listTeacherNotification) {
      setTableData(listTeacherNotification.teacherNotificationModelLst);
    }
  }, [dispatch, listTeacherNotification]);

  const createHandler = () => {
    dispatch(getSingleCreateTeacherNotificationAction());
    dispatch({ type: GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_RESET });
    setOpenPopup(true);
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Teacher Notification"
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
            onClick={createHandler}
          >
            Create{" "}
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
              <TeacherNotificationTableCollapse
                item={item}
                key={item.$id}
                setOpenPopup={setOpenPopup}
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
        title="Teacher Notification"
      >
        <TeacherNotificationForm
          setOpenPopup={setOpenPopup}
          fcmTokenList={
            singleCreateTeacherNotification &&
            singleCreateTeacherNotification.fcmTokenValueLst
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

export default TeacherNotification;
