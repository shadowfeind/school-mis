import {
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_FAIL,
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_REQUEST,
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_RESET,
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_SUCCESS,
  GET_SUBJECT_OPTIONS_FOR_SELECT_FAIL,
  GET_SUBJECT_OPTIONS_FOR_SELECT_REQUEST,
  GET_SUBJECT_OPTIONS_FOR_SELECT_RESET,
  GET_SUBJECT_OPTIONS_FOR_SELECT_SUCCESS,
} from "./StudentMonthlyPresentSheetConstants";

export const getAllStudentMonthlyPresentSheetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_REQUEST:
      return { loading: true };
    case GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_SUCCESS:
      return {
        loading: false,
        allStudentMonthlyPresentSheetData: action.payload,
      };
    case GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_RESET:
      return {};
    default:
      return state;
  }
};

export const getSubjectOptionsForSelectReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SUBJECT_OPTIONS_FOR_SELECT_REQUEST:
      return { loading: true };
    case GET_SUBJECT_OPTIONS_FOR_SELECT_SUCCESS:
      return {
        loading: false,
        subjectOptions: action.payload,
      };
    case GET_SUBJECT_OPTIONS_FOR_SELECT_FAIL:
      return { loading: false, error: action.payload };
    case GET_SUBJECT_OPTIONS_FOR_SELECT_RESET:
      return {};
    default:
      return state;
  }
};
