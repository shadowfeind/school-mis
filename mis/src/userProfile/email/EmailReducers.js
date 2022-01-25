import {
  GET_ALL_EMAIL_FAIL,
  GET_ALL_EMAIL_REQUEST,
  GET_ALL_EMAIL_RESET,
  GET_ALL_EMAIL_SUCCESS,
  GET_SINGLE_EMAIL_FAIL,
  GET_SINGLE_EMAIL_REQUEST,
  GET_SINGLE_EMAIL_RESET,
  GET_SINGLE_EMAIL_SUCCESS,
} from "./EmailConstants";

export const getAllEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EMAIL_REQUEST:
      return { loading: true };
    case GET_ALL_EMAIL_SUCCESS:
      return { loading: false, getAllEmail: action.payload };
    case GET_ALL_EMAIL_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_EMAIL_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_EMAIL_REQUEST:
      return { loading: true };
    case GET_SINGLE_EMAIL_SUCCESS:
      return { loading: false, singleEmail: action.payload };
    case GET_SINGLE_EMAIL_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_EMAIL_RESET:
      return {};
    default:
      return state;
  }
};
