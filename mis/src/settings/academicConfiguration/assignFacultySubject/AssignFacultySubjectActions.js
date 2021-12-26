import axios from "axios";
import { API_URL } from "../../../constants";
import {
  ASSIGN_FACULTY_SUBJECT_EDIT_FAIL,
  ASSIGN_FACULTY_SUBJECT_EDIT_POST_FAIL,
  ASSIGN_FACULTY_SUBJECT_EDIT_POST_REQUEST,
  ASSIGN_FACULTY_SUBJECT_EDIT_POST_SUCCESS,
  ASSIGN_FACULTY_SUBJECT_EDIT_REQUEST,
  ASSIGN_FACULTY_SUBJECT_EDIT_SUCCESS,
  ASSIGN_FACULTY_SUBJECT_GET_FAIL,
  ASSIGN_FACULTY_SUBJECT_GET_REQUEST,
  ASSIGN_FACULTY_SUBJECT_GET_SUCCESS,
  ASSIGN_FACULTY_SUBJECT_POST_FAIL,
  ASSIGN_FACULTY_SUBJECT_POST_REQUEST,
  ASSIGN_FACULTY_SUBJECT_POST_SUCCESS,
  GET_ALL_ASSIGN_FACULTY_SUBJECT_FAIL,
  GET_ALL_ASSIGN_FACULTY_SUBJECT_REQUEST,
  GET_ALL_ASSIGN_FACULTY_SUBJECT_SUCCESS,
  GET_LIST_ASSIGN_FACULTY_SUBJECT_FAIL,
  GET_LIST_ASSIGN_FACULTY_SUBJECT_REQUEST,
  GET_LIST_ASSIGN_FACULTY_SUBJECT_SUCCESS,
  GET_SINGLE_ASSIGN_FACULTY_SUBJECT_FAIL,
  GET_SINGLE_ASSIGN_FACULTY_SUBJECT_REQUEST,
  GET_SINGLE_ASSIGN_FACULTY_SUBJECT_SUCCESS,
} from "./AssignFacultySubjectConstants";

export const getALLAssignFacultySubject = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ASSIGN_FACULTY_SUBJECT_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/AcaFacultySubjectLink/GetAcademicFacultySubjectLink`
    );

    dispatch({ type: GET_ALL_ASSIGN_FACULTY_SUBJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ASSIGN_FACULTY_SUBJECT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getListAssignFacultySubject =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_ASSIGN_FACULTY_SUBJECT_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/GetListAcademicFacultySubjectLink/${year}/${program}/${classId}/getList`
      );

      dispatch({
        type: GET_LIST_ASSIGN_FACULTY_SUBJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_ASSIGN_FACULTY_SUBJECT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getSingleAssignFacultySubjectAction =
  (id, year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_ASSIGN_FACULTY_SUBJECT_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/GetAcademicFacultySubjectLinkById/${id}/${year}/${program}/${classId}/edit`
      );

      dispatch({
        type: GET_SINGLE_ASSIGN_FACULTY_SUBJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_ASSIGN_FACULTY_SUBJECT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getAssignFacultySubjectOptionAction =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: ASSIGN_FACULTY_SUBJECT_GET_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/GetAcademicFacultySubjectLinkById/${year}/${program}/${classId}/create`
      );

      dispatch({ type: ASSIGN_FACULTY_SUBJECT_GET_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ASSIGN_FACULTY_SUBJECT_GET_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const AcademicFacultyCreateAction =
  (idYearFacultyProgramLink, level, checkboxState) => async (dispatch) => {
    try {
      dispatch({ type: ASSIGN_FACULTY_SUBJECT_POST_REQUEST });

      const jsonData = JSON.stringify({
        idYearFacultyProgramLink,
        level,
        ddlSubjectModelLst: checkboxState,
        actionType: 0,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/AcaFacultySubjectLink/PostAcademicFacultySubjectLinkA`,
        jsonData,
        config
      );

      dispatch({ type: ASSIGN_FACULTY_SUBJECT_POST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ASSIGN_FACULTY_SUBJECT_POST_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getAssignFacultySubjectEditAction =
  (id, year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: ASSIGN_FACULTY_SUBJECT_EDIT_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/GetSingleEditAcademicFacultySubjectLinkByParams/${id}/${year}/${program}/${classId}/singleEdit`
      );

      dispatch({ type: ASSIGN_FACULTY_SUBJECT_EDIT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ASSIGN_FACULTY_SUBJECT_EDIT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const academicFacultySubjectPostEditAction =
  (dbModel, values, idYearFacultyProgramLink, level) => async (dispatch) => {
    try {
      dispatch({ type: ASSIGN_FACULTY_SUBJECT_EDIT_POST_REQUEST });

      const jsonData = JSON.stringify({
        idYearFacultyProgramLink,
        level,
        model: values,
        dbModel,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/AcaFacultySubjectLink/Put`,
        jsonData,
        config
      );

      dispatch({
        type: ASSIGN_FACULTY_SUBJECT_EDIT_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ASSIGN_FACULTY_SUBJECT_EDIT_POST_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
