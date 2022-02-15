import {
  GET_HEADER_CONTENT_FAIL,
  GET_HEADER_CONTENT_REQUEST,
  GET_HEADER_CONTENT_RESET,
  GET_HEADER_CONTENT_SUCCESS,
} from "./DashboardConstants";

export const getHeaderContentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_HEADER_CONTENT_REQUEST:
      return { loading: true };
    case GET_HEADER_CONTENT_SUCCESS:
      return { loading: false, headerContent: action.payload };
    case GET_HEADER_CONTENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_HEADER_CONTENT_RESET:
      return {};
    default:
      return state;
  }
};
