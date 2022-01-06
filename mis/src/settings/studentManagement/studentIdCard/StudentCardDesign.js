import React from "react";

const StudentCardDesign = ({ student, imagePath, classname, examDate }) => {
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
      <div style={{ textAlign: "center" }}>
        <h1>School Logo</h1>
        <h4>Admit Card</h4>
        <h5 style={{ backgroundColor: "$f3f3f3", padding: "5px" }}>
          {student.EventName}
        </h5>
      </div>
      <div style={{ textAlign: "center" }}>
        <h6>
          <strong>Name:</strong> {student.StudentFullName}
        </h6>
        <h6>
          <strong>Class:</strong> {classname}
        </h6>
        <h6>
          <strong>Symbol No:</strong> {student.UniversityRegistrationNumber}
        </h6>
        <h6>
          <strong>Section:</strong> {examDate.slice(0, 10)}
        </h6>
      </div>
    </div>
  );
};

export default StudentCardDesign;
