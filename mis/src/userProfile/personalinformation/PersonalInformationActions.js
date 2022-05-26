import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_PERSONALINFORMATION_FAIL,
  GET_ALL_PERSONALINFORMATION_REQUEST,
  GET_ALL_PERSONALINFORMATION_SUCCESS,
  GET_EMPLOYEELIST_SEARCH_FAIL,
  GET_EMPLOYEELIST_SEARCH_REQUEST,
  GET_EMPLOYEELIST_SEARCH_SUCCESS,
  GET_SINGLE_PERSONALINFORMATION_FAIL,
  GET_SINGLE_PERSONALINFORMATION_REQUEST,
  GET_SINGLE_PERSONALINFORMATION_SEARCH_FAIL,
  GET_SINGLE_PERSONALINFORMATION_SEARCH_REQUEST,
  GET_SINGLE_PERSONALINFORMATION_SEARCH_SUCCESS,
  GET_SINGLE_PERSONALINFORMATION_SUCCESS,
  UPDATE_SINGLE_PERSONALINFORMATION_FAIL,
  UPDATE_SINGLE_PERSONALINFORMATION_REQUEST,
  UPDATE_SINGLE_PERSONALINFORMATION_SUCCESS,
} from "./PersonalInformationConstants";

export const getAllPersonalInformationAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PERSONALINFORMATION_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/PID_PersonalInformation/GetAllPIDPersonalInformation?searchKey=1`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_PERSONALINFORMATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_PERSONALINFORMATION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSinglePersonalInformationAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_PERSONALINFORMATION_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/PID_PersonalInformation/GetSingleEdit?searchKey=1`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_PERSONALINFORMATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PERSONALINFORMATION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSinglePersonalInformationSearchAction =
  (name) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_PERSONALINFORMATION_SEARCH_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/PID_PersonalInformation/GetSingleEdit?searchKey=${name}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_PERSONALINFORMATION_SEARCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_PERSONALINFORMATION_SEARCH_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const updateSinglePersonalInformationAction =
  (personalInformation) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_PERSONALINFORMATION_REQUEST });

      const jsonData = JSON.stringify({ dbModel: personalInformation });

      const { data } = await axiosInstance.put(
        `${API_URL}/api/PID_PersonalInformation/Put`,
        jsonData,
        tokenConfig()
      );
      console.log(jsonData);

      dispatch({
        type: UPDATE_SINGLE_PERSONALINFORMATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_PERSONALINFORMATION_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getEmployeeListAction = (employee) => async (dispatch) => {
  try {
    dispatch({ type: GET_EMPLOYEELIST_SEARCH_REQUEST });

    const { data } = await axiosInstance.post(
      `${API_URL}/api/PID_PersonalInformation/GetEmployeeList?searchkey=${employee}`,
      {},
      tokenConfig()
    );

    dispatch({ type: GET_EMPLOYEELIST_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_EMPLOYEELIST_SEARCH_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
