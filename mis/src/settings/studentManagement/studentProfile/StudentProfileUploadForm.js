import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputControl from "../../../components/controls/InputControl";
import { API_URL } from "../../../constants";
import { postUploadPhotoAction } from "./StudentProfileActions";

const initialFormValues = {
  IDHREmployee: 0,
  FullPath: "",
  IDHRRole: 0,
};
const StudentProfileUploadPhotoForm = ({ uploadPhoto }) => {
  const [active, setActive] = useState(false);
  const [image, setImage] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [errors, setErrors] = useState({});
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
  const validate = () => {
    let temp = { ...errors };
    temp.image = !image ? "Image Required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const handleUploadImage = () => {
    if (validate()) {
      setActive(true);
      if (uploadPhoto) {
        dispatch(postUploadPhotoAction(uploadPhoto.IDHREmployee, image));
      } else {
        console.log("failed");
      }
    }
  };

  return (
    <>
      <InputControl
        name="ImageUploaded"
        onChange={(e) => handleImage(e)}
        type="file"
        errors={errors.image}
      />

      <img
        src={
          imgSrc ? imgSrc : uploadPhoto && `${API_URL}${uploadPhoto?.FullPath}`
        }
        height={200}
        width={200}
      />
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
          onClick={handleUploadImage}
          disabled={active}
          style={{ margin: "10px 0 0 10px" }}
        >
          {active ? "PROCESSING" : "UPLOAD"}
        </Button>
      </div>
    </>
  );
};

export default StudentProfileUploadPhotoForm;
