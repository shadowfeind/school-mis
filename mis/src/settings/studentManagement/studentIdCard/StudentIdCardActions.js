import axios from "axios";
import { API_URL } from "../../../constants";
import {
  GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_FAIL,
  GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_REQUEST,
  GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_SUCCESS,
  GET_INITIAL_STUDENT_ID_CARD_DATA_FAIL,
  GET_INITIAL_STUDENT_ID_CARD_DATA_REQUEST,
  GET_INITIAL_STUDENT_ID_CARD_DATA_SUCCESS,
} from "./StudentIdCardConstants";

export const getInitialStudentIdCardDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_INITIAL_STUDENT_ID_CARD_DATA_REQUEST });

    const { data } =
      await axios.get(`${API_URL}/api/StudentIdCard/GetAllStudentIdCard
        `);

    dispatch({
      type: GET_INITIAL_STUDENT_ID_CARD_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_INITIAL_STUDENT_ID_CARD_DATA_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getActiveStudentsForStudentIdCardDataAction =
  (year, program, classId, shift, id, section, date) => async (dispatch) => {
    try {
      dispatch({ type: GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_REQUEST });

      const { data } =
        await axios.get(`${API_URL}/api/GetListStudentIdCard/${year}/${program}/${classId}/${shift}/${id}/${section}/${date}
        `);

      dispatch({
        type: GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
