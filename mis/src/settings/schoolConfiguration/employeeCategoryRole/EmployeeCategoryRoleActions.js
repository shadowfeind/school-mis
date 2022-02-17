import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  DELETE_EMPLOYEE_CATEGORY_ROLE_FAIL,
  DELETE_EMPLOYEE_CATEGORY_ROLE_REQUEST,
  DELETE_EMPLOYEE_CATEGORY_ROLE_SUCCESS,
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
      `${API_URL}/api/HREmployeeCategoryRole/GetHREmployeeCategoryRoleViewModelLst`,
      tokenConfig
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

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axios.post(
        `${API_URL}/api/HREmployeeCategoryRole/PostHREmployeeCategoryRole`,
        jsonData,
        tokenConfig
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
      `${API_URL}/api/HREmployeeCategoryRole/GetHREmployeeCategoryRoleById/${id}`,
      tokenConfig
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

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axios.put(
        `${API_URL}/api/HREmployeeCategoryRole/PutHREmployeeCategoryRole`,
        jsonData,
        tokenConfig
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

 
  export const deleteEmployeeCategoryRoleAction =
  (categoryDeleteRole) => async (dispatch) => {
    
    try {
      
      dispatch({ type: DELETE_EMPLOYEE_CATEGORY_ROLE_REQUEST });
      
      const jsonData = JSON.stringify({ dbModel: categoryDeleteRole });
      
      await axios.post(
        `${API_URL}/api/HREmployeeCategoryRole/DeleteHREmployeeCategoryRole`,
        jsonData,
        tokenConfig
      );
        
      dispatch({
        type: DELETE_EMPLOYEE_CATEGORY_ROLE_SUCCESS
      });
      
    } catch (error) {
      
      dispatch({
        type: DELETE_EMPLOYEE_CATEGORY_ROLE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };