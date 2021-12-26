import axios from "axios";
import { API_URL } from "../../../constants";
import {
  GET_ALL_SCHOOL_SETTINGS_FAIL,
  GET_ALL_SCHOOL_SETTINGS_REQUEST,
  GET_ALL_SCHOOL_SETTINGS_SUCCESS,
  GET_SINGLE_SCHOOL_SETTINGS_FAIL,
  GET_SINGLE_SCHOOL_SETTINGS_REQUEST,
  GET_SINGLE_SCHOOL_SETTINGS_SUCCESS,
  SCHOOL_SETTINGS_CREATE_FAIL,
  SCHOOL_SETTINGS_CREATE_REQUEST,
  SCHOOL_SETTINGS_CREATE_SUCCESS,
  UPDATE_SINGLE_SCHOOL_SETTINGS_FAIL,
  UPDATE_SINGLE_SCHOOL_SETTINGS_REQUEST,
  UPDATE_SINGLE_SCHOOL_SETTINGS_SUCCESS,
} from "./SchoolSettingsConstants";

export const getAllSchoolSettingsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SCHOOL_SETTINGS_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/ReactHRCompany/GetHRCompany
      `
    );

    dispatch({ type: GET_ALL_SCHOOL_SETTINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_SCHOOL_SETTINGS_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const schoolSettingCreateAction = (position) => async (dispatch) => {
  try {
    dispatch({ type: SCHOOL_SETTINGS_CREATE_REQUEST });

    const jsonData = JSON.stringify({ dbModel: position });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
 
    const { data } = await axios.post(
      `${API_URL}/api/ReactHRCompany/PostHRCompany`,
      jsonData,
      config
    );

    dispatch({ type: SCHOOL_SETTINGS_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SCHOOL_SETTINGS_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleSchoolSettingAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_SCHOOL_SETTINGS_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/ReactHRCompany/GetHRCompany/${id}`
    );

    dispatch({ type: GET_SINGLE_SCHOOL_SETTINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_SCHOOL_SETTINGS_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const updateSingleScholSettingAction =
  (position) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_SCHOOL_SETTINGS_REQUEST });

      const jsonData = JSON.stringify({ dbModel: position });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/ReactHRCompany/PutHRCompany`,
        jsonData,
        config
      );

      dispatch({ type: UPDATE_SINGLE_SCHOOL_SETTINGS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_SCHOOL_SETTINGS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
