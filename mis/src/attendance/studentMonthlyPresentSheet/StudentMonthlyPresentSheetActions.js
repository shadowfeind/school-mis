import axios from "axios";
import { API_URL, tokenConfig } from "../../constants";
import {
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_FAIL,
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_REQUEST,
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_SUCCESS,
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
