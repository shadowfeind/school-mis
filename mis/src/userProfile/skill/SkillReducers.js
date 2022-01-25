import {
  GET_ALL_SKILL_FAIL,
  GET_ALL_SKILL_REQUEST,
  GET_ALL_SKILL_RESET,
  GET_ALL_SKILL_SUCCESS,
} from "./SkillConstants";

export const getAllSkillReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SKILL_REQUEST:
      return { loading: true };
    case GET_ALL_SKILL_SUCCESS:
      return { loading: false, getAllSkill: action.payload };
    case GET_ALL_SKILL_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_SKILL_RESET:
      return {};
    default:
      return state;
  }
};
