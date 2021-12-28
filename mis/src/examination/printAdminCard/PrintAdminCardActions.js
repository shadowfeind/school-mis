import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_FAIL,
  GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_REQUEST,
  GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_SUCCESS,
  GET_INITIAL_ADMIT_CARD_DATA_FAIL,
  GET_INITIAL_ADMIT_CARD_DATA_REQUEST,
  GET_INITIAL_ADMIT_CARD_DATA_SUCCESS,
  PRINT_STUDENTS_ADMIT_CARD_FAIL,
  PRINT_STUDENTS_ADMIT_CARD_REQUEST,
  PRINT_STUDENTS_ADMIT_CARD_SUCCESS,
  SEARCH_STUDENTS_FOR_ADMIT_CARD_FAIL,
  SEARCH_STUDENTS_FOR_ADMIT_CARD_REQUEST,
  SEARCH_STUDENTS_FOR_ADMIT_CARD_SUCCESS,
} from "./PrintAdminCardConstants";

export const getInitialStudentRegistrationDataAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: GET_INITIAL_ADMIT_CARD_DATA_REQUEST });

      const { data } =
        await axios.get(`${API_URL}/api/ExamAdmitCard/GetAllExamAdmitCard
        `);

      dispatch({
        type: GET_INITIAL_ADMIT_CARD_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_INITIAL_ADMIT_CARD_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getActiveStudentsForAdmitCardDataAction =
  (year, program, classId, shift) => async (dispatch) => {
    try {
      dispatch({ type: GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_REQUEST });

      const { data } =
        await axios.get(`${API_URL}/api/GetActiveStudentsOnly/${year}/${program}/${classId}/${shift}
        `);

      dispatch({
        type: GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const searchStudentsForAdmitCardDataAction =
  (year, program, classId, section, shift, event, id) => async (dispatch) => {
    try {
      dispatch({ type: SEARCH_STUDENTS_FOR_ADMIT_CARD_REQUEST });

      const { data } =
        await axios.get(`${API_URL}/api/GetListExamAdmitCard/${year}/${program}/${classId}/${section}/${shift}/${event}/${id}/0
        `);

      dispatch({
        type: SEARCH_STUDENTS_FOR_ADMIT_CARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_STUDENTS_FOR_ADMIT_CARD_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const printStudentsAdmitCardDataAction =
  (year, program, classId, section, shift, event, id, date) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRINT_STUDENTS_ADMIT_CARD_REQUEST });

      const { data } =
        await axios.get(`${API_URL}/api/GetBulkToPrintExamAdmitCard/${year}/${program}/${classId}/${section}/${shift}/${event}/${id}/${date}
        `);

      dispatch({
        type: PRINT_STUDENTS_ADMIT_CARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRINT_STUDENTS_ADMIT_CARD_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
