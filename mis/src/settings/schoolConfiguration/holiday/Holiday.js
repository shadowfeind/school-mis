import React, { useEffect, useState } from "react";
import { Button, makeStyles, Toolbar } from "@material-ui/core";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment, { months } from "moment";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../../components/Popup";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { getAllHolidayAction, getSingleHolidayAction } from "./HolidayActions";

import HolidayForm from "./HolidayForm";
import {
  GET_ALL_HOLIDAY_RESET,
  GET_SINGLE_HOLIDAY_RESET,
  HOLIDAY_CREATE_RESET,
  UPDATE_SINGLE_HOLIDAY_RESET,
} from "./HolidayConstants";
import "react-big-calendar/lib/css/react-big-calendar.css";

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

const localizer = momentLocalizer(moment);

const Holiday = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  const { holiday, error } = useSelector((state) => state.holiday);

  const { success: createHolidaySuccess, error: createHolidayError } =
    useSelector((state) => state.createHoliday);

  const { singleHoliday } = useSelector((state) => state.getSingleHoliday);

  const { success: updateSingleHolidaySuccess } = useSelector(
    (state) => state.updateSingleHoliday
  );
  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_HOLIDAY_RESET });
  }
  if (createHolidayError) {
    setNotify({
      isOpen: true,
      message: createHolidayError,
      type: "error",
    });
    dispatch({ type: HOLIDAY_CREATE_RESET });
  }

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
  }, [dispatch, holiday]);

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_HOLIDAY_RESET });
    setOpenPopup(true);
  };
  const handleCalendarSelect = ({ start, end }) => {
    setStartDate(new Date(start).toISOString());
    setEndDate(new Date(end).toISOString());
    setOpenPopup(true);
  };
  return (
    <>
      <div
        style={{
          margin: "10px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "5px 5px 5px #d4d4d4",
        }}
      >
        <Toolbar>
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
        <Calendar
          localizer={localizer}
          events={holiday && holiday.att_HRHolidayModelLst}
          startAccessor="FromDate"
          endAccessor="ToDate"
          titleAccessor="HolidayName"
          views={months}
          selectable={true}
          onSelectSlot={handleCalendarSelect}
          style={{ height: "60vh" }}
        />
      </div>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Holiday Form"
      >
        <HolidayForm
          holiday={singleHoliday && singleHoliday.hrHolidayModel}
          startDate={startDate}
          endDate={endDate}
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

export default Holiday;
