import {
  GET_ALL_CONTACTADDRESS_FAIL,
  GET_ALL_CONTACTADDRESS_REQUEST,
  GET_ALL_CONTACTADDRESS_RESET,
  GET_ALL_CONTACTADDRESS_SUCCESS,
} from "./ContactAddressConstants";

export const getAllContactAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CONTACTADDRESS_REQUEST:
      return { loading: true };
    case GET_ALL_CONTACTADDRESS_SUCCESS:
      return { loading: false, getAllContactAddress: action.payload };
    case GET_ALL_CONTACTADDRESS_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_CONTACTADDRESS_RESET:
      return {};
    default:
      return state;
  }
};
