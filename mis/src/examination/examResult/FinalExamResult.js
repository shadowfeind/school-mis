import React from "react";
import FinalExamResultDesign from "./FinalExamResultDesign";

const FinalExamResult = ({ result }) => {
  return (
    <>
      {result &&
        result.dbStudentModelLst.map((student) => {
          let subjectList = result.dbModelLstForCountSubject.filter(
            (x) =>
              (x.IDHREmployee === student.IDHREmployee) &
              (x.EventName == "FIRST TERM EXAMINATION")
          );
          let firstTerm = result.dbModelLst.filter(
            (x) =>
              (x.EventName == "FIRST TERM EXAMINATION") &
              (x.IDHREmployee === student.IDHREmployee)
          );
          let secondTerm = result.dbModelLst.filter(
            (x) =>
              (x.EventName == "SECOND TERM EXAMINATION") &
              (x.IDHREmployee === student.IDHREmployee)
          );
          let thirdTerm = result.dbModelLst.filter(
            (x) =>
              (x.EventName == "THIRD TERM EXAMINATION") &
              (x.IDHREmployee === student.IDHREmployee)
          );
          let finalTerm = result.dbModelLst.filter(
            (x) =>
              (x.EventName == "FINAL TERM EXAMINATION") &
              (x.IDHREmployee === student.IDHREmployee)
          );
          let attendance = result.StudentAttendanceDay.filter(
            (x) => x.IDHREmployee === student.IDHREmployee
          );
          let crrentStudentId = result.dbModelResultLst.filter(
            (x) => x.Key === student.IDHREmployee
          );
          let currentStudentRank = [];
          if (crrentStudentId.length > 0 && crrentStudentId.value !== "Fail") {
            currentStudentRank = result.dbModelRankLst.filter(
              (x) => x.Key === student.IDHREmployee
            );
          }
          let studentClass = result.ddlLevel.filter(
            (x) => x.Key === result.level
          );
          let studentSection = result.ddlSection.filter(
            (x) => x.Key === result.classSection
          );
          let studentYear = result.ddlAcademicYear.filter(
            (x) => x.Key === result.idAcademicYear
          );

          return (
            <FinalExamResultDesign
              student={student}
              key={student.$id}
              firstTerm={firstTerm}
              secondTerm={secondTerm}
              thirdTerm={thirdTerm}
              finalTerm={finalTerm}
              subjectList={subjectList}
              attendance={attendance}
              currentStudentRank={currentStudentRank}
              studentClass={studentClass}
              studentSection={studentSection}
              studentYear={studentYear}
              resultDate={result.footerModel.PublishDate}
            />
          );
        })}
    </>
  );
};

export default FinalExamResult;