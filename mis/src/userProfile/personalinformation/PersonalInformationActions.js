import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_ALL_PERSONALINFORMATION_FAIL,
  GET_ALL_PERSONALINFORMATION_REQUEST,
  GET_ALL_PERSONALINFORMATION_SUCCESS,
  GET_SINGLE_PERSONALINFORMATION_FAIL,
  GET_SINGLE_PERSONALINFORMATION_REQUEST,
  GET_SINGLE_PERSONALINFORMATION_SUCCESS,
} from "./PersonalInformationConstants";

export const getAllPersonalInformationAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PERSONALINFORMATION_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_PersonalInformation/GetAllPIDPersonalInformation?searchKey=0`
    );

    dispatch({ type: GET_ALL_PERSONALINFORMATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_PERSONALINFORMATION_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSinglePersonalInformationAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_PERSONALINFORMATION_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/GetSingleEdit/0`);

    dispatch({ type: GET_SINGLE_PERSONALINFORMATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PERSONALINFORMATION_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
