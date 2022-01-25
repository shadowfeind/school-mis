import axios from "axios";
import { API_URL } from "../../constants";

import {
  GET_ALL_UPLOADPHOTO_FAIL,
  GET_ALL_UPLOADPHOTO_REQUEST,
  GET_ALL_UPLOADPHOTO_SUCCESS,
  UPLOADPHOTO_FAIL,
  UPLOADPHOTO_REQUEST,
  UPLOADPHOTO_SUCCESS,
} from "./UploadPhotoConstants";

export const getAllUploadPhotoAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_UPLOADPHOTO_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_PhotoUpload/GetAllPIDPhotoUpload
      `
    );

    dispatch({ type: GET_ALL_UPLOADPHOTO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_UPLOADPHOTO_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const uploadPhotoActionAction = (image) => async (dispatch) => {
  try {
    dispatch({ type: UPLOADPHOTO_REQUEST });

    let formData = new FormData();
    formData.append("ImageUploaded", image);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${API_URL}/api/PID_PhotoUploadImage/Put`,
      formData,
      config
    );

    if (data) {
      const newData = { FullPath: data };
      const jsonData = JSON.stringify({
        dbModel: newData,
      });

      await axios.put(`${API_URL}/api/PID_PhotoUpload/Put`, jsonData, config);
    }

    dispatch({
      type: UPLOADPHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOADPHOTO_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
