import {
  ACADEMIC_YEAR_CALENDAR_CREATE_FAIL,
  ACADEMIC_YEAR_CALENDAR_CREATE_REQUEST,
  ACADEMIC_YEAR_CALENDAR_CREATE_RESET,
  ACADEMIC_YEAR_CALENDAR_CREATE_SUCCESS,
  GET_ACADEMIC_YEAR_CALENDAR_OPTION_FAIL,
  GET_ACADEMIC_YEAR_CALENDAR_OPTION_REQUEST,
  GET_ACADEMIC_YEAR_CALENDAR_OPTION_RESET,
  GET_ACADEMIC_YEAR_CALENDAR_OPTION_SUCCESS,
  GET_ALL_ACADEMIC_YEAR_CALENDAR_FAIL,
  GET_ALL_ACADEMIC_YEAR_CALENDAR_REQUEST,
  GET_ALL_ACADEMIC_YEAR_CALENDAR_SUCCESS,
  GET_SINGLE_ACADEMIC_YEAR_CALENDAR_FAIL,
  GET_SINGLE_ACADEMIC_YEAR_CALENDAR_REQUEST,
  GET_SINGLE_ACADEMIC_YEAR_CALENDAR_RESET,
  GET_SINGLE_ACADEMIC_YEAR_CALENDAR_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_FAIL,
  UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_REQUEST,
  UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_RESET,
  UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_SUCCESS,
} from "./AcademicYearCalendarConstant";

export const getAllAcademicYearCalendar = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ACADEMIC_YEAR_CALENDAR_REQUEST:
      return { loading: true };
    case GET_ALL_ACADEMIC_YEAR_CALENDAR_SUCCESS:
      return { loading: false, academicYearCalendar: action.payload };
    case GET_ALL_ACADEMIC_YEAR_CALENDAR_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createAcademicYearCalendarReducer = (state = {}, action) => {
  switch (action.type) {
    case ACADEMIC_YEAR_CALENDAR_CREATE_REQUEST:
      return { loading: true };
    case ACADEMIC_YEAR_CALENDAR_CREATE_SUCCESS:
      return {
        loading: false,
        academicYearCalendar: action.payload,
        success: true,
      };
    case ACADEMIC_YEAR_CALENDAR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ACADEMIC_YEAR_CALENDAR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getAcademicYearCalendarOptionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ACADEMIC_YEAR_CALENDAR_OPTION_REQUEST:
      return { loading: true };
    case GET_ACADEMIC_YEAR_CALENDAR_OPTION_SUCCESS:
      return { loading: false, academicYearCalendarOption: action.payload };
    case GET_ACADEMIC_YEAR_CALENDAR_OPTION_FAIL:
      return { loading: false, error: action.payload };
    case GET_ACADEMIC_YEAR_CALENDAR_OPTION_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleAcademicYearCalendarReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ACADEMIC_YEAR_CALENDAR_REQUEST:
      return { loading: true };
    case GET_SINGLE_ACADEMIC_YEAR_CALENDAR_SUCCESS:
      return { loading: false, singleAcademicYearCalendar: action.payload };
    case GET_SINGLE_ACADEMIC_YEAR_CALENDAR_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_ACADEMIC_YEAR_CALENDAR_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleAcademicYearCalendarReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_SUCCESS:
      return {
        loading: false,
        updatedAcademicYearCalendar: action.payload,
        success: true,
      };
    case UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_RESET:
      return {};
    default:
      return state;
  }
};
