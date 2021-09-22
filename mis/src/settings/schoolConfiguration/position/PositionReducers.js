import {
  GET_ALL_POSITION_FAIL,
  GET_ALL_POSITION_REQUEST,
  GET_ALL_POSITION_SUCCESS,
} from "./PositionConstatns";

export const getAllPosition = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_POSITION_REQUEST:
      return { loading: true };
    case GET_ALL_POSITION_SUCCESS:
      return { loading: false, position: action.payload };
    case GET_ALL_POSITION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
