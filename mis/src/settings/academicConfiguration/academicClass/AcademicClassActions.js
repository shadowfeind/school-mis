import axios from "axios";
import { API_URL } from "../../../constants";
import {
  ACADEMIC_CLASS_CREATE_FAIL,
  ACADEMIC_CLASS_CREATE_REQUEST,
  ACADEMIC_CLASS_CREATE_SUCCESS,
  GET_ALL_ACADEMIC_CLASS_FAIL,
  GET_ALL_ACADEMIC_CLASS_REQUEST,
  GET_ALL_ACADEMIC_CLASS_SUCCESS,
  GET_SINGLE_ACADEMIC_CLASS_FAIL,
  GET_SINGLE_ACADEMIC_CLASS_REQUEST,
  GET_SINGLE_ACADEMIC_CLASS_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_CLASS_FAIL,
  UPDATE_SINGLE_ACADEMIC_CLASS_REQUEST,
  UPDATE_SINGLE_ACADEMIC_CLASS_SUCCESS,
} from "./AcademicClassConstants";

export const getAllAcademicClassAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACADEMIC_CLASS_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/AcademicClass/GetAcademicClass`
    );

    dispatch({ type: GET_ALL_ACADEMIC_CLASS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_CLASS_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const academicClassCreateAction =
  (academicClass) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_CLASS_CREATE_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicClass });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/AcademicClass/PostHRPosition`,
        jsonData,
        config
      );

      dispatch({ type: ACADEMIC_CLASS_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACADEMIC_CLASS_CREATE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getSingleAcademicClassAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ACADEMIC_CLASS_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/AcademicClass/GetAcademicClassById/${id}`
    );

    dispatch({ type: GET_SINGLE_ACADEMIC_CLASS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ACADEMIC_CLASS_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const updateSingleAcademicClassAction =
  (academicClass) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_ACADEMIC_CLASS_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicClass });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/AcademicClass/PutHRPosition`,
        jsonData,
        config
      );

      dispatch({ type: UPDATE_SINGLE_ACADEMIC_CLASS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ACADEMIC_CLASS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
