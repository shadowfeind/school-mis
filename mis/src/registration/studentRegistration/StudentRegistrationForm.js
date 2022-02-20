import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import SelectControl from "../../components/controls/SelectControl";
import DatePickerControl from "../../components/controls/DatePickerControl";
import { API_URL } from "../../constants";
import {
  checkRegistrationForStudentAction,
  checkRollNoForStudentAction,
  createSingleStudentRegistrationAction,
  singleStudentRegistrationEditAction,
} from "./StudentRegistrationActions";
import {
  CHECK_REGISTRATION_FOR_STUDENT_RESET,
  CHECK_ROLLNO_FOR_STUDENT_RESET,
} from "./StudentRegistrationConstants";

const initialFormValues = {
  IDAdmissionRegistration: 0,
  RegistrationKey: "",
  md5_password: "",
  sha1_password: "",
  PreEducationMarkList: "",
  IDAdmissionScholarshipScheme: 0,
  IDHRCompany: 0,
  IDAdmissionInquiry: 0,
  IDYearFacultyLink: 0,
  IDAcademicShift: 0,
  RollNo: "",
  BloodGroup: "",
  Gender: "Male",
  FirstName: "",
  MiddleName: "",
  LastName: "",
  FullNameNp: "",
  NearestBusStop: "",
  HealthProblem: "",
  Nationality: "",
  MobileNo: "",
  PhoneNo: "",
  EmailAddress: "",
  DOB: "2021-12-16T07:36:55.593Z",
  DOBNp: "",
  EntranceDate: "2021-12-16T07:36:55.593Z",
  EntranceTime: "",
  EntranceMark: 0,
  InterviewDate: "2021-12-16T07:36:55.593Z",
  InterviewTime: "",
  GDDate: "2021-12-16T07:36:55.593Z",
  GDTime: "",
  InterviewerAMark: 0,
  InterviewerBMark: 0,
  InterviewerCMark: 0,
  InterviewMark: 0,
  InterviewMark_100: 0,
  FolderName: "",
  PhotoName: "",
  FatherName: "",
  FatherContactNo: "",
  FatherEmail: "",
  FatherOccupation: "",
  FatherWorkingOrganization: "",
  FatherWorkingDesignation: "",
  LocalGuardianName: "",
  LocalGuardianContactNo: "",
  LocalGuardianEmail: "",
  LocalGuardianOccupation: "",
  LocalGuardianWorkingOrganization: "",
  LocalGuardianWorkingDesignation: "",
  MotherWorkingOrganization: "",
  MotherWorkingDesignation: "",
  MotherName: "",
  MotherOccupation: "",
  MotherEmail: "",
  MotherContactNo: "",
  EntranceRemark: "",
  InterviewRemark: "",
  ApprovalRemark: "",
  Remark: "",
  EntranceFeeAmount: 0,
  ImmediateEntrance: true,
  IDOnlineSet: 0,
  OnlineExamTime: 0,
  Status: "Admitted",
  EnrollmentRequestBy: 0,
  ApplicationDate: "2021-12-16T07:36:55.593Z",
  EnrollmentRequestOn: "2021-12-16T07:36:55.593Z",
  EnrollmentApprovedBy: 0,
  EnrollmentApprovedOn: "2021-12-16T07:36:55.593Z",
  ReceiptDate: "2021-12-16T07:36:55.593Z",
  ReceiptBy: 0,
  EnrollmentAdmissionBy: 0,
  EnrollmentAdmissionOn: "2021-12-16T07:36:55.593Z",
  EntranceStatus: "",
  InterviewStatus: "",
  GroupDiscussionStatus: "",
  FinalPassMark: 0,
  FinalMark: 0,
  FinalStatus: "",
  Section: 0,
  ClassRoom: 0,
  PermanentHouseNo: "",
  TemporaryHouseNo: "",
  PermanentTownVillage: "",
  TemporaryTownVillage: "",
  PermanentWardNo: "",
  TemporaryWardNo: "",
  PermanentDistrict: "",
  TemporaryDistrict: "",
  PermanentCountry: "",
  PermanentZone: "",
  TemporaryCountry: "",
  TemporaryZone: "",
  PlaceOfBirth: "",
  SLCSchoolName: "",
  SLCBoard: "",
  SLCYearOfCompletion: "",
  SLCDivision: "",
  SLCObtainedPercent: 0,
  IntermediateCollegeName: "",
  IntermediateStream: "",
  IntermediateBoard: "",
  IntermediateYearOfCompletion: "",
  IntermediateDivision: "",
  IntermediateObtainedPercent: 0,
  BachelorCollegeName: "",
  BachelorStream: "",
  BachelorBoard: "",
  BachelorYearOfCompletion: "",
  BachelorDivision: "",
  BachelorObtainedPercent: 0,
  OthersCollegeName: "",
  OthersStream: "",
  OthersBoard: "",
  OthersYearOfCompletion: "",
  OthersDivision: "",
  OthersObtainedPercent: 0,
  StudentHonorsAwards: "",
  Referral: "",
  SLCContribution: 0,
  IntermediateContribution: 0,
  BachelorContribution: 0,
  AEW: 0,
  EntranceGrandTotal: 0,
  TotalPastPercentage: 0,
  RSP: 0,
  NBB: 0,
  KA: 0,
  DT: 0,
  TotalGD_80: 0,
  TotalGD_100: 0,
  InterviewScore: 0,
  TotalFinalScore: 0,
  CBTContribution: 0,
  AWEContribution: 0,
  GroupDiscussionRemark: "string",
  CalculateTotalPastPeform_L: 0,
  CalculateAEW_O: 0,
  CalculateCBT_N: 0,
  CalculateGD_U: 0,
  CalculateInterview_Z: 0,
  OnlineExamAttempt: true,
  IDLevel: 0,
  idAcademicYear: 0,
  idFacultyProgramLink: 0,
  AcademicYear: 0,
  Created_By: 0,
  Updated_By: 0,
  Created_On: "2021-12-16T07:36:55.593Z",
  Updated_On: "2021-12-16T07:36:55.593Z",
};

