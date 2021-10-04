import axios from "axios";
import {
  GET_ALL_ROLE_FAIL,
  GET_ALL_ROLE_REQUEST,
  GET_ALL_ROLE_SUCCESS,
  GET_SINGLE_ROLE_FAIL,
  GET_SINGLE_ROLE_REQUEST,
  GET_SINGLE_ROLE_SUCCESS,
  ROLE_CREATE_FAIL,
  ROLE_CREATE_REQUEST,
  ROLE_CREATE_SUCCESS,
  UPDATE_SINGLE_ROLE_FAIL,
  UPDATE_SINGLE_ROLE_REQUEST,
  UPDATE_SINGLE_ROLE_SUCCESS,
} from "./RoleConstant";

export const getAllRolesAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ROLE_REQUEST });

    const { data } = await axios.get("http://192.168.1.103:84/api/HRRole");

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

export const roleCreateAction = (role) => async (dispatch) => {
  try {
    dispatch({ type: ROLE_CREATE_REQUEST });

    const jsonData = JSON.stringify({ hrRoleModel: role });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://192.168.1.103:84/api/HRRole",
      jsonData,
      config
    );

    dispatch({ type: ROLE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ROLE_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleRoleAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ROLE_REQUEST });

    const { data } = await axios.get(
      `http://192.168.1.103:84/api/HRRole/${id}`
    );

    dispatch({ type: GET_SINGLE_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ROLE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSingleRoleAction = (role) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SINGLE_ROLE_REQUEST });

    const jsonData = JSON.stringify({ hrRoleModel: role });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "http://192.168.1.103:84/api/HRRole",
      jsonData,
      config
    );

    dispatch({ type: UPDATE_SINGLE_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SINGLE_ROLE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
