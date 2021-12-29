import axios from "axios";
import { API_URL } from "../../constants";
import {
  COUNTER_CONFIG_CREATE_FAIL,
  COUNTER_CONFIG_CREATE_REQUEST,
  COUNTER_CONFIG_CREATE_SUCCESS,
  COUNTER_CONFIG_EDIT_FAIL,
  COUNTER_CONFIG_EDIT_REQUEST,
  COUNTER_CONFIG_EDIT_SUCCESS,
  GET_COUNTER_CONFIG_INITIAL_DATA_FAIL,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_FAIL,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_REQUEST,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_SUCCESS,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_FAIL,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_REQUEST,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_SUCCESS,
  GET_COUNTER_CONFIG_INITIAL_DATA_REQUEST,
  GET_COUNTER_CONFIG_INITIAL_DATA_SUCCESS,
  GET_COUNTER_CONFIG_LIST_FAIL,
  GET_COUNTER_CONFIG_LIST_REQUEST,
  GET_COUNTER_CONFIG_LIST_SUCCESS,
} from "./CounterConfigurationConstants";

export const getCounterConfigInitialDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COUNTER_CONFIG_INITIAL_DATA_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/AdmCounter/GetAllCounterConfiguration`
    );

    dispatch({ type: GET_COUNTER_CONFIG_INITIAL_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_COUNTER_CONFIG_INITIAL_DATA_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getCounterConfigInitialDataForCreateAction =
  (year, program) => async (dispatch) => {
    try {
      dispatch({ type: GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/SingleGetToCreateCounterConfiguration/${year}/${program}/singleGetToCreate`
      );

      dispatch({
        type: GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const counterConfigCreateAction =
  (counterConfig) => async (dispatch) => {
    try {
      dispatch({ type: COUNTER_CONFIG_CREATE_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: counterConfig,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/AdmCounter/Post`,
        jsonData,
        config
      );

      dispatch({
        type: COUNTER_CONFIG_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COUNTER_CONFIG_CREATE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getCounterConfigListAction =
  (year, program) => async (dispatch) => {
    try {
      dispatch({ type: GET_COUNTER_CONFIG_LIST_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/GetListCounterConfiguration/${year}/${program}/GetList`
      );

      dispatch({
        type: GET_COUNTER_CONFIG_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_COUNTER_CONFIG_LIST_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getCounterConfigInitialDataForEditAction =
  (id, year, program) => async (dispatch) => {
    try {
      dispatch({ type: GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/SingleGetToEditCounterConfiguration/${id}/${year}/${program}/singleGetToEdit`
      );

      dispatch({
        type: GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const counterConfigEditAction = (counterConfig) => async (dispatch) => {
  try {
    dispatch({ type: COUNTER_CONFIG_EDIT_REQUEST });

    const jsonData = JSON.stringify({
      dbModel: counterConfig,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${API_URL}/api/AdmCounter/Put`,
      jsonData,
      config
    );

    dispatch({
      type: COUNTER_CONFIG_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUNTER_CONFIG_EDIT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
