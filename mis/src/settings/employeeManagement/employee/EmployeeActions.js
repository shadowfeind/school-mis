import axios from "axios";
import {
  EMPLOYEE_CREATE_FAIL,
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_SUCCESS,
  GET_ALL_EMPLOYEE_CREATE_FAIL,
  GET_ALL_EMPLOYEE_CREATE_REQUEST,
  GET_ALL_EMPLOYEE_CREATE_SUCCESS,
  GET_ALL_EMPLOYEE_FAIL,
  GET_ALL_EMPLOYEE_REQUEST,
  GET_ALL_EMPLOYEE_SUCCESS,
  GET_SINGLE_EMPLOYEE_FAIL,
  GET_SINGLE_EMPLOYEE_REQUEST,
  GET_SINGLE_EMPLOYEE_SUCCESS,
  UPDATE_SINGLE_EMPLOYEE_FAIL,
  UPDATE_SINGLE_EMPLOYEE_REQUEST,
  UPDATE_SINGLE_EMPLOYEE_SUCCESS,
} from "./EmployeeConstants";

export const getAllEmployeeAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EMPLOYEE_REQUEST });

    const { data } = await axios.get("http://192.168.1.103:84/api/HREmployee");

    dispatch({ type: GET_ALL_EMPLOYEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMPLOYEE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllEmployeeCreateAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EMPLOYEE_CREATE_REQUEST });

    const { data } = await axios.get(
      "http://192.168.1.103:84/api/HREmployee/0/0/0/0/0/create"
    );

    dispatch({ type: GET_ALL_EMPLOYEE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMPLOYEE_CREATE_FAIL,
      payload: error.message,
    });
  }
};

export const employeeCreateAction = (employee) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_CREATE_REQUEST });

    const jsonData = JSON.stringify({ hrEmployeeModel: employee });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://192.168.1.103:84/api/HREmployee",
      jsonData,
      config
    );

    dispatch({ type: EMPLOYEE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleEmployeeAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_EMPLOYEE_REQUEST });

    const { data } = await axios.get(
      `http://192.168.1.103:84/api/HREmployee/${id}`
    );

    dispatch({ type: GET_SINGLE_EMPLOYEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EMPLOYEE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSingleEmployeeAction = (employee) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SINGLE_EMPLOYEE_REQUEST });

    const jsonData = JSON.stringify({ hrEmployeeModel: employee });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "http://192.168.1.103:84/api/HREmployee",
      jsonData,
      config
    );

    dispatch({ type: UPDATE_SINGLE_EMPLOYEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SINGLE_EMPLOYEE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
