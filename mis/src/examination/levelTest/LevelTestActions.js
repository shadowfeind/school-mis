import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_INITIAL_LEVEL_TEST_DATA_FAIL,
  GET_INITIAL_LEVEL_TEST_DATA_REQUEST,
  GET_INITIAL_LEVEL_TEST_DATA_SUCCESS,
} from "./LevelTestConstants";

export const getInitialLevelTestDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_INITIAL_LEVEL_TEST_DATA_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/LevelTest/GetAllLevelTest
        `);

    dispatch({
      type: GET_INITIAL_LEVEL_TEST_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_INITIAL_LEVEL_TEST_DATA_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
