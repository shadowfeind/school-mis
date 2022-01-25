import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import SelectControl from "../../../components/controls/SelectControl";
import { updateSingleStudentAction } from "./StudentProfileActions";

const initialFormValues = {
  IDHREmployee: 0,
  LoginIDHREmployee: "",
  IDHRCompany: 0,
  WebLoginAccess: true,
  Title: "",
  FirstName: "",
  MiddleName: "",
  LastName: "",
  ShortName: "",
  UniversityRegistrationNumber: "",
  DOJ: "2022-01-11T09:15:10.772Z",
  IDHRBranch: 0,
  IDHRDepartment: 0,
  IDHREmployeeType: 0,
  Position: 0,
  EmailID: "",
  AlternateEmailID: "",
  SkypeID: "",
  BankAC: "",
  OfficeNumber: "",
  OfficeNumberExtension: "",
  HomeNumber: "",
  MobileNumber: "",
  OtherNumber: "",
  sha1_password: "",
  md5_password: "",
  IDHRRole: 0,
  imagename: "",
  thumbimagename: "",
  Sex: "",
  Married: "",
  DOB: "2022-01-11T09:15:10.772Z",
  BloodGroup: "",
  SpeakingLanguage: "",
  ReadingWritingLanguage: "",
  ComputerLiteracyLevel: "",
  ComputerLiteracyArea: "",
  JoinedPosition: "",
  Status: "",
  PermanentAddressLine1: "",
  PermanentAddressDistrict: "",
  PermanentAddressZone: "",
  PermanentAddressCountry: "",
  TemporaryAddressLine1: "",
  TemporaryAddressDistrict: "",
  TemporaryAddressZone: "",
  TemporaryAddressCountry: "",
  IsNewlyAdded: true,
  IDHREmployeeCategoryRole: 0,
  Created_By: 0,
  IDAcademicRegistration: 0,
  FatherName: "",
  FatherContactNo: "",
  FatherOccupation: "",
  FatherWorkingDesignation: "",
  FatherWorkingOrganization: "",
  FatherEmail: "",
  MotherName: "",
  MotherContactNo: "",
  MotherOccupation: "",
  MotherWorkingDesignation: "",
  MotherWorkingOrganization: "",
  MotherEmail: "",
  LocalGuardianName: "",
  LocalGuardianContactNo: "",
  LocalGuardianOccupation: "",
  LocalGuardianWorkingDesignation: "",
  LocalGuardianWorkingOrganization: "",
  LocalGuardianEmail: "",
  Religion: "",
  TemporaryTownVillage: "",
  TemporaryWardNo: "",
  PermanentTownVillage: "",
  PermanentWardNo: "",
  RollNo: "",
  RoleName: "",
  IsActive: true,
  Created_On: "2022-01-11T09:15:10.772Z",
  Updated_On: "2022-01-11T09:15:10.772Z",
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

const StudentProfileForm = ({ studentData, setOpenPopup }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.LoginIDHREmployee = !fieldValues.LoginIDHREmployee
      ? "This feild is required"
      : !fieldValues.LoginIDHREmployee.trim()
      ? "This feild is required"
      : "";
    temp.FirstName = !fieldValues.FirstName
      ? "This feild is required"
      : !fieldValues.FirstName.trim()
      ? "This feild is required"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      dispatch(updateSingleStudentAction(values));
    }
  };

  useEffect(() => {
    if (studentData) {
      setValues({ ...studentData.hrEmployeeModel });
    }
  }, [studentData]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
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
            label="Last Name"
            value={values.LastName}
            onChange={handleInputChange}
          />
          <InputControl
            name="EmailID"
            label="Email Address"
            value={values.EmailID}
            onChange={handleInputChange}
          />
          <InputControl
            name="BloodGroup"
            label="Blood Group"
            value={values.BloodGroup}
            onChange={handleInputChange}
          />
          <InputControl
            name="UniversityRegistrationNumber"
            label="Symbol No"
            value={values.UniversityRegistrationNumber}
            onChange={handleInputChange}
          />
          <SelectControl
            name="Sex"
            label="Gender"
            value={values.Sex}
            onChange={handleInputChange}
            options={gender}
          />

          <SelectControl
            name="WebLoginAccess"
            label="Web Login Access"
            value={values.WebLoginAccess}
            onChange={handleInputChange}
            options={loginAccess}
          />
        </Grid>
        <Grid item xs={6}>
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
          />
          <InputControl
            name="MobileNumber"
            label="Mobile Number"
            value={values.MobileNumber}
            onChange={handleInputChange}
            type="number"
          />
          <InputControl
            name="OtherNumber"
            label="Other Number"
            value={values.OtherNumber}
            onChange={handleInputChange}
            type="number"
          />
          <InputControl
            name="RollNo"
            label="Roll No"
            value={values.RollNo}
            onChange={handleInputChange}
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

export default StudentProfileForm;
