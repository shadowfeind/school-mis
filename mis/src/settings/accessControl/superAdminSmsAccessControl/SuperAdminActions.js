import axios from "axios";
import { API_URL, tokenConfig } from "../../../constants";
import {
  GET_ALL_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL,
  GET_ALL_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST,
  GET_ALL_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS,
  GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL,
  GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST,
  GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS,
  GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL,
  GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST,
  GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS,
  GET_SINGLE_EDIT_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL,
  GET_SINGLE_EDIT_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST,
  GET_SINGLE_EDIT_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS,
  POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL,
  POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST,
  POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS,
  PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL,
  PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST,
  PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS,
} from "./SuperAdminConstant";

export const getAllSuperAdminSmsAccessControlAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/SuperAdminSMSAccessControl/GetAllSuperAdminSMSAccessControl
                `,
        tokenConfig
      );

      dispatch({
        type: GET_ALL_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getListSuperAdminSmsAccessControlAction =
  (company) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/SuperAdminSMSAccessControl/GetListSuperAdminSMSAccessControl?company=${company}&searchKey=1
                `,
        tokenConfig
      );

      dispatch({
        type: GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getSingleCreateSuperAdminSmsAccessControlAction =
  (company) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST,
      });

      const { data } = await axios.get(
        `${API_URL}/api/SuperAdminSMSAccessControl/GetSingleToCreateSuperADinSMSAccessControl?company=${company}&searchKey=1
                `,
        tokenConfig
      );

      dispatch({
        type: GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getSingleEditSuperAdminSmsAccessControlAction =
  (id, company) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_EDIT_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST,
      });

      const { data } = await axios.get(
        `${API_URL}/api/SuperAdminSMSAccessControl/GetSingleToEditSuperAdminSMSAccessControl/${id}?company=${company}&searchKey=1
                `,
        tokenConfig
      );

      dispatch({
        type: GET_SINGLE_EDIT_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_EDIT_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const postSuperAdminSmsAccessControlAction =
  (accessControl) => async (dispatch) => {
    try {
      dispatch({ type: POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST });

      const jsonData = JSON.stringify({ dbModel: accessControl });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axios.post(
        `${API_URL}/api/SuperAdminSMSAccessControl/PostSuperAdminSMSAccessControl`,
        jsonData,
        tokenConfig
      );

      dispatch({
        type: POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL,
        payload: error.response.data.Message
          ? error.response.data.Message
          : error.message,
      });
    }
  };

export const putSuperAdminSmsAccessControlAction =
  (accessControl) => async (dispatch) => {
    try {
      dispatch({ type: PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST });

      const jsonData = JSON.stringify({ dbModel: accessControl });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axios.put(
        `${API_URL}/api/SuperAdminSMSAccessControl/PutSuperAdminSMSAccessControl`,
        jsonData,
        tokenConfig
      );

      dispatch({
        type: PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
