import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_BULK_LEVEL_TEST_DATA_FAIL,
  GET_BULK_LEVEL_TEST_DATA_REQUEST,
  GET_BULK_LEVEL_TEST_DATA_SUCCESS,
  GET_INITIAL_LEVEL_TEST_DATA_FAIL,
  GET_INITIAL_LEVEL_TEST_DATA_REQUEST,
  GET_INITIAL_LEVEL_TEST_DATA_SUCCESS,
  POST_BULK_LEVEL_TEST_DATA_FAIL,
  POST_BULK_LEVEL_TEST_DATA_REQUEST,
  POST_BULK_LEVEL_TEST_DATA_SUCCESS,
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

export const getBulkLevelTestDataAction =
  (year, program, classId, section, shift, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_BULK_LEVEL_TEST_DATA_REQUEST });

      const { data } =
        await axios.get(`${API_URL}/api/GetBulkLevelTest/${year}/${program}/${classId}/${section}/${shift}/${event}/GetBulkLevelTest?searchKey=1
        `);

      dispatch({
        type: GET_BULK_LEVEL_TEST_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BULK_LEVEL_TEST_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const postBulkLevelTestAction =
  (students, search) => async (dispatch) => {
    try {
      dispatch({ type: POST_BULK_LEVEL_TEST_DATA_REQUEST });

      const jsonData = JSON.stringify({
        dbModelLst: students,
        searchFilterModel: search,
      });

      console.log(jsonData);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${API_URL}/api/LevelTest/PostLevelTest`,
        jsonData,
        config
      );

      dispatch({ type: POST_BULK_LEVEL_TEST_DATA_SUCCESS });
    } catch (error) {
      dispatch({
        type: POST_BULK_LEVEL_TEST_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
