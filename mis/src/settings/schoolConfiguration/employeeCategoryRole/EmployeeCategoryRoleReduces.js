import {
  GET_ALL_EMPLOYEE_CATEGORY_ROLE_FAIL,
  GET_ALL_EMPLOYEE_CATEGORY_ROLE_REQUEST,
  GET_ALL_EMPLOYEE_CATEGORY_ROLE_SUCCESS,
} from "./EmployeeCategoryRoleConstant";

export const getAllEmployeeCategoryRole = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EMPLOYEE_CATEGORY_ROLE_REQUEST:
      return { loading: true };
    case GET_ALL_EMPLOYEE_CATEGORY_ROLE_SUCCESS:
      return { loading: false, employeeCategoryRole: action.payload };
    case GET_ALL_EMPLOYEE_CATEGORY_ROLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
