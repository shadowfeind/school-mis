import React from "react";
import ExamResultDesign from "./ExamResultDesign";

const ExamResultModel = ({ examReport }) => {
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

          return (
            <ExamResultDesign
              key={student.$id}
              student={student}
              subjects={subjects}
              levelTest={levelTest}
              studentAttendance={studentAttendance}
              dbModelLst={examReport.dbModelLst}
              forDate={examReport.footerModel}
              examTerm={examTerm[0]}
            />
          );
        })}
    </>
  );
};

export default ExamResultModel;
