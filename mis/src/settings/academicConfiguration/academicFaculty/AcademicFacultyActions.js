import axios from "axios";
import {
  ACADEMIC_FACULTY_CREATE_FAIL,
  ACADEMIC_FACULTY_CREATE_REQUEST,
  ACADEMIC_FACULTY_CREATE_SUCCESS,
  GET_ACADEMIC_FACULTY_OPTION_FAIL,
  GET_ACADEMIC_FACULTY_OPTION_REQUEST,
  GET_ACADEMIC_FACULTY_OPTION_SUCCESS,
  GET_ALL_ACADEMIC_FACULTY_FAIL,
  GET_ALL_ACADEMIC_FACULTY_REQUEST,
  GET_ALL_ACADEMIC_FACULTY_SUCCESS,
  GET_SINGLE_ACADEMIC_FACULTY_FAIL,
  GET_SINGLE_ACADEMIC_FACULTY_REQUEST,
  GET_SINGLE_ACADEMIC_FACULTY_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_FACULTY_FAIL,
  UPDATE_SINGLE_ACADEMIC_FACULTY_REQUEST,
  UPDATE_SINGLE_ACADEMIC_FACULTY_SUCCESS,
} from "./AcademicFacultyConstants";

export const getAllAcademicFacultyAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACADEMIC_FACULTY_REQUEST });

    const { data } = await axios.get(
      "http://192.168.1.103:84/api/AcademicFaculty"
    );

    dispatch({ type: GET_ALL_ACADEMIC_FACULTY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_FACULTY_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const AcademicFacultyCreateAction =
  (academicFaculty, checkboxState) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_FACULTY_CREATE_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: academicFaculty,
        postedChekboxLst: { CheckBoxListID: checkboxState },
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://192.168.1.103:84/api/AcademicFaculty",
        jsonData,
        config
      );

      dispatch({ type: ACADEMIC_FACULTY_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACADEMIC_FACULTY_CREATE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAcademicFacultyOptionAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ACADEMIC_FACULTY_OPTION_REQUEST });

    const { data } = await axios.get(
      `http://192.168.1.103:84/api/GetToCreateAcademicFaculty/0/0/create`
    );

    dispatch({ type: GET_ACADEMIC_FACULTY_OPTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ACADEMIC_FACULTY_OPTION_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleAcademicFacultyAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ACADEMIC_FACULTY_REQUEST });

    const { data } = await axios.get(
      `http://192.168.1.103:84/api/AcademicFaculty/${id}`
    );

    dispatch({ type: GET_SINGLE_ACADEMIC_FACULTY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ACADEMIC_FACULTY_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSingleAcademicFacultyAction =
  (academicFaculty) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_ACADEMIC_FACULTY_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicFaculty });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        "http://192.168.1.103:84/api/AcademicFaculty",
        jsonData,
        config
      );

      dispatch({ type: UPDATE_SINGLE_ACADEMIC_FACULTY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ACADEMIC_FACULTY_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
