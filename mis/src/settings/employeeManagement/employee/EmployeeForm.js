import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import SelectControl from "../../../components/controls/SelectControl";
import {
  employeeCreateAction,
  updateSingleEmployeeAction,
} from "./EmployeeActions";

const initialFormValues = {
  IDHRCompany: 2,
  IDHREmployee: 0,
  IDHREmployeeCategoryRole: 0,
  LoginIDHREmployee: "",
  FirstName: "",
  MiddleName: "",
  LastName: "",
  EmailID: "",
  Sex: "",
  DOJ: "2021-09-27T10:59:00.89",
  IDHREmployeeType: "",
  IDHRBranch: "",
  Position: "",
  WebLoginAccess: "",
  ShortName: "",
  Title: "",
  DOB: "2000-09-27T10:59:00.89",
  MobileNumber: "",
  Married: "",
  IDHRRole: "",
  BankAC: "",
  IDHRDepartment: "",
  JoinedPosition: "",
  IsNewlyAdded: 1,
  IsActive: 1,
  Created_By: 0,
  Created_On: "2021-10-01T04:20:16.288Z",
  Updated_On: "2021-10-01T04:20:16.288Z",
};

const gender = [
  { Key: "male", Value: "Male" },
  { Key: "female", Value: "Female" },
];

const loginAccess = [
  { Key: true, Value: "Yes" },
  { Key: false, Value: "No" },
];

const married = [
  { Key: "yes", Value: "Yes" },
  { Key: "no", Value: "No" },
];

