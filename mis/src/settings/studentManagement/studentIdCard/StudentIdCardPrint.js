import React from "react";
import CustomContainer from "../../../components/CustomContainer";

const StudentIdCardPrint = ({ studentId, classNames, examDates }) => {
  return (
     
    <div
      style={{
        width: "270px",
        height: "320px",
        padding: "10px",
        margin: "10px",
        border: "1px solid #000",
        borderRadius: "10px",
      }}
    >
     <CustomContainer>
      <div style={{ textAlign: "center" }}>
        <h1>School Logo</h1>
        <h4>Admit Card</h4>
        <h5 style={{ backgroundColor: "$f3f3f3", padding: "5px" }}>
          {studentId.EventName}
        </h5>
      </div>
      <div style={{ textAlign: "center" }}>
        <h6>
          <strong>Name:</strong> {studentId.StudentFullName}
        </h6>
        <h6>
          <strong>Class:</strong> {classNames.className}
        </h6>
        <h6>
          <strong>Symbol No:</strong> {studentId.UniversityRegistrationNumber}
        </h6>
        <h6>
          <strong>Section:</strong> {examDates.examDate.slice(0, 10)}
        </h6>
      </div>
      </CustomContainer>
    </div>
    
  );
};

export default StudentIdCardPrint;
