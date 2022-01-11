import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_ALL_EDUCATION_FAIL,
  GET_ALL_EDUCATION_REQUEST,
  GET_ALL_EDUCATION_SUCCESS,
} from "./EducationConstants";

export const getAllEducationAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EDUCATION_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_Education/GetAllPIDEducation`
    );

    dispatch({ type: GET_ALL_EDUCATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EDUCATION_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
