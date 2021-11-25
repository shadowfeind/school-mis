import axios from "axios";
import {
  ASSIGN_FACULTY_SUBJECT_GET_FAIL,
  ASSIGN_FACULTY_SUBJECT_GET_REQUEST,
  ASSIGN_FACULTY_SUBJECT_GET_SUCCESS,
  GET_ALL_ASSIGN_FACULTY_SUBJECT_FAIL,
  GET_ALL_ASSIGN_FACULTY_SUBJECT_REQUEST,
  GET_ALL_ASSIGN_FACULTY_SUBJECT_SUCCESS,
  GET_LIST_ASSIGN_FACULTY_SUBJECT_FAIL,
  GET_LIST_ASSIGN_FACULTY_SUBJECT_REQUEST,
  GET_LIST_ASSIGN_FACULTY_SUBJECT_SUCCESS,
} from "./AssignFacultySubjectConstants";

export const getALLAssignFacultySubject = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ASSIGN_FACULTY_SUBJECT_REQUEST });

    const { data } = await axios.get(
      "http://192.168.1.103:84/api/AcaFacultySubjectLink"
    );

    dispatch({ type: GET_ALL_ASSIGN_FACULTY_SUBJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ASSIGN_FACULTY_SUBJECT_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getListAssignFacultySubject =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_ASSIGN_FACULTY_SUBJECT_REQUEST });

      const { data } = await axios.get(
        `http://192.168.1.103:84/api/GetListAcademicFacultySubjectLink/${year}/${program}/${classId}/getList`
      );

      dispatch({
        type: GET_LIST_ASSIGN_FACULTY_SUBJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_ASSIGN_FACULTY_SUBJECT_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAssignFacultySubjectOptionAction =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: ASSIGN_FACULTY_SUBJECT_GET_REQUEST });

      const { data } = await axios.get(
        `http://192.168.1.103:84/api/GetAcademicFacultySubjectLinkById/${year}/${program}/${classId}/create`
      );

      dispatch({ type: ASSIGN_FACULTY_SUBJECT_GET_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ASSIGN_FACULTY_SUBJECT_GET_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const AcademicFacultyCreateAction =
  (checkboxState, idYearFacultyProgramLink, level) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_PROGRAM_CREATE_REQUEST });

      const jsonData = JSON.stringify({
        idYearFacultyProgramLink,
        level,
        ddlSubjectModelLst: checkboxState,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://192.168.1.103:84/api/AcademicProgram",
        jsonData,
        config
      );

      dispatch({ type: ACADEMIC_PROGRAM_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACADEMIC_PROGRAM_CREATE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
