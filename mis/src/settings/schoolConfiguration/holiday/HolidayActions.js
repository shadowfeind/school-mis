import axios from "axios";
import {
  GET_ALL_HOLIDAY_FAIL,
  GET_ALL_HOLIDAY_REQUEST,
  GET_ALL_HOLIDAY_SUCCESS,
} from "./HolidayConstants";

export const getAllHolidayAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_HOLIDAY_REQUEST });

    const { data } = await axios.get("http://localhost:5000/api/mock/holiday");

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
