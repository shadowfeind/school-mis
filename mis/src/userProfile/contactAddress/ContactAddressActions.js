import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_ALL_CONTACTADDRESS_FAIL,
  GET_ALL_CONTACTADDRESS_REQUEST,
  GET_ALL_CONTACTADDRESS_SUCCESS,
} from "./ContactAddressConstants";

export const getAllContactAddressAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CONTACTADDRESS_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_Address/GetAllPIDAddress`
    );

    dispatch({ type: GET_ALL_CONTACTADDRESS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_CONTACTADDRESS_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
