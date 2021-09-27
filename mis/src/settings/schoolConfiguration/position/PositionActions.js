import axios from "axios";
import {
  GET_ALL_POSITION_FAIL,
  GET_ALL_POSITION_REQUEST,
  GET_ALL_POSITION_SUCCESS,
  POSITION_CREATE_REQUEST,
  POSITION_CREATE_SUCCESS,
  POSITION_CREATE_FAIL,
  GET_SINGLE_POSITION_REQUEST,
  GET_SINGLE_POSITION_SUCCESS,
  GET_SINGLE_POSITION_FAIL,
  UPDATE_SINGLE_POSITION_FAIL,
  UPDATE_SINGLE_POSITION_SUCCESS,
  UPDATE_SINGLE_POSITION_REQUEST,
} from "./PositionConstatns";

export const getAllPositionAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_POSITION_REQUEST });

    const { data } = await axios.get("http://192.168.1.103:84/api/HRPosition");

    dispatch({ type: GET_ALL_POSITION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_POSITION_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const positionCreateAction = (position) => async (dispatch) => {
  try {
    dispatch({ type: POSITION_CREATE_REQUEST });

    const jsonData = JSON.stringify({ dbModel: position });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://192.168.1.103:84/api/HRPosition",
      jsonData,
      config
    );

    dispatch({ type: POSITION_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POSITION_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSinglePositionAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_POSITION_REQUEST });

    const { data } = await axios.get(
      `http://192.168.1.103:84/api/HRPosition/${id}`
    );

    dispatch({ type: GET_SINGLE_POSITION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_POSITION_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSinglePositionAction = (position) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SINGLE_POSITION_REQUEST });

    const jsonData = JSON.stringify({ dbModel: position });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "http://192.168.1.103:85/api/MobileHRCompany",
      jsonData,
      config
    );

    dispatch({ type: UPDATE_SINGLE_POSITION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SINGLE_POSITION_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
