import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import {
  getHeaderBannerAction,
  getHeaderContentAction,
} from "../../dashboard/DashboardActions";
import {
  GET_HEADER_BANNER_RESET,
  GET_HEADER_CONTENT_RESET,
} from "../../dashboard/DashboardConstants";
import { useSelector } from "react-redux";


const AdmitCardDesign = ({ student, imagePath,headerBanners, classname, examDate }) => {
  

  const dispatch = useDispatch();

  return (
    <div>
      <div className="admitCard">
        <div style={{ textAlign: "center" }}>
          <img
            src={`${API_URL}${headerBanners}`}
            height="60px"
            style={{ marginTop: "15px" }}
          />
        </div>
        <h3
          style={{
            textAlign: "center",
            padding: "6px",
            backgroundColor: "#eaeff5",
            marginBottom: "-10px",
          }}
        >
          Admit Card
        </h3>
        <h4 style={{ textAlign: "center" }}>{student.EventName}</h4>
        <Grid container>
          <Grid item xs={9} style={{ padding: "0 0 0 12px" }}>
            <h5 style={{ marginTop: "-4px" }}>
              <strong>Name:</strong> {student.FullName}
            </h5>
            <h5 style={{ marginTop: "-4px" }}>
              <strong>Class:</strong> {classname}
            </h5>
            <h5 style={{ marginTop: "-4px" }}>
              <strong>Symbol No:</strong> {student.UniversityRegistrationNumber}
            </h5>
            <h5 style={{ marginTop: "-4px" }}>
              <strong>Exam Date:</strong> {examDate.slice(0, 10)}
            </h5>
          </Grid>
          <Grid item xs={3} style={{ padding: "0 12px 0 0" }}>
            <img
              src="https://kimberlineducation.com/wp-content/uploads/2017/05/article-hero-image-2.jpg"
              height="80px"
              width="80px"
            />
            <h5
              style={{
                paddingTop: "8px",
                marginTop: "40px",
                borderTop: "1px solid #000",
              }}
            >
              Principle Signature
            </h5>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AdmitCardDesign;
