import React from "react";
import AdmitCardDesign from "./AdmitCardDesign";

const PrintAdminCardPrint = ({ students, imagePath, classname, examDate }) => {
  return (
    <>
      {students &&
        students.map((student) => (
          <AdmitCardDesign
            key={student.$id}
            student={student}
            imagePath={imagePath}
            classname={classname}
            examDate={examDate}
          />
        ))}
    </>
  );
};

export default PrintAdminCardPrint;
