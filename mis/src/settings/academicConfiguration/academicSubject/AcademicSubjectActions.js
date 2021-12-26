import axios from "axios";
import { API_URL } from "../../../constants";
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
      `${API_URL}/api/AcademicSubject/GetAcademicSubject`
    );

    dispatch({ type: GET_ALL_ACADEMIC_SUBJECT_SUCCES, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_SUBJECT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleAcademicSubjectAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ACADEMIC_SUBJECT_REQUEST });
    const { data } = await axios.get(
      `${API_URL}/api/AcademicSubject/GetAcademicSubject/${id}`
    );

    dispatch({ type: GET_SINGLE_ACADEMIC_SUBJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ACADEMIC_SUBJECT_FAIL,
      payload: error.message ? error.message : error.Message,
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
        `${API_URL}/api/AcademicSubject/PostAcademicSubject`,
        jsonData,
        config
      );

      dispatch({ type: ACADEMIC_SUBJECT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACADEMIC_SUBJECT_CREATE_FAIL,
        payload: error.message ? error.message : error.Message,
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
        `${API_URL}/api/AcademicSubject/PutAcademicSubject`,
        jsonData,
        config
      );
      dispatch({ type: UPDATE_SINGLE_ACADEMIC_SUBJECT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ACADEMIC_SUBJECT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