const StudentRegistrationForm = ({
  singleStudent,
  setOpenPopup,
  getCreateSingleStudentData,
}) => {
  const [image, setImage] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.idAcademicYear = !fieldValues.idAcademicYear.length !== 0 ? "" : "";
    temp.RegistrationKey = !fieldValues.RegistrationKey
      ? "This feild is required"
      : !fieldValues.RegistrationKey.trim()
      ? "This feild is required"
      : "";
    temp.RollNo = !fieldValues.RollNo
      ? "This feild is required"
      : !fieldValues.RollNo.trim()
      ? "This feild is required"
      : "";
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

    temp.MobileNo = !fieldValues.MobileNo
      ? "This feild is required"
      : fieldValues.MobileNo.length == 10
      ? ""
      : "Must be 10 digit";

    // temp.MobileNo = !fieldValues.MobileNo ? "This feild is required" : "";

    temp.EmailAddress = !fieldValues.EmailAddress
      ? "This feild is required"
      : !fieldValues.EmailAddress.trim()
      ? "This feild is required"
      : "";
    temp.FatherName = !fieldValues.FatherName
      ? "This feild is required"
      : !fieldValues.FatherName.trim()
      ? "This feild is required"
      : "";
    temp.LocalGuardianName = !fieldValues.LocalGuardianName
      ? "This feild is required"
      : !fieldValues.LocalGuardianName.trim()
      ? "This feild is required"
      : "";
    temp.Gender = !fieldValues.Gender ? "This feild is required" : "";
    temp.DOB = !fieldValues.DOB ? "This feild is required" : "";
    temp.IDLevel = !fieldValues.IDLevel ? "This feild is required" : "";
    temp.Section = !fieldValues.Section ? "This feild is required" : "";

    temp.FatherContactNo = !fieldValues.FatherContactNo
      ? "This feild is required"
      : fieldValues.FatherContactNo.length == 10
      ? ""
      : "Must be 10 number";
    // temp.LocalGuardianContactNo = !fieldValues.LocalGuardianContactNo
    //   ? "This feild is required"
    //   : fieldValues.LocalGuardianContactNo.length == 10
    //   ? ""
    //   : "Must be 10 number";

    // temp.FatherContactNo = !fieldValues.FatherContactNo
    //   ? "This feild is required"
    //   : "";
    // temp.LocalGuardianContactNo = !fieldValues.LocalGuardianContactNo
    //   ? "This feild is required"
    //   : "";

    temp.ClassLocation =
      fieldValues.ClassLocation && fieldValues.ClassLocation.length > 200
        ? "Must be less than 501 characters"
        : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const { error: regCheckError, success: regCheckSuccess } = useSelector(
    (state) => state.checkRegistrationForStudent
  );

  const { error: rollCheckError, success: rollCheckSuccess } = useSelector(
    (state) => state.checkRollNoForStudent
  );

  if (regCheckError) {
    setErrors((prev) => ({ ...prev, RegistrationKey: regCheckError }));
    dispatch({ type: CHECK_REGISTRATION_FOR_STUDENT_RESET });
  }
  if (regCheckSuccess) {
    setErrors((prev) => ({ ...prev, RegistrationKey: "" }));
    dispatch({ type: CHECK_REGISTRATION_FOR_STUDENT_RESET });
  }
  if (rollCheckError) {
    setErrors((prev) => ({ ...prev, RollNo: rollCheckError }));
    dispatch({ type: CHECK_ROLLNO_FOR_STUDENT_RESET });
  }
  if (rollCheckSuccess) {
    setErrors((prev) => ({ ...prev, RollNo: "" }));
    dispatch({ type: CHECK_ROLLNO_FOR_STUDENT_RESET });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (values.IDAdmissionRegistration === 0) {
        dispatch(
          createSingleStudentRegistrationAction(
            values,
            image
            // singleStudent.idAcademicYear,
            // singleStudent.idFacultyProgramLink,
            // singleStudent.idClass,
            // singleStudent.searchFilterModel
          )
        );
      } else {
        dispatch(
          singleStudentRegistrationEditAction(
            values,
            image,
            singleStudent.idAcademicYear,
            singleStudent.idFacultyProgramLink,
            singleStudent.idClass,
            singleStudent.searchFilterModel
          )
        );
      }
    }
  };

  useEffect(() => {
    if (singleStudent) {
      setValues({
        ...singleStudent.dbModel,
        idAcademicYear: singleStudent.idAcademicYear,
        idFacultyProgramLink: singleStudent.idFacultyProgramLink,
        IDLevel: singleStudent.idClass,
      });
    }
  }, [singleStudent]);

  useEffect(() => {
    if (getCreateSingleStudentData) {
      setValues({ ...getCreateSingleStudentData.dbModel });
    }
  }, [getCreateSingleStudentData]);

  const gender = [{ Key: "", Value: "" }];

  const handleImage = (event) => {
    let imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (x) => {
      setImgSrc(x.target.result);
    };
    reader.readAsDataURL(imageFile);
    setImage(event.target.files[0]);
  };

  const handleRollNo = (id) => {
    if (
      (values.idAcademicYear !== 0) &
      (values.IDLevel !== 0) &
      (values.idFacultyProgramLink !== 0) &
      (values.Section !== 0)
    ) {
      dispatch(
        checkRollNoForStudentAction(
          values.idAcademicYear,
          values.idFacultyProgramLink,
          values.IDLevel,
          values.Section,
          id
        )
      );
      setErrors((prev) => ({
        ...prev,
        RollNo: "",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        RollNo: "please select Academic Year, Faculty Path, Class and Section",
      }));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <SelectControl
            name="idAcademicYear"
            label="Academic Year*"
            value={values.idAcademicYear}
            onChange={handleInputChange}
            options={
              singleStudent
                ? singleStudent.ddlAcademicYear
                : getCreateSingleStudentData
                ? getCreateSingleStudentData.ddlAcademicYear
                : gender
            }
            errors={errors.idAcademicYear}
          />

          <SelectControl
            name="IDLevel"
            label="Class*"
            value={values.IDLevel}
            onChange={handleInputChange}
            options={
              singleStudent
                ? singleStudent.ddlClass
                : getCreateSingleStudentData
                ? getCreateSingleStudentData.ddlClass
                : gender
            }
            errors={errors.IDLevel}
          />
          <InputControl
            name="RegistrationKey"
            label="Registration No.*"
            value={values.RegistrationKey}
            onChange={handleInputChange}
            onBlur={(e) =>
              dispatch(checkRegistrationForStudentAction(e.target.value))
            }
            errors={errors.RegistrationKey}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectControl
            name="idFacultyProgramLink"
            label="Faculty Path*"
            value={values.idFacultyProgramLink}
            onChange={handleInputChange}
            options={
              singleStudent
                ? singleStudent.ddlFacultyProgramLink
                : getCreateSingleStudentData
                ? getCreateSingleStudentData.ddlFacultyProgramLink
                : gender
            }
          />
          <SelectControl
            name="Section"
            label="Section*"
            value={values.Section}
            onChange={handleInputChange}
            options={
              singleStudent
                ? singleStudent.ddlSection
                : getCreateSingleStudentData
                ? getCreateSingleStudentData.ddlSection
                : gender
            }
            errors={errors.Section}
          />
          <InputControl
            name="RollNo"
            label="Roll No.*"
            value={values.RollNo}
            type="number"
            onChange={handleInputChange}
            onBlur={(e) => handleRollNo(e.target.value)}
            errors={errors.RollNo}
          />
        </Grid>
      </Grid>
      <h4>Personal Details</h4>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="FirstName"
            label="First Name*"
            value={values.FirstName}
            onChange={handleInputChange}
            errors={errors.FirstName}
          />
          <InputControl
            name="MiddleName"
            label="Middle Name"
            value={values.MiddleName}
            onChange={handleInputChange}
          />
          <InputControl
            name="LastName"
            label="Last Name*"
            value={values.LastName}
            onChange={handleInputChange}
            errors={errors.LastName}
          />
          <SelectControl
            name="Gender"
            label="Gender*"
            value={values.Gender}
            onChange={handleInputChange}
            options={
              singleStudent
                ? singleStudent.ddlGender
                : getCreateSingleStudentData
                ? getCreateSingleStudentData.ddlGender
                : gender
            }
            errors={errors.Gender}
          />
          <DatePickerControl
            name="DOB"
            label="Date Of Birth*"
            value={values.DOB}
            onChange={handleInputChange}
            errors={errors.DOB}
          />
          <InputControl
            name="PlaceOfBirth"
            label="Place of Birth"
            value={values.PlaceOfBirth}
            onChange={handleInputChange}
          />
          <InputControl
            name="MobileNo"
            label="Contact No."
            value={values.MobileNo}
            onChange={handleInputChange}
            type="number"
            errors={errors.MobileNo}
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="ImageUploaded"
            // label="Select Profile Photo"
            // value={values.ClassLocation}
            onChange={(e) => handleImage(e)}
            type="file"
            // errors={errors.ClassLocation}
          />

          <img
            src={
              imgSrc
                ? imgSrc
                : singleStudent && `${API_URL}${singleStudent.FullPath}`
            }
            height={200}
            width={200}
          />
          <SelectControl
            name="Nationality"
            label="Nationality"
            value={values.Nationality}
            onChange={handleInputChange}
            options={
              singleStudent
                ? singleStudent.ddlNationality
                : getCreateSingleStudentData
                ? getCreateSingleStudentData.ddlNationality
                : gender
            }
          />
          <InputControl
            name="EmailAddress"
            label="Email Address*"
            value={values.EmailAddress}
            onChange={handleInputChange}
            type="email"
            errors={errors.EmailAddress}
          />
        </Grid>
      </Grid>
      <h4>Guardian Details</h4>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="FatherName"
            label="Father Name*"
            value={values.FatherName}
            onChange={handleInputChange}
            errors={errors.FatherName}
          />
          <InputControl
            name="FatherContactNo"
            label="Father Contact Number"
            value={values.FatherContactNo}
            onChange={handleInputChange}
            type="number"
            errors={errors.FatherContactNo}
          />
          <InputControl
            name="FatherEmail"
            label="Father Email Address"
            value={values.FatherEmail}
            type="email"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="LocalGuardianName"
            label="Local Guardian Name*"
            value={values.LocalGuardianName}
            onChange={handleInputChange}
            errors={errors.LocalGuardianName}
          />

          <InputControl
            name="LocalGuardianContactNo"
            label="SMS Number"
            value={values.LocalGuardianContactNo}
            onChange={handleInputChange}
            type="number"
            // errors={errors.LocalGuardianContactNo}
          />

          <InputControl
            name="LocalGuardianEmail"
            label="Email Address"
            value={values.LocalGuardianEmail}
            onChange={handleInputChange}
            type="email"
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

export default StudentRegistrationForm;
