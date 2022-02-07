import React from "react";
import ExamResultDesign from "./ExamResultDesign";

const ExamResultModel = ({ examReport }) => {
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
            />
          );
        })}
    </>
  );
};

export default ExamResultModel;
