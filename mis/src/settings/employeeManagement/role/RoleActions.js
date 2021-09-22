import axios from "axios";
import {
  GET_ALL_ROLE_FAIL,
  GET_ALL_ROLE_REQUEST,
  GET_ALL_ROLE_SUCCESS,
} from "./RoleConstant";

export const getAllRolesAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ROLE_REQUEST });

    const { data } = await axios.get("http://localhost:5000/api/mock/role");

    dispatch({ type: GET_ALL_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ROLE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
