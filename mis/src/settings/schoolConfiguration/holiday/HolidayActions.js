import axios from "axios";
import {
  GET_ALL_HOLIDAY_FAIL,
  GET_ALL_HOLIDAY_REQUEST,
  GET_ALL_HOLIDAY_SUCCESS,
  GET_SINGLE_HOLIDAY_FAIL,
  GET_SINGLE_HOLIDAY_REQUEST,
  GET_SINGLE_HOLIDAY_SUCCESS,
  HOLIDAY_CREATE_FAIL,
  HOLIDAY_CREATE_REQUEST,
  HOLIDAY_CREATE_SUCCESS,
  UPDATE_SINGLE_HOLIDAY_FAIL,
  UPDATE_SINGLE_HOLIDAY_REQUEST,
  UPDATE_SINGLE_HOLIDAY_SUCCESS,
} from "./HolidayConstants";

export const getAllHolidayAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_HOLIDAY_REQUEST });

    const { data } = await axios.get(
      "http://192.168.1.103:84/api/Att_HRHoliday"
    );

    dispatch({ type: GET_ALL_HOLIDAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_HOLIDAY_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const holidayCreateAction = (holiday) => async (dispatch) => {
  try {
    dispatch({ type: HOLIDAY_CREATE_REQUEST });

    const jsonData = JSON.stringify({ hrHolidayModel: holiday });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://192.168.1.103:84/api/Att_HRHoliday",
      jsonData,
      config
    );

    dispatch({ type: HOLIDAY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HOLIDAY_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleHolidayAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_HOLIDAY_REQUEST });

    const { data } = await axios.get(
      `http://192.168.1.103:84/api/Att_HRHoliday/${id}`
    );

    dispatch({ type: GET_SINGLE_HOLIDAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_HOLIDAY_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSingleHoliadyAction = (holiday) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SINGLE_HOLIDAY_REQUEST });

    const jsonData = JSON.stringify({ hrHolidayModel: holiday });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "http://192.168.1.103:84/api/Att_HRHoliday",
      jsonData,
      config
    );

    dispatch({ type: UPDATE_SINGLE_HOLIDAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SINGLE_HOLIDAY_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
