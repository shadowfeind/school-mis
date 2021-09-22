import {
  GET_ALL_ROLE_FAIL,
  GET_ALL_ROLE_REQUEST,
  GET_ALL_ROLE_SUCCESS,
} from "./RoleConstant";

export const getAllRoles = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ROLE_REQUEST:
      return { loading: true };
    case GET_ALL_ROLE_SUCCESS:
      return { loading: false, role: action.payload };
    case GET_ALL_ROLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
