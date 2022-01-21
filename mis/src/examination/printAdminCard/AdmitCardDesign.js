import React from "react";

const AdmitCardDesign = ({ student, imagePath, classname, examDate }) => {
  return (
    <div
    // style={{
    //   width: "350px",
    //   height: "353.5px",
    //   padding: "10px",
    //   margin: "10px",
    //   border: "1px solid #000",
    //   borderRadius: "10px",
    //   textAlign: "center",
    // }}
    >
      <div className="admitCard">
        <img
          src="https://i.ibb.co/MfvhYfw/testlogo.png"
          height="60px"
          style={{ marginTop: "15px" }}
        />
        <h4>Admit Card</h4>
        <h5>{student.EventName}</h5>
        <h6>
          <strong>Name:</strong> {student.FullName}
        </h6>
        <h6>
          <strong>Class:</strong> {classname}
        </h6>
        <h6>
          <strong>Symbol No:</strong> {student.UniversityRegistrationNumber}
        </h6>
        <h6>
          <strong>Exam Date:</strong> {examDate.slice(0, 10)}
        </h6>
      </div>
    </div>
  );
};

export default AdmitCardDesign;
