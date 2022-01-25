import {
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_FAIL,
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_REQUEST,
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_RESET,
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_SUCCESS,
  GET_ENGLISH_DATE_FAIL,
  GET_ENGLISH_DATE_REQUEST,
  GET_ENGLISH_DATE_RESET,
  GET_ENGLISH_DATE_SUCCESS,
  GET_LIST_FOR_UPDATE_STUDENT_PRESENT_FAIL,
  GET_LIST_FOR_UPDATE_STUDENT_PRESENT_REQUEST,
  GET_LIST_FOR_UPDATE_STUDENT_PRESENT_RESET,
  GET_LIST_FOR_UPDATE_STUDENT_PRESENT_SUCCESS,
  GET_LIST_STUDENT_PRESENT_FAIL,
  GET_LIST_STUDENT_PRESENT_REQUEST,
  GET_LIST_STUDENT_PRESENT_RESET,
  GET_LIST_STUDENT_PRESENT_SUCCESS,
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

export const getEnglishDateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ENGLISH_DATE_REQUEST:
      return { loading: true };
    case GET_ENGLISH_DATE_SUCCESS:
      return {
        loading: false,
        engDate: action.payload,
      };
    case GET_ENGLISH_DATE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ENGLISH_DATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getListStudentPresentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_STUDENT_PRESENT_REQUEST:
      return { loading: true };
    case GET_LIST_STUDENT_PRESENT_SUCCESS:
      return {
        loading: false,
        getListStudentPresent: action.payload,
      };
    case GET_LIST_STUDENT_PRESENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_STUDENT_PRESENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getListForUpdateStudentPresentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_FOR_UPDATE_STUDENT_PRESENT_REQUEST:
      return { loading: true };
    case GET_LIST_FOR_UPDATE_STUDENT_PRESENT_SUCCESS:
      return {
        loading: false,
        getListForUpdateStudentPresent: action.payload,
      };
    case GET_LIST_FOR_UPDATE_STUDENT_PRESENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_FOR_UPDATE_STUDENT_PRESENT_RESET:
      return {};
    default:
      return state;
  }
};
