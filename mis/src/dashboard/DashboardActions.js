import axios from "axios";
import { API_URL, axiosInstance, tokenConfig } from "../constants";
import {
  GET_HEADER_BANNER_FAIL,
  GET_HEADER_BANNER_REQUEST,
  GET_HEADER_BANNER_SUCCESS,
  GET_HEADER_CONTENT_FAIL,
  GET_HEADER_CONTENT_REQUEST,
  GET_HEADER_CONTENT_SUCCESS,
} from "./DashboardConstants";

export const getHeaderContentAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_HEADER_CONTENT_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/Home/GetHeaderContent`,
      tokenConfig
    );

    dispatch({ type: GET_HEADER_CONTENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_HEADER_CONTENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getHeaderBannerAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_HEADER_BANNER_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/Home/GetHeaderBanner
      `,
      tokenConfig
    );

    dispatch({ type: GET_HEADER_BANNER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_HEADER_BANNER_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
