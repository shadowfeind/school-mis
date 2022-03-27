import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import { API_URL } from "../../../constants";
import {
  postCreateHrValueAction,
  putEditHrValueAction,
} from "./HrValueActions";

const initialFormValues = {
  IDHRCompanyValue: 0,
  SchoolName: "",
  FullAddress: "",
  Slogan: "",
  SchoolType: "",
  TelNo: "",
  Email: "",
  RegNo: "",
  Url: "",
  SchoolLogo: "",
  HeaderBanner: "",
  PrincipleSignature: "",
  IDHRCompany: 0,
  IsActive: true,
  Created_On: "2022-03-18T05:17:08.817Z",
  Updated_On: "2022-03-18T05:17:08.817Z",
};

const HrValueForm = ({ hrValueCreate, setOpenPopup, hrValueEdit }) => {
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [imgSrc1, setImgSrc1] = useState(null);
  const [imgSrc2, setImgSrc2] = useState(null);

  const dispatch = useDispatch();

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.SchoolName = !fieldValues.SchoolName ? "This Field is Required" : "";
    temp.FullAddress = !fieldValues.FullAddress ? "This Field is Required" : "";
    temp.Slogan = !fieldValues.Slogan ? "This Field is Required" : "";
    temp.TelNo = !fieldValues.TelNo ? "This Field is Required" : "";
    temp.Email = !fieldValues.Email ? "This Field is Required" : "";
    temp.RegNo = !fieldValues.RegNo ? "This Field is Required" : "";
    temp.Url = !fieldValues.Url ? "This Field is Required" : "";
    temp.SchoolType = !fieldValues.SchoolType ? "This Field is Required" : "";
    // temp.image =!fieldValues.image ? "This Field is Required" : "";
    // temp.image1 =!fieldValues.image1 ? "This Field is Required" : "";
    // temp.image2 =!fieldValues.image2 ? "This Field is Required" : "";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (values.IDHRCompanyValue === 0) {
        dispatch(postCreateHrValueAction(values, image, image1, image2));
      } else {
        dispatch(
          putEditHrValueAction(
            values,
            image,
            image1,
            image2,
            hrValueEdit.FullPath,
            hrValueEdit.FullPathSchoolLogo,
            hrValueEdit.FullPathPrincipleSignature
          )
        );
      }
    }
  };

  const handleImage = (event) => {
    let imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (x) => {
      setImgSrc(x.target.result);
    };
    reader.readAsDataURL(imageFile);
    setImage(event.target.files[0]);
  };

  const handleImage1 = (event) => {
    let imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (x) => {
      setImgSrc1(x.target.result);
    };
    reader.readAsDataURL(imageFile);
    setImage1(event.target.files[0]);
  };

  const handleImage2 = (event) => {
    let imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (x) => {
      setImgSrc2(x.target.result);
    };
    reader.readAsDataURL(imageFile);
    setImage2(event.target.files[0]);
  };

  useEffect(() => {
    if (hrValueEdit) {
      setValues({ ...hrValueEdit.dbModel });
      console.log(hrValueEdit.dbModel);
    }
  }, [hrValueEdit]);

  useEffect(() => {
    if (hrValueCreate) {
      setValues({ ...hrValueCreate.dbModel });
    }
  }, [hrValueCreate]);

  const symbolsArr = ["e", "E", "+", "-", "."];

  const test = [{ Key: "", Value: "" }];

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="SchoolName"
            label="SchoolName*"
            value={values.SchoolName}
            onChange={handleInputChange}
            errors={errors.SchoolName}
          />
          <InputControl
            name="FullAddress"
            label="Full Address*"
            value={values.FullAddress}
            onChange={handleInputChange}
            errors={errors.FullAddress}
          />
          <InputControl
            name="Slogan"
            label="Slogan*"
            value={values.Slogan}
            onChange={handleInputChange}
            errors={errors.Slogan}
          />
          <InputControl
            name="SchoolType"
            label="School Type*"
            value={values.SchoolType}
            onChange={handleInputChange}
            errors={errors.SchoolType}
          />
          <InputControl
            name="TelNo"
            label="Tel-No*"
            value={values.TelNo}
            onChange={handleInputChange}
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            type="number"
            errors={errors.TelNo}
          />
          <InputControl
            name="Email"
            label="Email*"
            value={values.Email}
            onChange={handleInputChange}
            errors={errors.Email}
          />
          <InputControl
            name="RegNo"
            label="RegNo*"
            value={values.RegNo}
            onChange={handleInputChange}
            errors={errors.RegNo}
          />
          <InputControl
            name="Url"
            label="Url*"
            value={values.Url}
            onChange={handleInputChange}
            errors={errors.Url}
          />

          <SelectControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={handleInputChange}
            options={
              hrValueEdit
                ? hrValueEdit.ddlIsActive
                : hrValueCreate
                ? hrValueCreate.ddlIsActive
                : test
            }
            errors={errors.IsActive}
          />
        </Grid>

        <Grid item xs={6}>
          <h3>Select HeadBanner Photo:</h3>
          <InputControl
            name="ImageUploaded"
            // label="Select HeadBanner Photo"
            // value={values.HeaderBanner}
            onChange={(e) => handleImage(e)}
            type="file"
            // errors={errors.image}
          />

          <img
            src={
              imgSrc
                ? imgSrc
                : hrValueEdit && `${API_URL}${hrValueEdit.FullPath}`
            }
            height={200}
            width={200}
          />
          <h3>Select School Logo Photo:</h3>
          <InputControl
            name="ImageUploaded1"
            // label="Select School Logo Photo"
            // value={values.SchoolLogo}
            onChange={(e) => handleImage1(e)}
            type="file"
            // errors={errors.image1}
          />

          <img
            src={
              imgSrc1
                ? imgSrc1
                : hrValueEdit && `${API_URL}${hrValueEdit.FullPathSchoolLogo}`
            }
            height={200}
            width={200}
          />
          <h3>Select Principle Signature Photo:</h3>
          <InputControl
            name="ImageUploaded2"
            // label="Select Principle Signature Photo"
            // value={values.PrincipleSignature}
            onChange={(e) => handleImage2(e)}
            type="file"
            // errors={errors.image2}
          />

          <img
            src={
              imgSrc2
                ? imgSrc2
                : hrValueEdit &&
                  `${API_URL}${hrValueEdit.FullPathPrincipleSignature}`
            }
            height={200}
            width={200}
          />
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingTop: "10px",
          marginTop: "10px",
          borderTop: "1px solid #f3f3f3",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenPopup(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ margin: "10px 0 0 10px" }}
        >
          SUBMIT
        </Button>
      </div>
    </Form>
  );
};

export default HrValueForm;
