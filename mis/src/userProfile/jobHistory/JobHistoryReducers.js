import {
  GET_ALL_JOBHISTORY_FAIL,
  GET_ALL_JOBHISTORY_REQUEST,
  GET_ALL_JOBHISTORY_RESET,
  GET_ALL_JOBHISTORY_SUCCESS,
} from "./JobHistoryConstants";

export const getAllJobHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_JOBHISTORY_REQUEST:
      return { loading: true };
    case GET_ALL_JOBHISTORY_SUCCESS:
      return { loading: false, getAllJobHistory: action.payload };
    case GET_ALL_JOBHISTORY_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_JOBHISTORY_RESET:
      return {};
    default:
      return state;
  }
};
