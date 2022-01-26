import axios from "axios";
import { API_URL, tokenConfig } from "../../constants";
import {
  GET_ALL_TOTAL_STUDENT_ATTENDANCE_FAIL,
  GET_ALL_TOTAL_STUDENT_ATTENDANCE_REQUEST,
  GET_ALL_TOTAL_STUDENT_ATTENDANCE_SUCCESS,
} from "./TotalStudentAttendanceConstant";

export const getAllTotalStudentAttendanceAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TOTAL_STUDENT_ATTENDANCE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/TotalStudentAttendance/GetAllTotalStudentAttendance`,
      tokenConfig
    );

    dispatch({
      type: GET_ALL_TOTAL_STUDENT_ATTENDANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_TOTAL_STUDENT_ATTENDANCE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
