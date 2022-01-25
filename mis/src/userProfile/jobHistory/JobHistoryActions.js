import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_ALL_JOBHISTORY_FAIL,
  GET_ALL_JOBHISTORY_REQUEST,
  GET_ALL_JOBHISTORY_SUCCESS,
} from "./JobHistoryConstants";

export const getAllJobHistoryAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_JOBHISTORY_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_JobHistory/GetAllPIDJobHistiory`
    );

    dispatch({ type: GET_ALL_JOBHISTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_JOBHISTORY_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
