import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import DatePickerControl from "../../../components/controls/DatePickerControl";

const initialFormValues = {
  IDHRCompany: 0,
  ShortForm: "",
  POBox: "",
  CompanyName: "",
  CompanyAddress: "",
  RegNo: "",
  PanNo: "",
  DOE: "2012-12-12T00:00:00",
  PhoneNo: "",
  AlternatePhoneNo: "",
  FaxNo: "",
  AlternateFaxNo: "",
  EmailID: "",
  WebSite: "",
  Vision: "",
  Mission: "",
  IsSystemDefined: false,
  IsActive: false,
  Created_On: "2012-12-12T00:00:00",
  Updated_On: "2015-04-09T14:20:39.947",
};

const SchoolSettingsForm = ({ college }) => {
  const dispatch = useDispatch();
  const validate = () => {
    let temp = {};
    temp.CompanyName =
      values.CompanyName.length > 200
        ? "Company Name must be less than 200 characters"
        : "";
    temp.ShortForm =
      values.ShortForm.length > 6
        ? "Short Form cannot be greater than 6 characters"
        : "";
    temp.POBox =
      values.POBox.length > 20
        ? "POBox cannot be greater than 20 characters"
        : "";
    temp.CompanyAddress =
      values.CompanyAddress.length > 2000
        ? "Company Address cannot be greater than 2000 characters"
        : "";
    temp.RegNo =
      values.RegNo.length > 20
        ? "RegNo cannot be greater than 20 characters"
        : "";
    temp.PhoneNo =
      values.PhoneNo.length > 20
        ? "PhoneNo cannot be greater than 20 characters"
        : "";
    temp.AlternatePhoneNo =
      values.AlternatePhoneNo.length > 20
        ? "AlternatePhoneNo cannot be greater than 20 characters"
        : "";
    temp.FaxNo =
      values.FaxNo.length > 20
        ? "FaxNo cannot be greater than 20 characters"
        : "";
    temp.AlternatePhoneNo =
      values.AlternatePhoneNo.length > 20
        ? "AlternatePhoneNo cannot be greater than 20 characters"
        : "";
    temp.EmailID =
      values.EmailID.length > 200
        ? "EmailID cannot be greater than 200 characters"
        : "";
    temp.Vision =
      values.Vision.length > 500
        ? "Vision cannot be greater than 500 characters"
        : "";
    temp.Mission =
      values.Mission.length > 500
        ? "Mission cannot be greater than 500 characters"
        : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
    }
  };

  useEffect(() => {
    if (college) {
      setValues({ ...college });
    }
  }, [college]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="CompanyName"
            label="Company Name"
            value={values.CompanyName}
            onChange={handleInputChange}
            errors={errors.CompanyName}
            required
          />
          <InputControl
            name="ShortForm"
            label="Short Form"
            value={values.ShortForm}
            onChange={handleInputChange}
            errors={errors.ShortForm}
            required
          />
          <InputControl
            name="CompanyAddress"
            label="Company Address"
            value={values.CompanyAddress}
            onChange={handleInputChange}
            errors={errors.CompanyAddress}
            required
          />
          <InputControl
            name="RegNo"
            label="Reg No"
            value={values.RegNo}
            onChange={handleInputChange}
            errors={errors.RegNo}
            required
          />
          {/* <InputControl
            name="DOE"
            label="DOE"
            value={values.DOE}
            onChange={handleInputChange}
            required
          /> */}
          <DatePickerControl
            name="DOE"
            label="DOE"
            value={values.DOE}
            onChange={handleInputChange}
            required
          />
          <InputControl
            name="PhoneNo"
            label="Phone No"
            value={values.PhoneNo}
            onChange={handleInputChange}
            errors={errors.PhoneNo}
            type="number"
            required
          />
          <InputControl
            name="AlternatePhoneNo"
            label="Alternative Phone No"
            value={values.AlternatePhoneNo}
            onChange={handleInputChange}
            errors={errors.AlternatePhoneNo}
            type="number"
            required
          />
          <InputControl
            name="POBox"
            label="POBox"
            value={values.POBox}
            errors={errors.POBox}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="FaxNo"
            label="Fax No"
            value={values.FaxNo}
            onChange={handleInputChange}
            errors={errors.FaxNo}
            required
          />
          <InputControl
            name="PanNo"
            label="Pan No"
            value={values.PanNo}
            errors={errors.PanNo}
            onChange={handleInputChange}
            type="number"
            required
          />
          <InputControl
            name="AlternateFaxNo"
            label="Alternative Fax No"
            value={values.AlternateFaxNo}
            onChange={handleInputChange}
            errors={errors.AlternateFaxNo}
          />
          <InputControl
            name="EmailID"
            label="Email ID"
            value={values.EmailID}
            onChange={handleInputChange}
            errors={errors.EmailID}
            type="email"
            required
          />
          <InputControl
            name="WebSite"
            label="WebSite"
            value={values.WebSite}
            onChange={handleInputChange}
            required
          />
          <InputControl
            name="Vision"
            label="Vision"
            value={values.Vision}
            onChange={handleInputChange}
            errors={errors.Vision}
          />
          <InputControl
            name="Mission"
            label="Mission"
            value={values.Mission}
            onChange={handleInputChange}
            errors={errors.Mission}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ margin: "10px 0 0 10px" }}
            >
              SUBMIT
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default SchoolSettingsForm;
