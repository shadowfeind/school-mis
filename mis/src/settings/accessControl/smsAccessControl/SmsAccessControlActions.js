import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  GET_ALL_SMS_ACCESS_CONTROL_FAIL,
  GET_ALL_SMS_ACCESS_CONTROL_REQUEST,
  GET_ALL_SMS_ACCESS_CONTROL_SUCCESS,
  GET_LIST_SMS_ACCESS_CONTROL_FAIL,
  GET_LIST_SMS_ACCESS_CONTROL_REQUEST,
  GET_LIST_SMS_ACCESS_CONTROL_SUCCESS,
  GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_FAIL,
  GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_REQUEST,
  GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_SUCCESS,
  GET_SINGLE_TO_EDIT_SMS_ACCESS_CONTROL_FAIL,
  GET_SINGLE_TO_EDIT_SMS_ACCESS_CONTROL_REQUEST,
  GET_SINGLE_TO_EDIT_SMS_ACCESS_CONTROL_SUCCESS,
  POST_SMS_ACCESS_CONTROL_FAIL,
  POST_SMS_ACCESS_CONTROL_REQUEST,
  POST_SMS_ACCESS_CONTROL_SUCCESS,
  PUT_SMS_ACCESS_CONTROL_FAIL,
  PUT_SMS_ACCESS_CONTROL_REQUEST,
  PUT_SMS_ACCESS_CONTROL_SUCCESS,
} from "./SmsAccessControlConstants";

export const getAllSmsAccessControlAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SMS_ACCESS_CONTROL_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/SMSAccessControl/GetAllSMSAccessControl
              `,
      tokenConfig
    );

    dispatch({
      type: GET_ALL_SMS_ACCESS_CONTROL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SMS_ACCESS_CONTROL_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getListSmsAccessControlAction = (company) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_SMS_ACCESS_CONTROL_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/SMSAccessControl/GetListSMSAccessControl?company=${company}&searchKey=1
              `,
      tokenConfig
    );

    dispatch({
      type: GET_LIST_SMS_ACCESS_CONTROL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_SMS_ACCESS_CONTROL_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleCreateSmsAccessControlAction = (company) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/SMSAccessControl/GetSingleToCreateSMSAccessControl?company=${company}&searchKey=1
              `,
      tokenConfig
    );

    dispatch({
      type: GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleEditSmsAccessControlAction = (id,company) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_EDIT_SMS_ACCESS_CONTROL_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/SMSAccessControl/GetSingleToEditSMSAccessControl/${id}?company=${company}&searchKey=1
              `,
      tokenConfig
    );

    dispatch({
      type: GET_SINGLE_TO_EDIT_SMS_ACCESS_CONTROL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_EDIT_SMS_ACCESS_CONTROL_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};


export const postSmsAccessControlAction =
  (accessControl) => async (dispatch) => {
    try {
      dispatch({ type: POST_SMS_ACCESS_CONTROL_REQUEST });

      const jsonData = JSON.stringify({ dbModel: accessControl });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axios.post(
        `${API_URL}/api/SMSAccessControl/PostSMSAccessControl`,
        jsonData,
        tokenConfig
      );

      dispatch({
        type: POST_SMS_ACCESS_CONTROL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_SMS_ACCESS_CONTROL_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

  export const putSmsAccessControlAction =
  (accessControl) => async (dispatch) => {
    try {
      dispatch({ type: PUT_SMS_ACCESS_CONTROL_REQUEST });

      const jsonData = JSON.stringify({ dbModel: accessControl });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axios.put(
        `${API_URL}/api/SMSAccessControl/PutSMSAccessControl`,
        jsonData,
        tokenConfig
      );

      dispatch({
        type: PUT_SMS_ACCESS_CONTROL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PUT_SMS_ACCESS_CONTROL_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

