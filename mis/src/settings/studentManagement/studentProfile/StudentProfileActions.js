import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  GET_ALL_STUDENT_PROFILE_REQUEST,
  GET_ALL_STUDENT_PROFILE_SUCCESS,
  GET_ALL_STUDENT_PROFILE_FAIL,
  GET_ALL_STUDENT_PROFILE_CREATE_REQUEST,
  SINGLE_STUDENT_PROFILE_DETAILS_REQUEST,
  SINGLE_STUDENT_PROFILE_DETAILS_SUCCESS,
  SINGLE_STUDENT_PROFILE_DETAILS_FAIL,
  GET_LIST_STUDENT_PROFILE_REQUEST,
  GET_LIST_STUDENT_PROFILE_SUCCESS,
  GET_LIST_STUDENT_PROFILE_FAIL,
  GET_SINGLE_STUDENT_PROFILE_PASSWORDRESET_DATA_REQUEST,
  GET_SINGLE_STUDENT_PROFILE_PASSWORDRESET_DATA_SUCCESS,
  GET_SINGLE_STUDENT_PROFILE_PASSWORDRESET_DATA_FAIL,
  RESET_SINGLE_STUDENT_PROFILE_PASSWORD_REQUEST,
  RESET_SINGLE_STUDENT_PROFILE_PASSWORD_SUCCESS,
  RESET_SINGLE_STUDENT_PROFILE_PASSWORD_FAIL,
  GET_SINGLE_STUDENT_PROFILE_EDIT_DATA_REQUEST,
  GET_SINGLE_STUDENT_PROFILE_EDIT_DATA_SUCCESS,
  GET_SINGLE_STUDENT_PROFILE_EDIT_DATA_FAIL,
  UPDATE_SINGLE_STUDENT_PROFILE_REQUEST,
  UPDATE_SINGLE_STUDENT_PROFILE_SUCCESS,
  UPDATE_SINGLE_STUDENT_PROFILE_FAIL,
  GET_UPLOAD_PHOTO_REQUEST,
  GET_UPLOAD_PHOTO_SUCCESS,
  GET_UPLOAD_PHOTO_FAIL,
} from "./StudentProfileConstants";

export const getAllStudentProfileAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_STUDENT_PROFILE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/StudentProfile/GetStudentProfile`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_STUDENT_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_STUDENT_PROFILE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getListStudentProfileAction =
  ( year, program ,shift, classId, section ,status) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_STUDENT_PROFILE_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/StudentProfile/GetListStudentProfile?idAcademicYear=${year}&idFacultyProgramLink=${program}&idShift=${shift}&idClass=${classId}&classSection=${section}&LevelStatus=${status}`,
        tokenConfig
      );

      dispatch({ type: GET_LIST_STUDENT_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_LIST_STUDENT_PROFILE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getSingleStudentProfileDetailsAction =
  (id, year, program, classId, section,shift ,status) => async (dispatch) => {
    try {
      dispatch({ type: SINGLE_STUDENT_PROFILE_DETAILS_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/StudentProfile/GetSingleStudentProfileForDetail/${id}?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&LevelStatus=${status}`,
        tokenConfig
      );

      dispatch({ type: SINGLE_STUDENT_PROFILE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SINGLE_STUDENT_PROFILE_DETAILS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getSingleStudentProfilePasswordresetDataAction =
  (id, year, program, classId, section,shift ,status) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_STUDENT_PROFILE_PASSWORDRESET_DATA_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/StudentProfile/GetResetPasswordStudent/${id}?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&LevelStatus=${status}`,
        tokenConfig
      );

      dispatch({
        type: GET_SINGLE_STUDENT_PROFILE_PASSWORDRESET_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_STUDENT_PROFILE_PASSWORDRESET_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

  export const getUploadPhotoAction =
  (id, year, program, classId, section,shift ,status) => async (dispatch) => {
    try {
      dispatch({ type: GET_UPLOAD_PHOTO_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/StudentProfile/GetUploadPhoto/${id}?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&LevelStatus=${status}`,
        tokenConfig
      );

      dispatch({
        type: GET_UPLOAD_PHOTO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_UPLOAD_PHOTO_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const resetSingleStudentPasswordAction =
  (studentDetails) => async (dispatch) => {
    try {
      dispatch({ type: RESET_SINGLE_STUDENT_PROFILE_PASSWORD_REQUEST });

      const jsonData = JSON.stringify({
        hrEmployeeModel: studentDetails,
      });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      console.log(jsonData);

      const { data } = await axios.put(
        `${API_URL}/api/StudentProfile/PutResetPasswordStudent
        `,
        jsonData,
        tokenConfig
      );

      dispatch({
        type: RESET_SINGLE_STUDENT_PROFILE_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RESET_SINGLE_STUDENT_PROFILE_PASSWORD_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getSingleStudentProfileEditDataAction =
  (id, year, program, classId, section,shift ,status) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_STUDENT_PROFILE_EDIT_DATA_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/StudentProfile/GetSingleStudentProfileForEdit/${id}?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&LevelStatus=${status}`,
        tokenConfig
      );

      dispatch({
        type: GET_SINGLE_STUDENT_PROFILE_EDIT_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_STUDENT_PROFILE_EDIT_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const updateSingleStudentAction =
  (studentDetails) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_STUDENT_PROFILE_REQUEST });

      const RollNo = studentDetails.RollNo;
      const jsonData = JSON.stringify({
        hrEmployeeModel: studentDetails,
        RollNo,
      });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      console.log(jsonData);

      const { data } = await axios.put(
        `${API_URL}/api/StudentProfile/PutSingleStudentProfile?actionType=1
        `,
        jsonData,
        tokenConfig
      );

      dispatch({
        type: UPDATE_SINGLE_STUDENT_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_STUDENT_PROFILE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
