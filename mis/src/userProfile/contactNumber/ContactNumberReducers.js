import {
  GET_ALL_CONTACTNUMBER_FAIL,
  GET_ALL_CONTACTNUMBER_REQUEST,
  GET_ALL_CONTACTNUMBER_RESET,
  GET_ALL_CONTACTNUMBER_SUCCESS,
  GET_SINGLE_CONTACTNUMBER_FAIL,
  GET_SINGLE_CONTACTNUMBER_REQUEST,
  GET_SINGLE_CONTACTNUMBER_RESET,
  GET_SINGLE_CONTACTNUMBER_SUCCESS,
} from "./ContactNumberConstants";

export const getAllContactNumberReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CONTACTNUMBER_REQUEST:
      return { loading: true };
    case GET_ALL_CONTACTNUMBER_SUCCESS:
      return { loading: false, getAllContactNumber: action.payload };
    case GET_ALL_CONTACTNUMBER_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_CONTACTNUMBER_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleContactNumberReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_CONTACTNUMBER_REQUEST:
      return { loading: true };
    case GET_SINGLE_CONTACTNUMBER_SUCCESS:
      return { loading: false, singleContactNumber: action.payload };
    case GET_SINGLE_CONTACTNUMBER_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_CONTACTNUMBER_RESET:
      return {};
    default:
      return state;
  }
};
