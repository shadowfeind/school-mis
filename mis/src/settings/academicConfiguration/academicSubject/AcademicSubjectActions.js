import axios from "axios";
import {
  GET_All_ACADEMIC_SUBJECT_REQUEST,
  GET_ALL_ACADEMIC_SUBJECT_SUCCES,
  GET_ALL_ACADEMIC_SUBJECT_FAIL,
  GET_SINGLE_ACADEMIC_SUBJECT_REQUEST,
  GET_SINGLE_ACADEMIC_SUBJECT_SUCCESS,
  GET_SINGLE_ACADEMIC_SUBJECT_FAIL,
  ACADEMIC_SUBJECT_CREATE_REQUEST,
  ACADEMIC_SUBJECT_CREATE_SUCCESS,
  ACADEMIC_SUBJECT_CREATE_FAIL,
  UPDATE_SINGLE_ACADEMIC_SUBJECT_REQUEST,
  UPDATE_SINGLE_ACADEMIC_SUBJECT_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_SUBJECT_FAIL,
  UPDATE_SINGLE_ACADEMIC_SUBJECT_RESET,
} from "./AcademicSubjectConstants";

export const getAllAcademicSubjectAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_All_ACADEMIC_SUBJECT_REQUEST });
    const { data } = await axios.get(
      "http://192.168.1.103:84/api/AcademicSubject"
    );

    dispatch({ type: GET_ALL_ACADEMIC_SUBJECT_SUCCES, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_SUBJECT_FAIL,
      payload: error.message,
    });
  }
};

export const getSingleAcademicSubjectAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ACADEMIC_SUBJECT_REQUEST });
    const { data } = await axios.get(
      `http://192.168.1.103:84/api/AcademicSubject/${id}`
    );

    dispatch({ type: GET_SINGLE_ACADEMIC_SUBJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ACADEMIC_SUBJECT_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const academicSubjectCreateAction =
  (academicSubject) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_SUBJECT_CREATE_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicSubject });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://192.168.1.103:84/api/AcademicSubject",
        jsonData,
        config
      );

      dispatch({ type: ACADEMIC_SUBJECT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACADEMIC_SUBJECT_CREATE_FAIL,
        payload: error.message,
        // error.message && error.response.data.message
        // ? error.response.data.message
        // : error.message,
      });
    }
  };

export const updateSingleAcademicSubjectAction =
  (academicSubject) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_ACADEMIC_SUBJECT_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicSubject });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        "http://192.168.1.103:84/api/AcademicSubject",
        jsonData,
        config
      );
      dispatch({ type: UPDATE_SINGLE_ACADEMIC_SUBJECT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ACADEMIC_SUBJECT_FAIL,
        payload: error.message,
      });
    }
  };
