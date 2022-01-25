import {
  GET_ALL_FAMILYMEMBER_FAIL,
  GET_ALL_FAMILYMEMBER_REQUEST,
  GET_ALL_FAMILYMEMBER_RESET,
  GET_ALL_FAMILYMEMBER_SUCCESS,
} from "./FamilyMemberConstants";

export const getAllFamilyMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_FAMILYMEMBER_REQUEST:
      return { loading: true };
    case GET_ALL_FAMILYMEMBER_SUCCESS:
      return { loading: false, getAllFamilyMember: action.payload };
    case GET_ALL_FAMILYMEMBER_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_FAMILYMEMBER_RESET:
      return {};
    default:
      return state;
  }
};
