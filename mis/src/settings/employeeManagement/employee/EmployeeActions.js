import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
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
  GET_RESETPASSWORD_DATA_SINGLE_EMPLOYEE_FAIL,
  GET_RESETPASSWORD_DATA_SINGLE_EMPLOYEE_REQUEST,
  GET_RESETPASSWORD_DATA_SINGLE_EMPLOYEE_SUCCESS,
  GET_SINGLE_EMPLOYEE_FAIL,
  GET_SINGLE_EMPLOYEE_REQUEST,
  GET_SINGLE_EMPLOYEE_SUCCESS,
  RESETPASSWORD_FOR_SINGLE_EMPLOYEE_FAIL,
  RESETPASSWORD_FOR_SINGLE_EMPLOYEE_REQUEST,
  RESETPASSWORD_FOR_SINGLE_EMPLOYEE_SUCCESS,
  UPDATE_SINGLE_EMPLOYEE_FAIL,
  UPDATE_SINGLE_EMPLOYEE_REQUEST,
  UPDATE_SINGLE_EMPLOYEE_SUCCESS,
} from "./EmployeeConstants";

export const getAllEmployeeAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EMPLOYEE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/HREmployee/GetHREmployee`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_EMPLOYEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMPLOYEE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getAllEmployeeCreateAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EMPLOYEE_CREATE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/HREmployee/0/0/0/0/0/create`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_EMPLOYEE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMPLOYEE_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const employeeCreateAction = (employee) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_CREATE_REQUEST });

    const jsonData = JSON.stringify({ hrEmployeeModel: employee });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.post(
      `${API_URL}/api/HREmployee/PostHREmployee`,
      jsonData,
      tokenConfig
    );

    dispatch({ type: EMPLOYEE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleEmployeeAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_EMPLOYEE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/HREmployee/GetHREmployeeById/${id}`,
      tokenConfig
    );

    dispatch({ type: GET_SINGLE_EMPLOYEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EMPLOYEE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const updateSingleEmployeeAction = (employee) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SINGLE_EMPLOYEE_REQUEST });

    const jsonData = JSON.stringify({ hrEmployeeModel: employee });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.put(
      `${API_URL}/api/HREmployee/PutHRPosition`,
      jsonData,
      tokenConfig
    );

    dispatch({ type: UPDATE_SINGLE_EMPLOYEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SINGLE_EMPLOYEE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleEmployeePasswordresetDataAction =
  (id, company, branch, department) => async (dispatch) => {
    try {
      dispatch({ type: GET_RESETPASSWORD_DATA_SINGLE_EMPLOYEE_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/GetResetPassword/${company}/${branch}/${department}/0/0/reset?id=${id}`,
        tokenConfig
      );

      dispatch({
        type: GET_RESETPASSWORD_DATA_SINGLE_EMPLOYEE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_RESETPASSWORD_DATA_SINGLE_EMPLOYEE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const resetSingleEmployeePasswordAction =
  (employee) => async (dispatch) => {
    try {
      dispatch({ type: RESETPASSWORD_FOR_SINGLE_EMPLOYEE_REQUEST });

      const jsonData = JSON.stringify({ hrEmployeeModel: employee });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axios.put(
        `${API_URL}/api/PutResetPassword`,
        jsonData,
        tokenConfig
      );

      dispatch({
        type: RESETPASSWORD_FOR_SINGLE_EMPLOYEE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RESETPASSWORD_FOR_SINGLE_EMPLOYEE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
