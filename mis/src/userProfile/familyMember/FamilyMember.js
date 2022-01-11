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
import { getAllFamilyMemberAction } from "./FamilyMemberActions";
import { GET_ALL_FAMILYMEMBER_RESET } from "./FamilyMemberConstants";
import ListFamilyMember from "../listComponent/ListFamilyMember";

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

const FamilyMember = () => {
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

  const { getAllFamilyMember, error } = useSelector(
    (state) => state.getAllFamilyMember
  );
  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_FAMILYMEMBER_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
    if (!getAllFamilyMember) {
      dispatch(getAllFamilyMemberAction());
    }
  }, [dispatch, getAllFamilyMember]);

  return (
    <CustomContainer>
      {getAllFamilyMember && (
        <ListFamilyMember
          list={getAllFamilyMember && getAllFamilyMember.staffSummary}
        />
      )}
    </CustomContainer>
  );
};

export default FamilyMember;
