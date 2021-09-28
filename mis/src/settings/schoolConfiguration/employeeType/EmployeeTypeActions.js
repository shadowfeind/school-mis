import axios from "axios";
import {
  EMPLOYEE_TYPE_CREATE_FAIL,
  EMPLOYEE_TYPE_CREATE_REQUEST,
  EMPLOYEE_TYPE_CREATE_SUCCESS,
  GET_ALL_EMPLOYEE_TYPE_FAIL,
  GET_ALL_EMPLOYEE_TYPE_REQUEST,
  GET_ALL_EMPLOYEE_TYPE_SUCCESS,
  GET_SINGLE_EMPLOYEE_TYPE_FAIL,
  GET_SINGLE_EMPLOYEE_TYPE_REQUEST,
  GET_SINGLE_EMPLOYEE_TYPE_SUCCESS,
  UPDATE_SINGLE_EMPLOYEE_TYPE_FAIL,
  UPDATE_SINGLE_EMPLOYEE_TYPE_REQUEST,
  UPDATE_SINGLE_EMPLOYEE_TYPE_SUCCESS,
} from "./EmployeeTypeConstant";

export const getAllEmployeeTypeAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EMPLOYEE_TYPE_REQUEST });

    const { data } = await axios.get(
      "http://192.168.1.103:84/api/HREmployeeType"
    );

    dispatch({ type: GET_ALL_EMPLOYEE_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMPLOYEE_TYPE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const employeeTypeCreateAction = (employeeType) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_TYPE_CREATE_REQUEST });

    const jsonData = JSON.stringify({ hrEmployeeTypeModel: employeeType });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://192.168.1.103:84/api/HREmployeeType",
      jsonData,
      config
    );

    dispatch({ type: EMPLOYEE_TYPE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_TYPE_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleEmployeeTypeAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_EMPLOYEE_TYPE_REQUEST });

    const { data } = await axios.get(
      `http://192.168.1.103:84/api/HREmployeeType/${id}`
    );

    dispatch({ type: GET_SINGLE_EMPLOYEE_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EMPLOYEE_TYPE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSingleEmployeeTypeAction =
  (employeeType) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_EMPLOYEE_TYPE_REQUEST });

      const jsonData = JSON.stringify({ hrEmployeeTypeModel: employeeType });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        "http://192.168.1.103:84/api/HREmployeeType",
        jsonData,
        config
      );

      dispatch({ type: UPDATE_SINGLE_EMPLOYEE_TYPE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_EMPLOYEE_TYPE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
