import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";

import InputControl from "../../components/controls/InputControl";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import { getAllPersonalInformationAction } from "./PersonalInformationActions";
import { GET_ALL_PERSONALINFORMATION_RESET } from "./PersonalInformationConstants";
import ListPersonalInformation from "../listComponent/ListPersonalInformation";

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

const PersonalInformation = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();

  const { getAllPersonalInformation, error } = useSelector(
    (state) => state.getAllPersonalInformation
  );
  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_PERSONALINFORMATION_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
    if (!getAllPersonalInformation) {
      dispatch(getAllPersonalInformationAction());
    }
  }, [dispatch, getAllPersonalInformation]);
  return (
    <CustomContainer>
      {getAllPersonalInformation && (
        <ListPersonalInformation
          list={getAllPersonalInformation && getAllPersonalInformation.dbModel}
        />
      )}
    </CustomContainer>
  );
};

export default PersonalInformation;
