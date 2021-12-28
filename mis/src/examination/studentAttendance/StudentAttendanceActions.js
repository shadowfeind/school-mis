import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_FAIL,
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_REQUEST,
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_SUCCESS,
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
