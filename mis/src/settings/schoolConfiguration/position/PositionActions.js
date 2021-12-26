import axios from "axios";
import { API_URL } from "../../../constants";
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

    const { data } = await axios.get(`${API_URL}/api/HRPosition/GetHRPosition
    `);

    dispatch({ type: GET_ALL_POSITION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_POSITION_FAIL,
      payload: error.message ? error.message : error.Message,
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
      `${API_URL}/api/HRPosition/PostHRPosition`,
      jsonData,
      config
    );

    dispatch({ type: POSITION_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POSITION_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSinglePositionAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_POSITION_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/HRPosition/GetPositionById/${id}`
    );

    dispatch({ type: GET_SINGLE_POSITION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_POSITION_FAIL,
      payload: error.message ? error.message : error.Message,
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
      `${API_URL}/api/HRPosition/PutHRPosition`,
      jsonData,
      config
    );

    dispatch({ type: UPDATE_SINGLE_POSITION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SINGLE_POSITION_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
