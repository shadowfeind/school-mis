import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";

export const getALLAssignStudentSubject = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_ASSIGN_STUDENT_SUBJECT_REQUEST });
  
      const { data } = await axios.get(
        `${API_URL}/api/AcaFacultySubjectLink/GetAcademicFacultySubjectLink`,
        tokenConfig
      );
  
      dispatch({ type: GET_ALL_ASSIGN_STUDENT_SUBJECT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_ASSIGN_STUDENT_SUBJECT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };