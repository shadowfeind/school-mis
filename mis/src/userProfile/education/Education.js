import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
} from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import { getAllEducationAction } from "./EducationActions";
import { GET_ALL_EDUCATION_RESET } from "./EducationConstants";
import ListEducation from "../listComponent/ListEducation";

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

const Education = () => {
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

  const { getAllEducation, error } = useSelector(
    (state) => state.getAllEducation
  );
  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_EDUCATION_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
    if (!getAllEducation) {
      dispatch(getAllEducationAction());
    }
    // if (getAllEducation) {
    //     setTableData(getAllEducation.hrEducationModelLst);
    // }
  }, [dispatch, getAllEducation]);

  return (
    <CustomContainer>
      {getAllEducation && (
        <ListEducation list={getAllEducation && getAllEducation.staffSummary} />
      )}
    </CustomContainer>
  );
};

export default Education;
