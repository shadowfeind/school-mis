import React from "react";
import ExamResultWithMarksDesign from "./ExamResultWithMarksDesign";

const ExamResultWithMarksModel = ({ examReport }) => {
  const examTerm =
    examReport &&
    examReport.ddlAcademicYearCalendar.filter(
      (x) => x.Key === examReport.idAcademicYearCalendar
    );

  return (
    <>
      {examReport &&
        examReport.dbStudentModelLst.map((student) => {
          let subjects = examReport.dbModelLst.filter(
            (s) => s.IDHREmployee === student.IDHREmployee
          );
          let levelTest = examReport.LevelTestLst.filter(
            (s) => s.IDHREmployee === student.IDHREmployee
          );
          let studentAttendance = examReport.StudentAttendanceDay.filter(
            (s) => s.IDHREmployee === student.IDHREmployee
          );

          let studentClass = examReport.ddlLevel.filter(
            (x) => x.Key === examReport.level
          );
          let studentYear = examReport.ddlAcademicYear.filter(
            (x) => x.Key === examReport.idAcademicYear
          );
          let studentSection = examReport.ddlSection.filter(
            (x) => x.Key === examReport.classSection
          );
          return (
            <ExamResultWithMarksDesign
              key={student.$id}
              student={student}
              subjects={subjects}
              levelTest={levelTest}
              studentAttendance={studentAttendance}
              dbModelLst={examReport.dbModelLst}
              forDate={examReport.footerModel}
              examTerm={examTerm[0]}
              studentClass={studentClass[0]}
              studentYear={studentYear[0]}
              studentSection={studentSection[0]}
            />
          );
        })}
    </>
  );
};

export default ExamResultWithMarksModel;
