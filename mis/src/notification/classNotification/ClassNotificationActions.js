import axios from "axios";
import {
  API_URL,
  axiosInstance,
  tokenConfig,
  tokenHeader,
} from "../../constants";
import {
  GET_ALL_CLASS_NOTIFICATION_FAIL,
  GET_ALL_CLASS_NOTIFICATION_REQUEST,
  GET_ALL_CLASS_NOTIFICATION_SUCCESS,
  GET_BULK_CLASS_NOTIFICATION_FAIL,
  GET_BULK_CLASS_NOTIFICATION_REQUEST,
  GET_BULK_CLASS_NOTIFICATION_SUCCESS,
  GET_LIST_CLASS_NOTIFICATION_FAIL,
  GET_LIST_CLASS_NOTIFICATION_REQUEST,
  GET_LIST_CLASS_NOTIFICATION_SUCCESS,
  POST_CLASS_NOTIFICATION_FAIL,
  POST_CLASS_NOTIFICATION_REQUEST,
  POST_CLASS_NOTIFICATION_SUCCESS,
} from "./ClassNotificationConstants";

export const getAllClassNotificationAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CLASS_NOTIFICATION_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ClassNotification/GetAllClassNotification`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_CLASS_NOTIFICATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_CLASS_NOTIFICATION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListClassNotificationAction =
  (year, program, classId, shift, section, date) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_CLASS_NOTIFICATION_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ClassNotification/GetListClassNotification?idAcademicYear=${year}&idFacultyProgramLink=${program}&idClass=${classId}&idShift=${shift}&classSection=${section}&createdDate=${date}`,
        tokenConfig()
      );

      dispatch({ type: GET_LIST_CLASS_NOTIFICATION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_LIST_CLASS_NOTIFICATION_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getBulkClassNotificationAction =
  (year, program, classId, shift, section) => async (dispatch) => {
    try {
      dispatch({ type: GET_BULK_CLASS_NOTIFICATION_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ClassNotification/GetBulkClassNotification?idAcademicYear=${year}&idFacultyProgramLink=${program}&idClass=${classId}&idShift=${shift}&classSection=${section}`,
        tokenConfig()
      );

      dispatch({ type: GET_BULK_CLASS_NOTIFICATION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_BULK_CLASS_NOTIFICATION_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postClassNotificationAction =
  (dbModel, selectedStudents, SchoolShortName) => async (dispatch) => {
    try {
      dispatch({ type: POST_CLASS_NOTIFICATION_REQUEST });

      

      const jsonData = JSON.stringify({
        dbModel,
        dbModelLst: selectedStudents,
      });

      console.log(jsonData);
      await axiosInstance.post(
        `${API_URL}/api/ClassNotification/PostClassNotification`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_CLASS_NOTIFICATION_SUCCESS, payload: "success" });
    } catch (error) {
      dispatch({
        type: POST_CLASS_NOTIFICATION_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
    const fcmTokenList = [];
      selectedStudents.forEach((student) => {
        fcmTokenList.push(student.fcmToken);
      });

      const fcmBody = {
        registration_ids: fcmTokenList,
        collapse_key: "type_a",
        notification: {
          body: dbModel.MessageDescription,
          title: `${SchoolShortName} (${dbModel.MessageHeading})`,
        },
      };

      const fbody = JSON.stringify(fcmBody);

      await axios.post(
        "https://fcm.googleapis.com/fcm/send",
        fbody,
        tokenHeader
      );
  };
