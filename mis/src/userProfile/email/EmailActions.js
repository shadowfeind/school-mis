import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_ALL_EMAIL_FAIL,
  GET_ALL_EMAIL_REQUEST,
  GET_ALL_EMAIL_SUCCESS,
  GET_SINGLE_EMAIL_FAIL,
  GET_SINGLE_EMAIL_REQUEST,
  GET_SINGLE_EMAIL_SUCCESS,
} from "./EmailConstants";

export const getAllEmailAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EMAIL_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/PID_Email/GetAllPIDEmail`);

    dispatch({ type: GET_ALL_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMAIL_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleEmailAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_EMAIL_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/GetSinglePIDEmailForEdit`);

    dispatch({ type: GET_SINGLE_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EMAIL_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
