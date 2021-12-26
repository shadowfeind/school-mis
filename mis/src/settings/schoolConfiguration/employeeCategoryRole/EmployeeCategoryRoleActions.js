import axios from "axios";
import { API_URL } from "../../../constants";
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
      `${API_URL}/api/HREmployeeCategoryRole/GetHREmployeeCategoryRoleViewModelLst`
    );

    dispatch({ type: GET_ALL_EMPLOYEE_CATEGORY_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMPLOYEE_CATEGORY_ROLE_FAIL,
      payload: error.message ? error.message : error.Message,
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
        `${API_URL}/api/HREmployeeCategoryRole/PostHREmployeeCategoryRole`,
        jsonData,
        config
      );

      dispatch({ type: EMPLOYEE_CATEGORY_ROLE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EMPLOYEE_CATEGORY_ROLE_CREATE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getSingleEmployeeCategoryRoleAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/HREmployeeCategoryRole/GetHREmployeeCategoryRoleById/${id}`
    );

    dispatch({
      type: GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_FAIL,
      payload: error.message ? error.message : error.Message,
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
        `${API_URL}/api/HREmployeeCategoryRole/PutHREmployeeCategoryRole`,
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
        payload: error.message ? error.message : error.Message,
      });
    }
  };
