import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
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
  DELETE_POSITION_REQUEST,
  DELETE_POSITION_SUCCESS,
  DELETE_POSITION_FAIL,
} from "./PositionConstatns";

export const getAllPositionAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_POSITION_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/HRPosition/GetHRPosition
    `,
      tokenConfig
    );

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

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.post(
      `${API_URL}/api/HRPosition/PostHRPosition`,
      jsonData,
      tokenConfig
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
      `${API_URL}/api/HRPosition/GetPositionById/${id}`,
      tokenConfig
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

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.put(
      `${API_URL}/api/HRPosition/PutHRPosition`,
      jsonData,
      tokenConfig
    );

    dispatch({ type: UPDATE_SINGLE_POSITION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SINGLE_POSITION_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const deletePositionAction = (position) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POSITION_REQUEST });

    const jsonData = JSON.stringify({ dbModel: position });

    console.log(jsonData);
    debugger;

    await axios.delete(
      `${API_URL}/api/HRPosition/DeletePosition`,
      { dbModel: position },
      tokenConfig
    );
    debugger;

    dispatch({ type: DELETE_POSITION_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_POSITION_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
