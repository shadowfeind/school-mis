import {
  EMPLOYEE_TYPE_CREATE_FAIL,
  EMPLOYEE_TYPE_CREATE_REQUEST,
  EMPLOYEE_TYPE_CREATE_RESET,
  EMPLOYEE_TYPE_CREATE_SUCCESS,
  GET_ALL_EMPLOYEE_TYPE_FAIL,
  GET_ALL_EMPLOYEE_TYPE_REQUEST,
  GET_ALL_EMPLOYEE_TYPE_SUCCESS,
  GET_SINGLE_EMPLOYEE_TYPE_FAIL,
  GET_SINGLE_EMPLOYEE_TYPE_REQUEST,
  GET_SINGLE_EMPLOYEE_TYPE_RESET,
  GET_SINGLE_EMPLOYEE_TYPE_SUCCESS,
  UPDATE_SINGLE_EMPLOYEE_TYPE_FAIL,
  UPDATE_SINGLE_EMPLOYEE_TYPE_REQUEST,
  UPDATE_SINGLE_EMPLOYEE_TYPE_RESET,
  UPDATE_SINGLE_EMPLOYEE_TYPE_SUCCESS,
} from "./EmployeeTypeConstant";

export const getAllEmployeeType = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EMPLOYEE_TYPE_REQUEST:
      return { loading: true };
    case GET_ALL_EMPLOYEE_TYPE_SUCCESS:
      return { loading: false, employeeType: action.payload };
    case GET_ALL_EMPLOYEE_TYPE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createEmployeeTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_TYPE_CREATE_REQUEST:
      return { loading: true };
    case EMPLOYEE_TYPE_CREATE_SUCCESS:
      return { loading: false, employeeType: action.payload, success: true };
    case EMPLOYEE_TYPE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_TYPE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleEmployeeTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_EMPLOYEE_TYPE_REQUEST:
      return { loading: true };
    case GET_SINGLE_EMPLOYEE_TYPE_SUCCESS:
      return { loading: false, singleEmployeeType: action.payload };
    case GET_SINGLE_EMPLOYEE_TYPE_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_EMPLOYEE_TYPE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleEmployeeTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_EMPLOYEE_TYPE_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_EMPLOYEE_TYPE_SUCCESS:
      return { loading: false, updatedEmployee: action.payload, success: true };
    case UPDATE_SINGLE_EMPLOYEE_TYPE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_EMPLOYEE_TYPE_RESET:
      return {};
    default:
      return state;
  }
};
