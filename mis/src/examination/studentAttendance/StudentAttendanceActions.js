import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_ALL_STUDEN_ATTENDANCE_FAIL,
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_FAIL,
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_REQUEST,
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_SUCCESS,
  GET_ALL_STUDEN_ATTENDANCE_REQUEST,
  GET_ALL_STUDEN_ATTENDANCE_SUCCESS,
  GET_BULK_STUDENT_ATTENDANCE_FAIL,
  GET_BULK_STUDENT_ATTENDANCE_REQUEST,
  GET_BULK_STUDENT_ATTENDANCE_SUCCESS,
  POST_BULK_STUDENT_ATTENDANCE_FAIL,
  POST_BULK_STUDENT_ATTENDANCE_REQUEST,
  POST_BULK_STUDENT_ATTENDANCE_SUCCESS,
} from "./StudentAttendanceConstants";

export const getAllStudentAttendanceInitialDataAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_REQUEST });

      const { data } =
        await axios.get(`${API_URL}/api/StudentAttendance/GetAllStudentAttendance
      `);

      dispatch({
        type: GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getAllStudentAttendanceAction =
  (year, program, classId, section, shift, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_STUDEN_ATTENDANCE_REQUEST });

      const { data } =
        await axios.get(`${API_URL}/api/GetListStudentAttendance/${year}/${program}/${classId}/${section}/${shift}/${event}/0/GetListStudentAttendance
      `);

      dispatch({
        type: GET_ALL_STUDEN_ATTENDANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_STUDEN_ATTENDANCE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getBulkStudentAttendanceAction =
  (year, program, classId, section, shift, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_BULK_STUDENT_ATTENDANCE_REQUEST });

      const { data } =
        await axios.get(`${API_URL}/api/GetBulkAttendance/${year}/${program}/${classId}/${section}/${shift}/${event}
      `);

      dispatch({
        type: GET_BULK_STUDENT_ATTENDANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BULK_STUDENT_ATTENDANCE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const postBulkStudentAttendanceAction =
  (students, search) => async (dispatch) => {
    try {
      dispatch({ type: POST_BULK_STUDENT_ATTENDANCE_REQUEST });

      const jsonData = JSON.stringify({
        dbModelPresentAbsentLst: students,
        searchFilterModel: search,
      });

      // console.log(jsonData);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${API_URL}/api/StudentAttendance/PostStudentAttendance`,
        jsonData,
        config
      );

      dispatch({ type: POST_BULK_STUDENT_ATTENDANCE_SUCCESS });
    } catch (error) {
      dispatch({
        type: POST_BULK_STUDENT_ATTENDANCE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
