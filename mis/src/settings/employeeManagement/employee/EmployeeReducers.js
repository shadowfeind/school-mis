import {
  GET_ALL_EMPLOYEE_FAIL,
  GET_ALL_EMPLOYEE_REQUEST,
  GET_ALL_EMPLOYEE_SUCCESS,
  GET_ALL_EMPLOYEE_CREATE_REQUEST,
  GET_ALL_EMPLOYEE_CREATE_SUCCESS,
  GET_ALL_EMPLOYEE_CREATE_FAIL,
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_CREATE_FAIL,
  EMPLOYEE_CREATE_RESET,
  GET_SINGLE_EMPLOYEE_REQUEST,
  GET_SINGLE_EMPLOYEE_SUCCESS,
  GET_SINGLE_EMPLOYEE_FAIL,
  GET_SINGLE_EMPLOYEE_RESET,
  UPDATE_SINGLE_EMPLOYEE_REQUEST,
  UPDATE_SINGLE_EMPLOYEE_SUCCESS,
  UPDATE_SINGLE_EMPLOYEE_FAIL,
  UPDATE_SINGLE_EMPLOYEE_RESET,
} from "./EmployeeConstants";

export const getAllEmployee = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EMPLOYEE_REQUEST:
      return { loading: true };
    case GET_ALL_EMPLOYEE_SUCCESS:
      return { loading: false, employee: action.payload };
    case GET_ALL_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllEmployeeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EMPLOYEE_CREATE_REQUEST:
      return { loading: true };
    case GET_ALL_EMPLOYEE_CREATE_SUCCESS:
      return { loading: false, employeeCreate: action.payload };
    case GET_ALL_EMPLOYEE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_CREATE_REQUEST:
      return { loading: true };
    case EMPLOYEE_CREATE_SUCCESS:
      return { loading: false, employee: action.payload, success: true };
    case EMPLOYEE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_EMPLOYEE_REQUEST:
      return { loading: true };
    case GET_SINGLE_EMPLOYEE_SUCCESS:
      return { loading: false, singleEmployee: action.payload };
    case GET_SINGLE_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_EMPLOYEE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_EMPLOYEE_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_EMPLOYEE_SUCCESS:
      return { loading: false, updatedEmployee: action.payload, success: true };
    case UPDATE_SINGLE_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_EMPLOYEE_RESET:
      return {};
    default:
      return state;
  }
};
