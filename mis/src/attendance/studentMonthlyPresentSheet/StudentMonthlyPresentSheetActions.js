import axios from "axios";
import { API_URL, tokenConfig } from "../../constants";
import {
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_FAIL,
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_REQUEST,
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_SUCCESS,
  GET_ENGLISH_DATE_FAIL,
  GET_ENGLISH_DATE_REQUEST,
  GET_ENGLISH_DATE_SUCCESS,
  GET_LIST_FOR_PRESENT_STUDENT_FAIL,
  GET_LIST_FOR_PRESENT_STUDENT_REQUEST,
  GET_LIST_FOR_PRESENT_STUDENT_SUCCESS,
  GET_LIST_FOR_UPDATE_STUDENT_PRESENT_FAIL,
  GET_LIST_FOR_UPDATE_STUDENT_PRESENT_REQUEST,
  GET_LIST_FOR_UPDATE_STUDENT_PRESENT_SUCCESS,
  GET_LIST_STUDENT_PRESENT_FAIL,
  GET_LIST_STUDENT_PRESENT_REQUEST,
  GET_LIST_STUDENT_PRESENT_SUCCESS,
  GET_SUBJECT_OPTIONS_FOR_SELECT_FAIL,
  GET_SUBJECT_OPTIONS_FOR_SELECT_REQUEST,
  GET_SUBJECT_OPTIONS_FOR_SELECT_SUCCESS,
} from "./StudentMonthlyPresentSheetConstants";

export const getAllStudentPresentSheetDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/StudentPresentSheet/GetAllStudentPresentSheet`,
      tokenConfig
    );

    dispatch({
      type: GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSubjectOptionsForSelectAction =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_SUBJECT_OPTIONS_FOR_SELECT_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/StudentPresentSheet/GetPopulateSubjectByLevel?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}`,
        tokenConfig
      );

      dispatch({
        type: GET_SUBJECT_OPTIONS_FOR_SELECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SUBJECT_OPTIONS_FOR_SELECT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getEnglishDateAction = (year, month) => async (dispatch) => {
  try {
    dispatch({ type: GET_ENGLISH_DATE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/StudentPresentSheet/GetEngDate?year=${year}&month=${month}`,
      tokenConfig
    );

    dispatch({
      type: GET_ENGLISH_DATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ENGLISH_DATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getListStudentPresentAction =
  (
    year,
    program,
    classId,
    subject,
    section,
    shift,
    npYear,
    npMonth,
    currentDate
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_STUDENT_PRESENT_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/StudentPresentSheet/GetListStudentPresentSheet?currentDate=${currentDate}&npYear=${npYear}&npMonth=${npMonth}&idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&idSubject=${subject}&section=${section}&idShift=${shift}&searchKey=1`,
        tokenConfig
      );

      dispatch({
        type: GET_LIST_STUDENT_PRESENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_STUDENT_PRESENT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getListForUpdateStudentPresentAction =
  (
    year,
    program,
    classId,
    subject,
    section,
    shift,
    npYear,
    npMonth,
    currentDate
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_FOR_UPDATE_STUDENT_PRESENT_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/StudentPresentSheet/GetSingleToCreateStudentPresentSheet?currentDate=${currentDate}&npYear=${npYear}&npMonth=${npMonth}&idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&idSubject=${subject}&section=${section}&idShift=${shift}&searchKey=1`,
        tokenConfig
      );

      dispatch({
        type: GET_LIST_FOR_UPDATE_STUDENT_PRESENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_FOR_UPDATE_STUDENT_PRESENT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getListForPresentStudentAction =
  (currentDate, program, subject) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_FOR_PRESENT_STUDENT_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/StudentPresentSheet/GetPresentOrAbsent?currentDate=${currentDate}&idStudentFacultyLevel=${program}&IdSubject=${subject}`,
        tokenConfig
      );

      dispatch({
        type: GET_LIST_FOR_PRESENT_STUDENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_FOR_PRESENT_STUDENT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
