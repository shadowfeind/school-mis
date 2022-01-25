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
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import { GET_ALL_JOBHISTORY_RESET } from "./JobHistoryConstants";
import { getAllJobHistoryAction } from "./JobHistoryActions";
import ListJobHistory from "../listComponent/ListJobHistory";

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
  { id: "NewsHead", label: "News Head" },
  { id: "NewsDescription", label: "News Description" },
  { id: "IsActive", label: "IsActive" },
  { id: "Created_On", label: "Created On" },
  { id: "Updated_On", label: "Updated On" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const JobHistory = () => {
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

  const classes = useStyles();

  const dispatch = useDispatch();

  const { getAllJobHistory, error } = useSelector(
    (state) => state.getAllJobHistory
  );
  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_JOBHISTORY_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
    if (!getAllJobHistory) {
      dispatch(getAllJobHistoryAction());
    }
    if (getAllJobHistory) {
      setTableData(getAllJobHistory.hrJobHistoryModelLst);
    }
  }, [dispatch, getAllJobHistory]);
  return (
    <CustomContainer>
      {getAllJobHistory && (
        <ListJobHistory
          list={getAllJobHistory && getAllJobHistory.staffSummary}
        />
      )}
    </CustomContainer>
  );
};

export default JobHistory;
