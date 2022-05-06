import axios from "axios";
import { API_URL, tokenConfig, tokenHeader } from "../../constants";
import {
  GET_ALL_SMS_CLASS_NOTIFICATION_FAIL,
  GET_ALL_SMS_CLASS_NOTIFICATION_REQUEST,
  GET_ALL_SMS_CLASS_NOTIFICATION_SUCCESS,
  GET_BULK_SMS_CLASS_NOTIFICATION_FAIL,
  GET_BULK_SMS_CLASS_NOTIFICATION_REQUEST,
  GET_BULK_SMS_CLASS_NOTIFICATION_SUCCESS,
  GET_LIST_SMS_CLASS_NOTIFICATION_FAIL,
  GET_LIST_SMS_CLASS_NOTIFICATION_REQUEST,
  GET_LIST_SMS_CLASS_NOTIFICATION_SUCCESS,
  POST_SMS_CLASS_NOTIFICATION_FAIL,
  POST_SMS_CLASS_NOTIFICATION_REQUEST,
  POST_SMS_CLASS_NOTIFICATION_SUCCESS,
} from "./SmsClassNotificationConstants";

export const getAllSmsClassNotificationAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SMS_CLASS_NOTIFICATION_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/SMSClassNotification/GetAllClassNotification`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_SMS_CLASS_NOTIFICATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_SMS_CLASS_NOTIFICATION_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getListSmsClassNotificationAction =
  (year, program, classId, shift, section, date) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_SMS_CLASS_NOTIFICATION_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/SMSClassNotification/GetListClassNotification?idAcademicYear=${year}&idFacultyProgramLink=${program}&idClass=${classId}&idShift=${shift}&classSection=${section}&createdDate=${date}`,
        tokenConfig
      );

      dispatch({
        type: GET_LIST_SMS_CLASS_NOTIFICATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_SMS_CLASS_NOTIFICATION_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getBulkSmsClassNotificationAction =
  (year, program, classId, shift, section) => async (dispatch) => {
    try {
      dispatch({ type: GET_BULK_SMS_CLASS_NOTIFICATION_REQUEST });

      const { data } = await axios.get(
        `${API_URL}/api/SMSClassNotification/GetBulkClassNotification?idAcademicYear=${year}&idFacultyProgramLink=${program}&idClass=${classId}&idShift=${shift}&classSection=${section}`,
        tokenConfig
      );

      dispatch({
        type: GET_BULK_SMS_CLASS_NOTIFICATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BULK_SMS_CLASS_NOTIFICATION_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const postSmsClassNotificationAction =
  (dbModel, selectedStudents, SchoolShortName) => async (dispatch) => {
    try {
      dispatch({ type: POST_SMS_CLASS_NOTIFICATION_REQUEST });

      // const fcmTokenList = [];
      // selectedStudents.forEach((student) => {
      //   fcmTokenList.push(student.fcmToken);
      // });

      // const fcmBody = {
      //   registration_ids: fcmTokenList,
      //   collapse_key: "type_a",
      //   notification: {
      //     body: dbModel.MessageHeading,
      //     title: SchoolShortName,
      //   },
      // };

      // const fbody = JSON.stringify(fcmBody);

      // await axios.post(
      //   "https://fcm.googleapis.com/fcm/send",
      //   fbody,
      //   tokenHeader
      // );

      const jsonData = JSON.stringify({
        dbModel,
        dbModelLst: selectedStudents,
      });

      console.log(jsonData);
      await axios.post(
        `${API_URL}/api/SMSClassNotification/PostClassNotification`,
        jsonData,
        tokenConfig
      );

      dispatch({
        type: POST_SMS_CLASS_NOTIFICATION_SUCCESS,
        payload: "success",
      });
    } catch (error) {
      dispatch({
        type: POST_SMS_CLASS_NOTIFICATION_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
