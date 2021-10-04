import axios from "axios";
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

    const { data } = await axios.get("http://192.168.1.103:84/api/University");

    dispatch({ type: GET_ALL_SCHOOL_BOARD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_SCHOOL_BOARD_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const SchoolBoardCreateAction = (schoolBoard) => async (dispatch) => {
  try {
    dispatch({ type: SCHOOL_BOARD_CREATE_REQUEST });

    const jsonData = JSON.stringify({ dbModel: schoolBoard });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://192.168.1.103:84/api/University",
      jsonData,
      config
    );

    dispatch({ type: SCHOOL_BOARD_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SCHOOL_BOARD_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleSchoolBoardAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_SCHOOL_BOARD_REQUEST });

    const { data } = await axios.get(
      `http://192.168.1.103:84/api/University/${id}`
    );

    dispatch({ type: GET_SINGLE_SCHOOL_BOARD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_SCHOOL_BOARD_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSingleSchoolBoardAction =
  (schoolBoard) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_SCHOOL_BOARD_REQUEST });

      const jsonData = JSON.stringify({ dbModel: schoolBoard });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        "http://192.168.1.103:84/api/University",
        jsonData,
        config
      );

      dispatch({ type: UPDATE_SINGLE_SCHOOL_BOARD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_SCHOOL_BOARD_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
