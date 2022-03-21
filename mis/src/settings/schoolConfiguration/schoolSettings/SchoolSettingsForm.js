import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import {
  schoolSettingCreateAction,
  updateSingleScholSettingAction,
} from "./SchoolSettingsActions";

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

const SchoolSettingsForm = ({ college, setOpenPopup }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.CompanyName = !fieldValues.CompanyName
      ? "This feild is required"
      : !fieldValues.CompanyName.trim()
      ? "This feild is required"
      : fieldValues.CompanyName.length > 200
      ? "Company Name must be less than 200 characters"
      : "";
    temp.WebSite = !fieldValues.WebSite
      ? "This feild is required"
      : !fieldValues.WebSite.trim()
      ? "This feild is required"
      : fieldValues.WebSite.length > 200
      ? "Company Name must be less than 200 characters"
      : "";
    temp.ShortForm = !fieldValues.ShortForm
      ? "This feild is required"
      : !fieldValues.ShortForm.trim()
      ? "This feild is required"
      : fieldValues.ShortForm.length > 6
      ? "Short Form cannot be greater than 6 characters"
      : "";
    temp.DOE = !fieldValues.DOE ? "This feild is required" : "";
    temp.POBox = !fieldValues.POBox
      ? "This feild is required"
      : !fieldValues.POBox.trim()
      ? "This feild is required"
      : fieldValues.POBox.length > 20
      ? "POBox cannot be greater than 20 characters"
      : "";
    temp.CompanyAddress = !fieldValues.CompanyAddress
      ? "This feild is required"
      : !fieldValues.CompanyAddress.trim()
      ? "This feild is required"
      : fieldValues.CompanyAddress > 2000
      ? "Company Address cannot be greater than 2000 characters"
      : "";
    temp.RegNo = !fieldValues.RegNo
      ? "This feild is required"
      : !fieldValues.RegNo.trim()
      ? "This feild is required"
      : fieldValues.RegNo.length > 20
      ? "RegNo cannot be greater than 20 characters"
      : "";
    temp.PhoneNo = !fieldValues.PhoneNo
      ? "This feild is required"
      : fieldValues.PhoneNo.length < 7
      ? "PhoneNo cannot be less than 7 characters"
      : "";
    temp.AlternatePhoneNo = !fieldValues.AlternatePhoneNo
      ? "This feild is required"
      : fieldValues.AlternatePhoneNo.length < 7
      ? "AlternatePhoneNo cannot be Less than 7 characters"
      : "";
    temp.FaxNo = !fieldValues.FaxNo
      ? "This feild is required"
      : fieldValues.FaxNo.length > 20
      ? "FaxNo cannot be greater than 20 characters"
      : "";
    temp.PanNo = !fieldValues.PanNo ? "This feild is required" : "";
    temp.EmailID = !fieldValues.EmailID
      ? "This feild is required"
      : !fieldValues.EmailID.trim()
      ? "This feild is required"
      : fieldValues.EmailID.length > 200
      ? "EmailID cannot be greater than 200 characters"
      : "";
    temp.Vision =
      fieldValues.Vision && fieldValues.Vision.length > 500
        ? "Vision cannot be greater than 500 characters"
        : "";
    temp.Mission =
      fieldValues.Mission && fieldValues.Mission.length > 500
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
      if (values.IDHRCompany === 0) {
        dispatch(schoolSettingCreateAction(values));
      } else {
        dispatch(updateSingleScholSettingAction(values));
      }
    }
  };

  useEffect(() => {
    if (college) {
      setValues({ ...college });
    }
  }, [college]);
  const symbolsArr = ["e", "E", "+", "-", "."];
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="CompanyName"
            label="Company Name*"
            value={values.CompanyName}
            onChange={handleInputChange}
            errors={errors.CompanyName}
          />
          <InputControl
            name="ShortForm"
            label="Short Form*"
            value={values.ShortForm}
            onChange={handleInputChange}
            errors={errors.ShortForm}
          />
          <InputControl
            name="CompanyAddress"
            label="Company Address"
            value={values.CompanyAddress}
            onChange={handleInputChange}
            errors={errors.CompanyAddress}
          />
          <InputControl
            name="RegNo"
            label="Reg No*"
            value={values.RegNo}
            onChange={handleInputChange}
            errors={errors.RegNo}
          />
          <DatePickerControl
            name="DOE"
            label="DOE*"
            value={values.DOE}
            onChange={handleInputChange}
            errors={errors.DOE}
          />
          <InputControl
            name="PhoneNo"
            label="Phone No*"
            value={values.PhoneNo}
            onChange={handleInputChange}
            errors={errors.PhoneNo}
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            type="number"
          />
          <InputControl
            name="AlternatePhoneNo"
            label="Alternative Phone No*"
            value={values.AlternatePhoneNo}
            onChange={handleInputChange}
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            errors={errors.AlternatePhoneNo}
            type="number"
          />
          <InputControl
            name="POBox"
            label="PO Box*"
            value={values.POBox}
            errors={errors.POBox}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="FaxNo"
            label="Fax No*"
            value={values.FaxNo}
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            onChange={handleInputChange}
            errors={errors.FaxNo}
            type="number"
          />
          <InputControl
            name="PanNo"
            label="Pan No*"
            value={values.PanNo}
            errors={errors.PanNo}
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            onChange={handleInputChange}
            type="number"
          />
          <InputControl
            name="AlternateFaxNo"
            label="Alternative Fax No"
            value={values.AlternateFaxNo}
            onChange={handleInputChange}
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            errors={errors.AlternateFaxNo}
            type="number"
          />
          <InputControl
            name="EmailID"
            label="Email ID*"
            value={values.EmailID}
            onChange={handleInputChange}
            errors={errors.EmailID}
            type="email"
          />
          <InputControl
            name="WebSite"
            label="WebSite*"
            value={values.WebSite}
            onChange={handleInputChange}
            errors={errors.WebSite}
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
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingTop: "10px",
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

export default SchoolSettingsForm;
