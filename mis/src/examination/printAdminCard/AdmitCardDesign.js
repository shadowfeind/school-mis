import React from "react";
import { API_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";

const AdmitCardDesign = ({
  student,
  imagePath,
  headerBanners,
  classname,
  examDate,
  principleSignature,
  year,
  yearDdl,
}) => {
  const studentImage = imagePath?.filter((x) => x.Key === student.IDHREmployee);
  const yearToShow = yearDdl?.filter((x) => x.Key === year);

  return (
    <div>
      <div className="admitCard">
        <div className="admitCard-Top">
          <div style={{ textAlign: "center" }}>
            <img src={`${API_URL}${headerBanners}`} height="60px" />
          </div>
          <h3>Admit Card</h3>
        </div>
        <div className="admitCard-Bottom">
          <h4>
            {student.EventName} :{" "}
            {yearToShow?.length > 0 && yearToShow[0]?.Value}
          </h4>
          <Grid container>
            <Grid item xs={8}>
              <h5>
                <strong>Name:</strong> {student.FullName}
              </h5>
              <h5>
                <strong>Class:</strong> {classname}
              </h5>
              <h5>
                <strong>Symbol No:</strong>{" "}
                {student.UniversityRegistrationNumber}
              </h5>
              <h5>
                <strong>Exam Date:</strong> {examDate.slice(0, 10)}
              </h5>
            </Grid>
            <Grid item xs={4}>
              {studentImage?.length > 0 && (
                <img
                  src={`${API_URL}${studentImage[0].Value}`}
                  height="50px"
                  width="50px"
                />
              )}
              <div style={{ marginTop: "10px" }}>
                {principleSignature && (
                  <img src={`${API_URL}${principleSignature}`} height="20px" />
                )}
              </div>

              <h6
                style={{
                  margin: "3px",
                  borderTop: "1px solid #000",
                  display: "inline-block",
                }}
              >
                Principle Signature
              </h6>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default AdmitCardDesign;
