import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_ALL_HOBBY_FAIL,
  GET_ALL_HOBBY_REQUEST,
  GET_ALL_HOBBY_SUCCESS,
} from "./HobbyConstants";

export const getAllHobbyAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_HOBBY_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/PID_Hobby/GetAllPIDHobby`);

    dispatch({ type: GET_ALL_HOBBY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_HOBBY_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
