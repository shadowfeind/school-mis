import {
  GET_ALL_SCHOOL_SETTINGS_FAIL,
  GET_ALL_SCHOOL_SETTINGS_REQUEST,
  GET_ALL_SCHOOL_SETTINGS_SUCCESS,
} from "./SchoolSettingsConstants";

export const getAllSchoolSettings = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SCHOOL_SETTINGS_REQUEST:
      return { loading: true };
    case GET_ALL_SCHOOL_SETTINGS_SUCCESS:
      return { loading: false, schoolSettings: action.payload };
    case GET_ALL_SCHOOL_SETTINGS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
