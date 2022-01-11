import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
} from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import { GET_ALL_CONTACTADDRESS_RESET } from "./ContactAddressConstants";
import { getAllContactAddressAction } from "./ContactAddressActions";
import ListComponent from "../listComponent/ListComponent";

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

const ContactAddress = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();

  const { getAllContactAddress, error } = useSelector(
    (state) => state.getAllContactAddress
  );

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_CONTACTADDRESS_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
    if (!getAllContactAddress) {
      dispatch(getAllContactAddressAction());
    }
  }, [dispatch, getAllContactAddress]);

  return (
    <CustomContainer>
      {getAllContactAddress && (
        <ListComponent
          list={getAllContactAddress && getAllContactAddress.dbModel}
        />
      )}
    </CustomContainer>
  );
};

export default ContactAddress;
