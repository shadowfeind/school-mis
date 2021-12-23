import axios from "axios";
import {
  GET_ALL_STUDENT_PROFILE_REQUEST,
  GET_ALL_STUDENT_PROFILE_SUCCESS,
  GET_ALL_STUDENT_PROFILE_FAIL,
  GET_ALL_STUDENT_PROFILE_CREATE_REQUEST,
} from "./StudentProfileConstants";

export const getAllStudentProfileAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_STUDENT_PROFILE_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/GetStudentProfile`);

    dispatch({ type: GET_ALL_STUDENT_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_STUDENT_PROFILE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
