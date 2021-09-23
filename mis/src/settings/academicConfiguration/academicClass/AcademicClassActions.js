import axios from "axios";
import {
  GET_ALL_ACADEMIC_CLASS_FAIL,
  GET_ALL_ACADEMIC_CLASS_REQUEST,
  GET_ALL_ACADEMIC_CLASS_SUCCESS,
} from "./AcademicClassConstants";

export const getAllAcademicClassAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACADEMIC_CLASS_REQUEST });

    const { data } = await axios.get(
      "http://localhost:5000/api/mock/academicClass"
    );

    dispatch({ type: GET_ALL_ACADEMIC_CLASS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_CLASS_FAIL,
      payload: error.message,
    });
  }
};
