import React, { useRef } from "react";
import ExamResultDesign from "./ExamResultDesign";
import { useReactToPrint } from "react-to-print";
import { Button } from "@material-ui/core";

const ExamResultModel = ({ examReport, headerBanners }) => {
  const componentRef = useRef();
  const printPdf = useReactToPrint({
    content: () => componentRef.current,
  });
  const examTerm =
    examReport &&
    examReport.ddlAcademicYearCalendar.filter(
      (x) => x.Key === examReport.idAcademicYearCalendar
    );

  return (
    <div id="result-with-grades" ref={componentRef}>
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
          // let studentYear = examReport.ddlAcademicYear.filter(
          //   (x) => x.Key === examReport.idAcademicYear
          // );
          let studentSection = examReport.ddlSection.filter(
            (x) => x.Key === examReport.classSection
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
              studentClass={studentClass[0]}
              studentYear={examReport.npYear}
              studentSection={studentSection[0]}
              headerBanners={headerBanners}
            />
          );
        })}
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingTop: "10px",
          marginTop: "10px",
          borderTop: "1px solid #f3f3f3",
        }}
      >
        <Button onClick={printPdf} variant="contained" color="primary">
          PRINT
        </Button>
      </div>
    </div>
  );
};

export default ExamResultModel;
