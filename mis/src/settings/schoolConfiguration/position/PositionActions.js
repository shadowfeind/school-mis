import axios from "axios";
import {
  GET_ALL_POSITION_FAIL,
  GET_ALL_POSITION_REQUEST,
  GET_ALL_POSITION_SUCCESS,
} from "./PositionConstatns";

export const getAllPositionAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_POSITION_REQUEST });

    const { data } = await axios.get("http://localhost:5000/api/mock/position");

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
