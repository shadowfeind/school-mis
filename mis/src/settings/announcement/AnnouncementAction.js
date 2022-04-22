import axios from "axios";
import { API_URL, tokenConfig, tokenHeader } from "../../constants";
import {
  GET_ALL_ANNOUNCEMENT_REQUEST,
  GET_ALL_ANNOUNCEMENT_SUCCESS,
  GET_ALL_ANNOUNCEMENT_FAIL,
  ANNOUNCEMENT_CREATE_REQUEST,
  ANNOUNCEMENT_CREATE_SUCCESS,
  ANNOUNCEMENT_CREATE_FAIL,
  GET_SINGLE_ANNOUNCEMENT_REQUEST,
  GET_SINGLE_ANNOUNCEMENT_SUCCESS,
  GET_SINGLE_ANNOUNCEMENT_FAIL,
  UPDATE_SINGLE_ANNOUNCEMENT_REQUEST,
  UPDATE_SINGLE_ANNOUNCEMENT_SUCCESS,
  UPDATE_SINGLE_ANNOUNCEMENT_FAIL,
  ANNOUNCEMENT_FCM_REQUEST,
  ANNOUNCEMENT_FCM_SUCCESS,
  ANNOUNCEMENT_FCM_FAIL,
} from "./AnnouncementConstants";

export const getAllAnnouncementAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ANNOUNCEMENT_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/Announcement/GetAllAnnouncement
      `,
      tokenConfig
    );

    dispatch({ type: GET_ALL_ANNOUNCEMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ANNOUNCEMENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getFCMForAnnouncementAction = () => async (dispatch) => {
  try {
    dispatch({ type: ANNOUNCEMENT_FCM_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/Announcement/GetSingleCreateAnnouncement`,
      tokenConfig
    );

    dispatch({ type: ANNOUNCEMENT_FCM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ANNOUNCEMENT_FCM_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const announcementCreateAction =
  (announcementCreate, fcmTokenList, schoolName) => async (dispatch) => {
    try {
      dispatch({ type: ANNOUNCEMENT_CREATE_REQUEST });

      const fcmBody = {
        registration_ids: fcmTokenList,
        collapse_key: "type_a",
        notification: {
          body: announcementCreate.NewsHeading,
          title: schoolName,
        },
      };

      const fbody = JSON.stringify(fcmBody);

      await axios.post(
        "https://fcm.googleapis.com/fcm/send",
        fbody,
        tokenHeader
      );

      const jsonData = JSON.stringify({ dbModel: announcementCreate });

      const { data } = await axios.post(
        `${API_URL}/api/Announcement/Post`,
        jsonData,
        tokenConfig
      );

      dispatch({ type: ANNOUNCEMENT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ANNOUNCEMENT_CREATE_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getSingleAnnouncementAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ANNOUNCEMENT_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/Announcement/GetSingleEditAnnouncement/1?searchKey=1`,
      tokenConfig
    );

    dispatch({
      type: GET_SINGLE_ANNOUNCEMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ANNOUNCEMENT_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const updateSingleAnnouncementAction =
  (announcementSingle) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_ANNOUNCEMENT_REQUEST });

      const jsonData = JSON.stringify({ dbModel: announcementSingle });

      const { data } = await axios.put(
        `${API_URL}/api/Announcement/Put`,
        jsonData,
        tokenConfig
      );

      dispatch({
        type: UPDATE_SINGLE_ANNOUNCEMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ANNOUNCEMENT_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
