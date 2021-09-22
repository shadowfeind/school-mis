import axios from "axios";
import {
  GET_ALL_EMPLOYEE_FAIL,
  GET_ALL_EMPLOYEE_REQUEST,
  GET_ALL_EMPLOYEE_SUCCESS,
} from "./EmployeeConstants";

export const getAllEmployeeAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EMPLOYEE_REQUEST });

    const { data } = await axios.get("http://localhost:5000/api/mock/employee");

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