const EmployeeForm = ({ employee, setOpenPopup }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.LoginIDHREmployee = !fieldValues.LoginIDHREmployee
      ? "This feild is required"
      : !fieldValues.LoginIDHREmployee.trim()
      ? "This feild is required"
      : "";
      temp.IDHREmployeeCategoryRole = !fieldValues.IDHREmployeeCategoryRole ? "This feild is required" :"";
      temp.IDHRDepartment = !fieldValues.IDHRDepartment ? "This feild is required" :"";
      temp.JoinedPosition = !fieldValues.JoinedPosition ? "This feild is required" :"";
      temp.Married = !fieldValues.Married ? "This feild is required" :"";
      temp.IDHRRole = !fieldValues.IDHRRole ? "This feild is required" :"";
      temp.WebLoginAccess = !fieldValues.WebLoginAccess ? "This feild is required" :"";
      temp.Sex = !fieldValues.Sex ? "This feild is required" :"";
      temp.IDHRBranch = !fieldValues.IDHRBranch ? "This feild is required" :"";
      temp.IDHREmployeeType = !fieldValues.IDHREmployeeType ? "This feild is required" :"";
      temp.Title = !fieldValues.Title ? "This feild is required" :"";
      temp.Position = !fieldValues.Position ? "This feild is required" :"";
      temp.DOB = !fieldValues.DOB ? "This feild is required" :"";
      temp.DOJ = !fieldValues.DOJ ? "This feild is required" :"";
    temp.FirstName = !fieldValues.FirstName
      ? "This feild is required"
      : !fieldValues.FirstName.trim()
      ? "This feild is required"
      : "";
    temp.LastName = !fieldValues.LastName
      ? "This feild is required"
      : !fieldValues.LastName.trim()
      ? "This feild is required"
      : "";
      temp.MobileNumber = !fieldValues.MobileNumber
      ? "This feild is required"
      : !fieldValues.MobileNumber>7
      ? "Mobile No. must be atleast 7."
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const { employeeCreate } = useSelector((state) => state.getAllEmployeeCreate);

  const {
    ddlEmployeeCategoryRole,
    ddlTitle,
    ddlBranch,
    ddlEmployeeType,
    ddlPosition,
    ddlRole,
    ddlDepartment,
  } = employeeCreate;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (values.IDHREmployee === 0) {
        dispatch(employeeCreateAction(values));
      } else {
        dispatch(updateSingleEmployeeAction(values));
      }
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
          <SelectControl
            name="IDHREmployeeCategoryRole"
            label="Category Role"
            value={values.IDHREmployeeCategoryRole}
            options={ddlEmployeeCategoryRole}
            onChange={handleInputChange}
            errors={errors.IDHREmployeeCategoryRole}
          />
          <InputControl
            name="LoginIDHREmployee"
            label="Login ID*"
            value={values.LoginIDHREmployee}
            onChange={handleInputChange}
            errors={errors.LoginIDHREmployee}
          />
          <InputControl
            name="FirstName"
            label="First Name*"
            value={values.FirstName}
            onChange={handleInputChange}
            errors={errors.FirstName}
          />
          <InputControl
            name="LastName"
            label="Last Name*"
            value={values.LastName}
            onChange={handleInputChange}
            errors={errors.FirstName}
          />
          <InputControl
            name="EmailID"
            label="Email Address"
            value={values.EmailID}
            onChange={handleInputChange}
            errors={errors.EmailID}
          />
          <SelectControl
            name="Sex"
            label="Gender"
            value={values.Sex}
            onChange={handleInputChange}
            options={gender}
            errors={errors.Sex}
          />
          <DatePickerControl
            name="DOJ"
            label="Date Of Joining"
            value={values.DOJ}
            onChange={handleInputChange}
            errors={errors.DOJ}
          />
          <SelectControl
            name="IDHREmployeeType"
            label="Employee Type"
            value={values.IDHREmployeeType}
            onChange={handleInputChange}
            options={ddlEmployeeType}
            errors={errors.IDHREmployeeType}
          />
          <SelectControl
            name="IDHRBranch"
            label="Branch Name"
            value={values.IDHRBranch}
            onChange={handleInputChange}
            options={ddlBranch}
            errors={errors.IDHRBranch}
          />
          <SelectControl
            name="Position"
            label="Position"
            value={values.Position}
            onChange={handleInputChange}
            options={ddlPosition}
            errors={errors.Position}
          />
          <SelectControl
            name="WebLoginAccess"
            label="Web Login Access"
            value={values.WebLoginAccess}
            onChange={handleInputChange}
            options={loginAccess}
            errors={errors.WebLoginAccess}
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="ShortName"
            label="Short Name"
            value={values.ShortName}
            onChange={handleInputChange}
          />
          <SelectControl
            name="Title"
            label="Title"
            value={values.Title}
            onChange={handleInputChange}
            options={ddlTitle}
            errors={errors.Title}
          />

          <InputControl
            name="MiddleName"
            label="Middle Name"
            value={values.MiddleName}
            onChange={handleInputChange}
          />
          <DatePickerControl
            name="DOB"
            label="Date Of Birth"
            value={values.DOB}
            onChange={handleInputChange}
            errors={errors.DOB}
          />
          <InputControl
            name="MobileNumber"
            label="Mobile Number"
            value={values.MobileNumber}
            onChange={handleInputChange}
            type="number"
            errors={errors.MobileNumber}
          />
          <SelectControl
            name="Married"
            label="Is Married"
            value={values.Married}
            onChange={handleInputChange}
            options={married}
            errors={errors.Married}
          />
          <SelectControl
            name="IDHRRole"
            label="Role"
            value={values.IDHRRole}
            onChange={handleInputChange}
            options={ddlRole}
            errors={errors.IDHRRole}
          />
          <InputControl
            name="BankAC"
            label="Bank Account"
            value={values.BankAC}
            onChange={handleInputChange}
          />
          <SelectControl
            name="IDHRDepartment"
            label="Department Name"
            value={values.IDHRDepartment}
            onChange={handleInputChange}
            options={ddlDepartment}
            errors={errors.IDHRDepartment}
          />
          <SelectControl
            name="JoinedPosition"
            label="Joined Position"
            value={values.JoinedPosition}
            onChange={handleInputChange}
            options={ddlPosition}
            errors={errors.JoinedPosition}
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

export default EmployeeForm;
