import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_ALL_TRAINING_FAIL,
  GET_ALL_TRAINING_REQUEST,
  GET_ALL_TRAINING_SUCCESS,
} from "./TrainingConstants";

export const getAllTrainingAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TRAINING_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_Training/GetAllPIDTraining`
    );

    dispatch({ type: GET_ALL_TRAINING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_TRAINING_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
