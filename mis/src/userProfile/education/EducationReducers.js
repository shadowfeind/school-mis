import {
  GET_ALL_EDUCATION_FAIL,
  GET_ALL_EDUCATION_REQUEST,
  GET_ALL_EDUCATION_RESET,
  GET_ALL_EDUCATION_SUCCESS,
} from "./EducationConstants";

export const getAllEducationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EDUCATION_REQUEST:
      return { loading: true };
    case GET_ALL_EDUCATION_SUCCESS:
      return { loading: false, getAllEducation: action.payload };
    case GET_ALL_EDUCATION_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_EDUCATION_RESET:
      return {};
    default:
      return state;
  }
};
