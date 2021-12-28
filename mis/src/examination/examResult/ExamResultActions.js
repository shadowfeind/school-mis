import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_EVENT_FOR_EXAM_MARK_FAIL,
  GET_EVENT_FOR_EXAM_MARK_REQUEST,
  GET_EVENT_FOR_EXAM_MARK_SUCCESS,
  GET_EXAM_RESULT_LIST_FAIL,
  GET_EXAM_RESULT_LIST_REQUEST,
  GET_EXAM_RESULT_LIST_SUCCESS,
  GET_INITIAL_EXAM_RESULT_DATA_FAIL,
  GET_INITIAL_EXAM_RESULT_DATA_REQUEST,
  GET_INITIAL_EXAM_RESULT_DATA_SUCCESS,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_FAIL,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_REQUEST,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_SUCCESS,
} from "./ExamResultConstants";

export const getInitialExamResultDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_INITIAL_EXAM_RESULT_DATA_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/ExamResult/GetAllExamResult
        `);

    dispatch({
      type: GET_INITIAL_EXAM_RESULT_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_INITIAL_EXAM_RESULT_DATA_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getEventForExamMarkAction =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_EVENT_FOR_EXAM_MARK_REQUEST });

      const { data } =
        await axios.get(`${API_URL}/api/GetActiveAcademicYearCalendar/${year}/${program}/${classId}
          `);

      dispatch({
        type: GET_EVENT_FOR_EXAM_MARK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_EVENT_FOR_EXAM_MARK_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getStudentOptionsForExamMarkAction =
  (year, program, classId, shift) => async (dispatch) => {
    try {
      dispatch({ type: GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_REQUEST });

      const { data } =
        await axios.get(`${API_URL}/api/GetStudent/${year}/${program}/${classId}/${shift}
          `);

      dispatch({
        type: GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getExamResultListAction =
  (year, program, classId, section, shift, event, studentId) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_EXAM_RESULT_LIST_REQUEST });

      const { data } =
        await axios.get(`${API_URL}/api/GetListExamResult/${year}/${program}/${classId}/${section}/${shift}/${event}/${studentId}
          `);

      dispatch({
        type: GET_EXAM_RESULT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_EXAM_RESULT_LIST_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
