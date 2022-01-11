import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_ALL_FAMILYMEMBER_FAIL,
  GET_ALL_FAMILYMEMBER_REQUEST,
  GET_ALL_FAMILYMEMBER_SUCCESS,
} from "./FamilyMemberConstants";

export const getAllFamilyMemberAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_FAMILYMEMBER_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_FamilyMember/GetAllPIDFamilyMember`
    );

    dispatch({ type: GET_ALL_FAMILYMEMBER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_FAMILYMEMBER_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
