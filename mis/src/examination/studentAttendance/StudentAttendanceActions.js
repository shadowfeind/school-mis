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
        await axios.get(`${API_URL}/api/GetBulk/${year}/${program}/${classId}/${section}/${shift}/${event}/0/
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
