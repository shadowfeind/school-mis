import axios from "axios";
import { API_URL, tokenConfig } from "../../constants";
import {
  GET_EVENT_FOR_EXAM_MARK_FAIL,
  GET_EVENT_FOR_EXAM_MARK_REQUEST,
  GET_EVENT_FOR_EXAM_MARK_SUCCESS,
  GET_EXAM_LEDGER_HEADER_FAIL,
  GET_EXAM_LEDGER_HEADER_REQUEST,
  GET_EXAM_LEDGER_HEADER_SUCCESS,
  GET_EXAM_RESULT_LIST_FAIL,
  GET_EXAM_RESULT_LIST_REQUEST,
  GET_EXAM_RESULT_LIST_SUCCESS,
  GET_INITIAL_EXAM_RESULT_DATA_FAIL,
  GET_INITIAL_EXAM_RESULT_DATA_REQUEST,
  GET_INITIAL_EXAM_RESULT_DATA_SUCCESS,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_FAIL,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_REQUEST,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_SUCCESS,
  PRINT_EXAM_RESULT_FAIL,
  PRINT_EXAM_RESULT_REQUEST,
  PRINT_EXAM_RESULT_SUCCESS,
} from "./ExamResultConstants";

export const getInitialExamResultDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_INITIAL_EXAM_RESULT_DATA_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/ExamResult/GetAllExamResult
        `,
      tokenConfig
    );

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

      const { data } = await axios.get(
        `${API_URL}/api/ExamResult/GetAcademicYearCalendar?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}`,
        tokenConfig
      );

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

      const { data } = await axios.get(
        `${API_URL}/api/ExamResult/GetStudent?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&idShift=${shift}`,
        tokenConfig
      );

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

      const { data } = await axios.get(
        `${API_URL}/api/ExamResult/GetListExamResult?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idStudent=${studentId}`,
        tokenConfig
      );

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

export const getExamLedgerHeaderAction =
  (year, program, classId, section, shift, event, studentId) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_EXAM_LEDGER_HEADER_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/ExamResult/GetPrintLedger?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idStudent=${studentId}&searchKey=1`,
        tokenConfig
      );

      dispatch({
        type: GET_EXAM_LEDGER_HEADER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_EXAM_LEDGER_HEADER_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const printExamResultAction =
  (year, program, classId, section, shift, event, studentId) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRINT_EXAM_RESULT_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/ExamResult/GetPrintLedger?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idStudent=${studentId}&searchKey=1`,
        tokenConfig
      );

      dispatch({
        type: PRINT_EXAM_RESULT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRINT_EXAM_RESULT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
