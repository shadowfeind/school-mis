import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  GET_ALL_SCHOOL_BOARD_FAIL,
  GET_ALL_SCHOOL_BOARD_REQUEST,
  GET_ALL_SCHOOL_BOARD_SUCCESS,
  GET_SINGLE_SCHOOL_BOARD_FAIL,
  GET_SINGLE_SCHOOL_BOARD_REQUEST,
  GET_SINGLE_SCHOOL_BOARD_SUCCESS,
  SCHOOL_BOARD_CREATE_FAIL,
  SCHOOL_BOARD_CREATE_REQUEST,
  SCHOOL_BOARD_CREATE_SUCCESS,
  UPDATE_SINGLE_SCHOOL_BOARD_FAIL,
  UPDATE_SINGLE_SCHOOL_BOARD_REQUEST,
  UPDATE_SINGLE_SCHOOL_BOARD_SUCCESS,
} from "./SchoolBoardConstants";

export const getAllSchoolBoardAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SCHOOL_BOARD_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/University/GetUniversity`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_SCHOOL_BOARD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_SCHOOL_BOARD_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const SchoolBoardCreateAction = (schoolBoard) => async (dispatch) => {
  try {
    dispatch({ type: SCHOOL_BOARD_CREATE_REQUEST });

    const jsonData = JSON.stringify({ dbModel: schoolBoard });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.post(
      `${API_URL}/api/University/PostUniversity`,
      jsonData,
      tokenConfig
    );

    dispatch({ type: SCHOOL_BOARD_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SCHOOL_BOARD_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleSchoolBoardAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_SCHOOL_BOARD_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/University/GetUniversityById/${id}`,
      tokenConfig
    );

    dispatch({ type: GET_SINGLE_SCHOOL_BOARD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_SCHOOL_BOARD_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const updateSingleSchoolBoardAction =
  (schoolBoard) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_SCHOOL_BOARD_REQUEST });

      const jsonData = JSON.stringify({ dbModel: schoolBoard });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axios.put(
        `${API_URL}/api/University/PutUniversity`,
        jsonData,
        tokenConfig
      );

      dispatch({ type: UPDATE_SINGLE_SCHOOL_BOARD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_SCHOOL_BOARD_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
