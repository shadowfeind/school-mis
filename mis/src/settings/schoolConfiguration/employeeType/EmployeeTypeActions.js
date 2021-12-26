import axios from "axios";
import { API_URL } from "../../../constants";
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
      `${API_URL}/api/HREmployeeType/GetHREmployeeType`
    );

    dispatch({ type: GET_ALL_EMPLOYEE_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMPLOYEE_TYPE_FAIL,
      payload: error.message ? error.message : error.Message,
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
      `${API_URL}/api/HREmployeeType/PostHREmployeeType`,
      jsonData,
      config
    );

    dispatch({ type: EMPLOYEE_TYPE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_TYPE_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleEmployeeTypeAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_EMPLOYEE_TYPE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/HREmployeeType/GetHREmployeeTypeById/${id}`
    );

    dispatch({ type: GET_SINGLE_EMPLOYEE_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EMPLOYEE_TYPE_FAIL,
      payload: error.message ? error.message : error.Message,
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
        `${API_URL}/api/HREmployeeType/PutHREmployeeType`,
        jsonData,
        config
      );

      dispatch({ type: UPDATE_SINGLE_EMPLOYEE_TYPE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_EMPLOYEE_TYPE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
