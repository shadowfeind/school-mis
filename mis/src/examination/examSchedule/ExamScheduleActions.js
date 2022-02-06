import axios from "axios";
import { API_URL, tokenConfig } from "../../constants";
import {
  GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_FAIL,
  GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_REQUEST,
  GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_SUCCESS,
  GET_EVENT_FOR_EXAM_SCHEDULE_FAIL,
  GET_EVENT_FOR_EXAM_SCHEDULE_REQUEST,
  GET_EVENT_FOR_EXAM_SCHEDULE_SUCCESS,
  GET_EXAM_SCHEDULE_LIST_FAIL,
  GET_EXAM_SCHEDULE_LIST_REQUEST,
  GET_EXAM_SCHEDULE_LIST_SUCCESS,
  GET_SINGLE_EXAM_SCHEDULE_CREATE_FAIL,
  GET_SINGLE_EXAM_SCHEDULE_CREATE_REQUEST,
  GET_SINGLE_EXAM_SCHEDULE_CREATE_SUCCESS,
  GET_SINGLE_EXAM_SCHEDULE_EDIT_FAIL,
  GET_SINGLE_EXAM_SCHEDULE_EDIT_REQUEST,
  GET_SINGLE_EXAM_SCHEDULE_EDIT_SUCCESS,
  POST_SINGLE_EXAM_SCHEDULE_CREATE_FAIL,
  POST_SINGLE_EXAM_SCHEDULE_CREATE_REQUEST,
  POST_SINGLE_EXAM_SCHEDULE_CREATE_SUCCESS,
  SINGLE_EXAM_SCHEDULE_EDIT_FAIL,
  SINGLE_EXAM_SCHEDULE_EDIT_REQUEST,
  SINGLE_EXAM_SCHEDULE_EDIT_SUCCESS,
} from "./ExamScheduleConstants";

export const getAllExamScheduleInitialDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/AcademicExamSchedule/GetAll
        `,
      tokenConfig
    );

    dispatch({
      type: GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_EXAM_SCHEDULE_INITIAL_DATA_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getEventForExamScheduleAction =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_EVENT_FOR_EXAM_SCHEDULE_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/AcademicExamSchedule/GetActiveAcademicYearCalendar?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}`,
        tokenConfig
      );

      dispatch({
        type: GET_EVENT_FOR_EXAM_SCHEDULE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_EVENT_FOR_EXAM_SCHEDULE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getExamScheduleListAction =
  (year, program, classId, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_EXAM_SCHEDULE_LIST_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/AcademicExamSchedule/GetListAcademicExamSchedule?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&idAcademicYearCalendar=${event}&searchKey=1`,
        tokenConfig
      );

      dispatch({
        type: GET_EXAM_SCHEDULE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_EXAM_SCHEDULE_LIST_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getSingleExamScheduleCreateAction =
  (year, program, classId, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_EXAM_SCHEDULE_CREATE_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/AcademicExamSchedule/SingleGetToCreateAcademicExamSchedule?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&idAcademicYearCalendar=${event}&searchKey=1`,
        tokenConfig
      );

      dispatch({
        type: GET_SINGLE_EXAM_SCHEDULE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_EXAM_SCHEDULE_CREATE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const postSingleExamScheduleCreateAction =
  (schedule, searchFilterModel) => async (dispatch) => {
    try {
      dispatch({ type: POST_SINGLE_EXAM_SCHEDULE_CREATE_REQUEST });

      const jsonData = JSON.stringify({ dbModel: schedule, searchFilterModel });

      console.log(jsonData);

      const { data } = await axios.post(
        `${API_URL}/api/AcademicExamSchedule/Post`,
        jsonData,
        tokenConfig
      );

      dispatch({
        type: POST_SINGLE_EXAM_SCHEDULE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_SINGLE_EXAM_SCHEDULE_CREATE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getSingleExamScheduleEditAction =
  (id, year, program, classId, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_EXAM_SCHEDULE_EDIT_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/AcademicExamSchedule/SingleGetToEditAcademicExamSchedule/${id}?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&idAcademicYearCalendar=${event}&searchKey=1`,
        tokenConfig
      );

      dispatch({
        type: GET_SINGLE_EXAM_SCHEDULE_EDIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_EXAM_SCHEDULE_EDIT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const singleExamScheduleEditAction =
  (schedule, searchFilterModel) => async (dispatch) => {
    try {
      dispatch({ type: SINGLE_EXAM_SCHEDULE_EDIT_REQUEST });

      const jsonData = JSON.stringify({ dbModel: schedule, searchFilterModel });

      const { data } = await axios.put(
        `${API_URL}/api/AcademicExamSchedule/Put`,
        jsonData,
        tokenConfig
      );

      dispatch({
        type: SINGLE_EXAM_SCHEDULE_EDIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SINGLE_EXAM_SCHEDULE_EDIT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
