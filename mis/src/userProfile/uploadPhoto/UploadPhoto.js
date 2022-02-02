import React, { useEffect, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import {
  GET_ALL_UPLOADPHOTO_RESET,
  UPLOADPHOTO_RESET,
} from "./UploadPhotoConstants";
import { getAllUploadPhotoAction, uploadPhotoActionAction } from "./UploadPhotoActions";
import { API_URL } from "../../constants";
import UploadPhotoForm from "./UploadPhotoForm";

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

const UploadPhoto = () => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();

  // const { photo, error } = useSelector((state) => state.getAllUploadPhoto);
  const { success: uploadPhotoSuccess, error: uploadPhotoError } = useSelector(
    (state) => state.uploadPhoto
  );
  // if (error) {
  //   setNotify({
  //     isOpen: true,
  //     message: error,
  //     type: "error",
  //   });
  //   dispatch({ type: GET_ALL_UPLOADPHOTO_RESET });
  // }
  if (uploadPhotoSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Uploaded",
      type: "success",
    });
    dispatch(uploadPhotoActionAction());
    dispatch({ type: UPLOADPHOTO_RESET });
  }
  if (uploadPhotoError) {
    setNotify({
      isOpen: true,
      message: uploadPhotoError,
      type: "error",
    });
    dispatch({ type: UPLOADPHOTO_RESET });
  }

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
    if (!uploadPhotoSuccess) {
      dispatch(uploadPhotoActionAction());
    }
  }, [dispatch, uploadPhotoSuccess]);
  return (
    <CustomContainer>
      upload Photo
      <br />
      {/* {photo && <img src={`${API_URL}${photo.dbModel.FullPath}`} />} */}
      <UploadPhotoForm uploadPhotoSuccess={uploadPhotoSuccess && `${API_URL}${uploadPhotoSuccess.dbModel.FullPath}`} />
      <Notification notify={notify} setNotify={setNotify} />
    </CustomContainer>
  );
};

export default UploadPhoto;
