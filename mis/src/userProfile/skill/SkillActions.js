import axios from "axios";
import { API_URL } from "../../constants";
import {
  GET_ALL_SKILL_FAIL,
  GET_ALL_SKILL_REQUEST,
  GET_ALL_SKILL_SUCCESS,
} from "./SkillConstants";

export const getAllSkillAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SKILL_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/PID_Skill/GetAllPIDSkill`);

    dispatch({ type: GET_ALL_SKILL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_SKILL_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};
