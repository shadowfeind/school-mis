import {
  GET_ALL_EMPLOYEE_TYPE_FAIL,
  GET_ALL_EMPLOYEE_TYPE_REQUEST,
  GET_ALL_EMPLOYEE_TYPE_SUCCESS,
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
