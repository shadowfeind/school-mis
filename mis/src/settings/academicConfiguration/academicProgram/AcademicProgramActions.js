import axios from "axios";
import {
  ACADEMIC_PROGRAM_CREATE_FAIL,
  ACADEMIC_PROGRAM_CREATE_REQUEST,
  ACADEMIC_PROGRAM_CREATE_SUCCESS,
  GET_ACADEMIC_PROGRAM_OPTION_FAIL,
  GET_ACADEMIC_PROGRAM_OPTION_REQUEST,
  GET_ACADEMIC_PROGRAM_OPTION_SUCCESS,
  GET_ALL_ACADEMIC_PROGRAM_FAIL,
  GET_ALL_ACADEMIC_PROGRAM_REQUEST,
  GET_ALL_ACADEMIC_PROGRAM_SUCCESS,
  GET_SINGLE_ACADEMIC_PROGRAM_FAIL,
  GET_SINGLE_ACADEMIC_PROGRAM_REQUEST,
  GET_SINGLE_ACADEMIC_PROGRAM_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_PROGRAM_FAIL,
  UPDATE_SINGLE_ACADEMIC_PROGRAM_REQUEST,
  UPDATE_SINGLE_ACADEMIC_PROGRAM_SUCCESS,
} from "./AcademicProgramConstants";

export const getAllAcademicProgramAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACADEMIC_PROGRAM_REQUEST });

    const { data } = await axios.get(
      "http://192.168.1.103:84/api/AcademicProgram"
    );

    dispatch({ type: GET_ALL_ACADEMIC_PROGRAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_PROGRAM_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const AcademicProgramCreateAction =
  (academicProgram, checkboxState) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_PROGRAM_CREATE_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: academicProgram,
        postedChekboxLst: { CheckBoxListID: checkboxState },
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

export const getAcademicProgramOptionAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ACADEMIC_PROGRAM_OPTION_REQUEST });

    const { data } = await axios.get(
      `http://192.168.1.103:84/api/GetToCreateAcademicProgram/0/0/create`
    );

    dispatch({ type: GET_ACADEMIC_PROGRAM_OPTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ACADEMIC_PROGRAM_OPTION_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleAcademicProgramAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ACADEMIC_PROGRAM_REQUEST });

    const { data } = await axios.get(
      `http://192.168.1.103:84/api/AcademicProgram/${id}`
    );

    dispatch({ type: GET_SINGLE_ACADEMIC_PROGRAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ACADEMIC_PROGRAM_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSingleAcademicProgramAction =
  (academicProgram) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_ACADEMIC_PROGRAM_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicProgram });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        "http://192.168.1.103:84/api/AcademicProgram",
        jsonData,
        config
      );

      dispatch({ type: UPDATE_SINGLE_ACADEMIC_PROGRAM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ACADEMIC_PROGRAM_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
