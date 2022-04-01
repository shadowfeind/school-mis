import React, { useState, useEffect } from "react";
import { API_URL } from "../../../constants";
import { useDispatch } from "react-redux";
import { getHeaderBannerAction, getHeaderContentAction } from "../../../dashboard/DashboardActions";
import { GET_HEADER_BANNER_RESET, GET_HEADER_CONTENT_RESET } from "../../../dashboard/DashboardConstants";
import { useSelector } from "react-redux";
import CustomContainer from "../../../components/CustomContainer";

const StudentIdCardPrint = ({ studentId,headerBanners, classNames, examDates }) => {

  const dispatch = useDispatch();
  
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
      <div className="admitCard">
        <img
          src={`${API_URL}${headerBanners}`}
          height="60px"
          width="270px"
          style={{ marginTop: "15px" }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
      <h4>ID Card</h4>
        <h6>
          <strong>Name:</strong> {studentId.StudentFullName}
        </h6>
        <h6>
          <strong>Class:</strong> {classNames?.IdLevel}
        </h6>
        <h6>
          <strong>Symbol No:</strong> {studentId.UniversityRegistrationNumber}
        </h6>
        <h6>
          <strong>Section:</strong>
        </h6>
      </div>
    </div>
  );
};

export default StudentIdCardPrint;
