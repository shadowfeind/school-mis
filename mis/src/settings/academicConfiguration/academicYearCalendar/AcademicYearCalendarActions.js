import axios from "axios";
import { API_URL } from "../../../constants";
import {
  ACADEMIC_YEAR_CALENDAR_CREATE_FAIL,
  ACADEMIC_YEAR_CALENDAR_CREATE_POST_FAIL,
  ACADEMIC_YEAR_CALENDAR_CREATE_POST_REQUEST,
  ACADEMIC_YEAR_CALENDAR_CREATE_POST_SUCCESS,
  ACADEMIC_YEAR_CALENDAR_CREATE_REQUEST,
  ACADEMIC_YEAR_CALENDAR_CREATE_SUCCESS,
  ACADEMIC_YEAR_CALENDAR_SEARCH_FAIL,
  ACADEMIC_YEAR_CALENDAR_SEARCH_REQUEST,
  ACADEMIC_YEAR_CALENDAR_SEARCH_SUCCESS,
  GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_FAIL,
  GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_REQUEST,
  GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_SUCCESS,
  GET_ALL_ACADEMIC_YEAR_CALENDAR_FAIL,
  GET_ALL_ACADEMIC_YEAR_CALENDAR_REQUEST,
  GET_ALL_ACADEMIC_YEAR_CALENDAR_SUCCESS,
  GET_SINGLE_ACADEMIC_YEAR_CALENDAR_FAIL,
  GET_SINGLE_ACADEMIC_YEAR_CALENDAR_REQUEST,
  GET_SINGLE_ACADEMIC_YEAR_CALENDAR_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_FAIL,
  UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_REQUEST,
  UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_SUCCESS,
} from "./AcademicYearCalendarConstant";

export const getAllAcademicYearCalendarAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACADEMIC_YEAR_CALENDAR_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/AcademicYearCalendar`);

    dispatch({ type: GET_ALL_ACADEMIC_YEAR_CALENDAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_YEAR_CALENDAR_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAcademicYearCalendarProgramAction =
  (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/GetUniversityProgramFaculty/${id}/get`
      );

      dispatch({
        type: GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createAcademicYearCalendarAction =
  (acaYear, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_YEAR_CALENDAR_CREATE_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/GetToCreateAcademicYearCalendar/2/0/create?idAcademicYear=${acaYear}&idFacultyProgramLink=${program}&idClass=${classId}`
      );

      dispatch({
        type: ACADEMIC_YEAR_CALENDAR_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACADEMIC_YEAR_CALENDAR_CREATE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createAcademicYearCalendarPostAction =
  (calendar) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_YEAR_CALENDAR_CREATE_POST_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: calendar,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(`${API_URL}/api/AcademicYearCalendar`, jsonData, config);

      dispatch({
        type: ACADEMIC_YEAR_CALENDAR_CREATE_POST_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ACADEMIC_YEAR_CALENDAR_CREATE_POST_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const academicYearCalendarSearchAction =
  (acaYear, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_YEAR_CALENDAR_SEARCH_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/GetToSearchAcdemicYearCalendar/${acaYear}/${program}/${classId}/Search
        `
      );

      dispatch({
        type: ACADEMIC_YEAR_CALENDAR_SEARCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACADEMIC_YEAR_CALENDAR_SEARCH_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getSingleAcademicYearCalendarAction =
  (id, acaYear, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_ACADEMIC_YEAR_CALENDAR_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/GetToEditAcdemicYearCalendar/${id}/${acaYear}/${program}/${classId}/GetEdit`
      );

      dispatch({
        type: GET_SINGLE_ACADEMIC_YEAR_CALENDAR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_ACADEMIC_YEAR_CALENDAR_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateSingleAcademicYearCalendarAction =
  (calendar) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: calendar,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.put(`${API_URL}/api/AcademicYearCalendar`, jsonData, config);

      dispatch({
        type: UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
