import axios from "axios";
import {
  EMPLOYEE_CATEGORY_ROLE_CREATE_FAIL,
  EMPLOYEE_CATEGORY_ROLE_CREATE_REQUEST,
  EMPLOYEE_CATEGORY_ROLE_CREATE_SUCCESS,
  GET_ALL_EMPLOYEE_CATEGORY_ROLE_FAIL,
  GET_ALL_EMPLOYEE_CATEGORY_ROLE_REQUEST,
  GET_ALL_EMPLOYEE_CATEGORY_ROLE_SUCCESS,
  GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_FAIL,
  GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_REQUEST,
  GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_SUCCESS,
  UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_FAIL,
  UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_REQUEST,
  UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_SUCCESS,
} from "./EmployeeCategoryRoleConstant";

export const getAllEmployeeCategoryRoleAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EMPLOYEE_CATEGORY_ROLE_REQUEST });

    const { data } = await axios.get(
      "http://192.168.1.103:84/api/HREmployeeCategoryRole"
    );

    dispatch({ type: GET_ALL_EMPLOYEE_CATEGORY_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMPLOYEE_CATEGORY_ROLE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const employeeCategoryRoleCreateAction =
  (employeeCategoryRole) => async (dispatch) => {
    try {
      dispatch({ type: EMPLOYEE_CATEGORY_ROLE_CREATE_REQUEST });

      const jsonData = JSON.stringify({ dbModel: employeeCategoryRole });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://192.168.1.103:84/api/HREmployeeCategoryRole",
        jsonData,
        config
      );

      dispatch({ type: EMPLOYEE_CATEGORY_ROLE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EMPLOYEE_CATEGORY_ROLE_CREATE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getSingleEmployeeCategoryRoleAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_REQUEST });

    const { data } = await axios.get(
      `http://192.168.1.103:84/api/HREmployeeCategoryRole/${id}`
    );

    dispatch({
      type: GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSingleEmployeeCategoryRoleAction =
  (categoryRole) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_REQUEST });

      const jsonData = JSON.stringify({ dbModel: categoryRole });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        "http://192.168.1.103:84/api/HREmployeeCategoryRole",
        jsonData,
        config
      );

      dispatch({
        type: UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
