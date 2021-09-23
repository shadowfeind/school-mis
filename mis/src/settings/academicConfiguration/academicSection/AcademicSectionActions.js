import axios from "axios";
import {
  GET_ALL_ACADEMIC_SECTION_FAIL,
  GET_ALL_ACADEMIC_SECTION_REQUEST,
  GET_ALL_ACADEMIC_SECTION_SUCCESS,
} from "./AcademicSectionConstants";

export const getAllAcademicSectionAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACADEMIC_SECTION_REQUEST });

    const { data } = await axios.get(
      "http://localhost:5000/api/mock/academicSection"
    );

    dispatch({ type: GET_ALL_ACADEMIC_SECTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_SECTION_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
