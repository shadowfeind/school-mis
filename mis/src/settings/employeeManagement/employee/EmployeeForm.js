import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import DatePickerControl from "../../../components/controls/DatePickerControl";

const initialFormValues = {
  IDHREmployee: 0,
  LoginIDHREmployee: "",
  FullName: "",
  IDHRBranch: 1,
  BranchName: "",
  IDHRDepartment: 1,
  DepartmentName: "",
  IDPosition: 1,
  PositionHead: "",
  IDHREmployeeType: 2,
  EmployeeTypeName: "",
  EmailID: "",
  PhoneNo: "",
  MobileNumber: "",
  IsActive: false,
  IDHREmployeeCategoryRole: 1,
  IDAcademicRegistration: 0,
  Updated_On: "2015-04-09T14:20:39.947",
};

const EmployeeForm = ({ employee }) => {
  const dispatch = useDispatch();
  const validate = () => {
    let temp = {};
    temp.FullName =
      values.FullName.length > 200
        ? "FullName must be less than 200 characters"
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
    if (employee) {
      setValues({ ...employee });
    }
  }, [employee]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="LoginIDHREmployee"
            label="Login ID"
            value={values.LoginIDHREmployee}
            onChange={handleInputChange}
            required
          />
          {/* <InputControl
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
          /> */}
          {/* <InputControl
            name="DOE"
            label="DOE"
            value={values.DOE}
            onChange={handleInputChange}
            required
          /> */}
          {/* <DatePickerControl
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
          /> */}
        </Grid>
        <Grid item xs={6}>
          {/* <InputControl
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
          /> */}
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

export default EmployeeForm;
