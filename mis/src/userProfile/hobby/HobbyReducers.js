import {
  GET_ALL_HOBBY_FAIL,
  GET_ALL_HOBBY_REQUEST,
  GET_ALL_HOBBY_RESET,
  GET_ALL_HOBBY_SUCCESS,
} from "./HobbyConstants";

export const getAllHobbyReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_HOBBY_REQUEST:
      return { loading: true };
    case GET_ALL_HOBBY_SUCCESS:
      return { loading: false, getAllHobby: action.payload };
    case GET_ALL_HOBBY_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_HOBBY_RESET:
      return {};
    default:
      return state;
  }
};
