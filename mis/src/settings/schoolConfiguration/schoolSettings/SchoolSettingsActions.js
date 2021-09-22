import axios from "axios";
import {
  GET_ALL_SCHOOL_SETTINGS_FAIL,
  GET_ALL_SCHOOL_SETTINGS_REQUEST,
  GET_ALL_SCHOOL_SETTINGS_SUCCESS,
} from "./SchoolSettingsConstants";

export const getAllSchoolSettingsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SCHOOL_SETTINGS_REQUEST });

    const { data } = await axios.get(
      "http://localhost:5000/api/mock/schoolSettings"
    );

    dispatch({ type: GET_ALL_SCHOOL_SETTINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_SCHOOL_SETTINGS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
