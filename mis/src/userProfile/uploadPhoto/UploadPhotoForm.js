import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputControl from "../../components/controls/InputControl";
import { uploadPhotoActionAction } from "./UploadPhotoActions";

const UploadPhotoForm = ({ photo }) => {
  const [image, setImage] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const dispatch = useDispatch();

  const handleImage = (event) => {
    let imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (x) => {
      setImgSrc(x.target.result);
    };
    reader.readAsDataURL(imageFile);
    setImage(event.target.files[0]);
  };

  return (
    <>
      <InputControl
        name="ImageUploaded"
        onChange={(e) => handleImage(e)}
        type="file"
      />

      <img src={imgSrc ? imgSrc : photo} height={200} width={200} />
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          paddingTop: "10px",
          marginTop: "10px",
          borderTop: "1px solid #f3f3f3",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(uploadPhotoActionAction(image))}
          style={{ margin: "10px 0 0 10px" }}
        >
          UPLOAD
        </Button>
      </div>
    </>
  );
};

export default UploadPhotoForm;
