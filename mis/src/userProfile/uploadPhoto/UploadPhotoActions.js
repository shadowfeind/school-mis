import axios from "axios";
import { API_URL } from "../../constants";

import {
  GET_ALL_UPLOADPHOTO_FAIL,
  GET_ALL_UPLOADPHOTO_REQUEST,
  GET_ALL_UPLOADPHOTO_SUCCESS,
} from "./UploadPhotoConstants";

export const getAllUploadPhotoAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_UPLOADPHOTO_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_UPLOADPHOTO/GetAllPIDUPLOADPHOTO`
    );

    dispatch({ type: GET_ALL_UPLOADPHOTO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_UPLOADPHOTO_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
