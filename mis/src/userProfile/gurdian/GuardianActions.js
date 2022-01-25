import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_ALL_GUARDIAN_FAIL,
  GET_ALL_GUARDIAN_REQUEST,
  GET_ALL_GUARDIAN_SUCCESS,
  GET_SINGLE_GUARDIAN_FAIL,
  GET_SINGLE_GUARDIAN_REQUEST,
  GET_SINGLE_GUARDIAN_SUCCESS,
} from "./GuardianConstants";

export const getAllGuardianAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_GUARDIAN_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_Guardian/GetAllPIDGuardian`
    );

    dispatch({ type: GET_ALL_GUARDIAN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_GUARDIAN_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleGuardianAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_GUARDIAN_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/GetSinglePIDGUardianForEdit`
    );

    dispatch({ type: GET_SINGLE_GUARDIAN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_GUARDIAN_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
