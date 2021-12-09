import axios from "axios";
import { API_URL } from "../../../constants";
import {
  ACADEMIC_YEAR_CREATE_FAIL,
  ACADEMIC_YEAR_CREATE_REQUEST,
  ACADEMIC_YEAR_CREATE_SUCCESS,
  GET_ACADEMIC_YEAR_OPTION_FAIL,
  GET_ACADEMIC_YEAR_OPTION_REQUEST,
  GET_ACADEMIC_YEAR_OPTION_SUCCESS,
  GET_ALL_ACADEMIC_YEAR_FAIL,
  GET_ALL_ACADEMIC_YEAR_REQUEST,
  GET_ALL_ACADEMIC_YEAR_SUCCESS,
  GET_SINGLE_ACADEMIC_YEAR_FAIL,
  GET_SINGLE_ACADEMIC_YEAR_REQUEST,
  GET_SINGLE_ACADEMIC_YEAR_SUCCESS,
} from "./AcademicYearConstant";

export const getAllAcademicYearAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACADEMIC_YEAR_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/AcademicYear`);

    dispatch({ type: GET_ALL_ACADEMIC_YEAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_YEAR_FAIL,
      payload:
        error.essage && error.response.data.essage
          ? error.response.data.essage
          : error.essage,
    });
  }
};

export const AcademicYearCreateAction =
  (academicYear, checkboxState) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_YEAR_CREATE_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: academicYear,
        postedChekboxLst: { CheckBoxListID: checkboxState },
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/AcademicYear`,
        jsonData,
        config
      );

      dispatch({ type: ACADEMIC_YEAR_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACADEMIC_YEAR_CREATE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAcademicYearOptionAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ACADEMIC_YEAR_OPTION_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/GetToCreateAcademicYear/0/0/create`
    );

    dispatch({ type: GET_ACADEMIC_YEAR_OPTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ACADEMIC_YEAR_OPTION_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleAcademicYearAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ACADEMIC_YEAR_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/AcademicYear/${id}`);

    dispatch({ type: GET_SINGLE_ACADEMIC_YEAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ACADEMIC_YEAR_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSingleAcademicYearAction =
  (academicYear) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_ACADEMIC_YEAR_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicYear });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/AcademicYear`,
        jsonData,
        config
      );

      dispatch({ type: UPDATE_SINGLE_ACADEMIC_YEAR_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ACADEMIC_YEAR_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
