import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_ALL_CONTACTNUMBER_FAIL,
  GET_ALL_CONTACTNUMBER_REQUEST,
  GET_ALL_CONTACTNUMBER_SUCCESS,
  GET_SINGLE_CONTACTNUMBER_FAIL,
  GET_SINGLE_CONTACTNUMBER_REQUEST,
  GET_SINGLE_CONTACTNUMBER_SUCCESS,
} from "./ContactNumberConstants";

export const getAllContactNumberAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CONTACTNUMBER_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_ContactNumber/GetAllPIDContactNumber`
    );

    dispatch({ type: GET_ALL_CONTACTNUMBER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_CONTACTNUMBER_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleContactNumberAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_CONTACTNUMBER_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/GetSingleEditContactNo`);

    dispatch({ type: GET_SINGLE_CONTACTNUMBER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_CONTACTNUMBER_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
