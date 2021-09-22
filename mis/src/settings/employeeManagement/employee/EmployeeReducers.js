import {
  GET_ALL_EMPLOYEE_FAIL,
  GET_ALL_EMPLOYEE_REQUEST,
  GET_ALL_EMPLOYEE_SUCCESS,
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
